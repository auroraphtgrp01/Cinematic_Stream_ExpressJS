import express from 'express'
import RouterApp from './routes/index.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import { initFolder } from './utils/file'
import { Server } from 'socket.io'
import cors from 'cors'
import { createServer } from 'http'
import { TokenPayload } from './models/requests/User.requests'
import { verifyAccessToken } from './utils/common'
import { ErrorWithStatus } from './models/Errors'
import HTTP_STATUS from './constants/httpStatus'
import { ObjectId } from 'mongodb'
import Conversation from './models/schemas/Conversation.schemas'
const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

io.use(async (socket, next) => {
  const { Authorization } = socket.handshake.auth
  const access_token = Authorization?.split(' ')[1]
  try {
    const decoded_authorization = await verifyAccessToken(access_token)
    socket.handshake.auth.decoded_authorization = decoded_authorization as TokenPayload
    next()
  } catch (error) {
    next({
      message: 'Unauthorized',
      name: 'Unauthorized',
      data: error
    })
  }
})
io.on('connection', async (socket) => {
  console.log(`${socket.id} connected`)
  socket.on('message', async (data) => {
    const { sender_id, message, username } = data
    const conversation = new Conversation({
      _id: new ObjectId(),
      sender_id: new ObjectId(sender_id),
      username: username,
      messages: message
    })
    await databaseService.conversation.insertOne(conversation)
    io.emit('rec_message', conversation)
  })
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})

app.use(express.json())
databaseService.connect()
app.use(cors())
initFolder()
RouterApp(app)
app.use(defaultErrorHandler)

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

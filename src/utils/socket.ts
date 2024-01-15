import { Server } from 'socket.io'
import { verifyAccessToken } from './common'
import { TokenPayload } from '~/models/requests/User.requests'
import Conversation from '~/models/schemas/Conversation.schemas'
import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import { Server as ServerHTTP } from 'http'
const socketHandler = (httpServe: ServerHTTP) => {
  const io = new Server(httpServe, {
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
}

export default socketHandler
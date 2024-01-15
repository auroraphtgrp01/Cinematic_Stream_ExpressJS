import express from 'express'
import RouterApp from './routes/index.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import { initFolder } from './utils/file'
import cors from 'cors'
import { createServer } from 'http'
import socketHandler from './utils/socket'
const PORT = 3000

const app = express()
const httpServer = createServer(app)
socketHandler(httpServer)
app.use(express.json())
databaseService.connect()
app.use(cors())
initFolder()
RouterApp(app)
app.use(defaultErrorHandler)

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

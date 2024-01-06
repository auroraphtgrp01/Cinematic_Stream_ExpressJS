import express from 'express'
import RouterApp from './routes/index.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import { initFolder } from './utils/file'

const PORT = 3000

const app = express()
app.use(express.json())
databaseService.connect()

initFolder()
RouterApp(app)
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

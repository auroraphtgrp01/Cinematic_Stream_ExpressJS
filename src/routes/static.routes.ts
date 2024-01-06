import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/medias.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:filename', wrapRequestHandler(serveImageController))

staticRouter.get('/video/:foldername/:filename', wrapRequestHandler(serveVideoController))

export default staticRouter

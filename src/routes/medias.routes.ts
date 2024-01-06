import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controller'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const mediasRouter = Router()

mediasRouter.post('/upload/image', accessTokenValidator, wrapRequestHandler(uploadImageController))

mediasRouter.post('/upload/video', accessTokenValidator, wrapRequestHandler(uploadVideoController))

export default mediasRouter

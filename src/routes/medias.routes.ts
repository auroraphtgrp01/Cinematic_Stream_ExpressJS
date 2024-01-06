import { Router } from "express";
import { uploadController } from "~/controllers/medias.controller";
import { accessTokenValidator } from "~/middlewares/users.middlewares";
import { wrapRequestHandler } from "~/utils/handlers";

const mediasRouter = Router()

mediasRouter.post('/upload/image', accessTokenValidator, wrapRequestHandler(uploadController))

export default mediasRouter

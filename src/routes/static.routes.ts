import { Router } from 'express'
import {
  serveHLSController,
  serveImageController,
  serveSegmentHLSController,
  serveVideoController
} from '~/controllers/medias.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

staticRouter.get('/image/:filename', wrapRequestHandler(serveImageController))

staticRouter.get('/video/:foldername/:filename', wrapRequestHandler(serveVideoController))

staticRouter.get('/video-hls/:id_movie/:id_episode/master.m3u8', wrapRequestHandler(serveHLSController))

staticRouter.get('/video-hls/:id_movie/:id_episode/:v/:segment', wrapRequestHandler(serveSegmentHLSController))

export default staticRouter

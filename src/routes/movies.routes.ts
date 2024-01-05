import { Router } from 'express'
import { createDirectorController, createMovieController, getDirectorController, getMovieController } from '~/controllers/movies.controllers'
import { paginationValidator } from '~/middlewares/common.middlewares'
import { directorValidator, movieCreateValidator } from '~/middlewares/movies.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const movieRouter = Router()

movieRouter.post('/create', movieCreateValidator, wrapRequestHandler(createMovieController))

movieRouter.get('/get', paginationValidator, wrapRequestHandler(getMovieController))

movieRouter.post(
  '/directors/create',
  accessTokenValidator,
  directorValidator,
  wrapRequestHandler(createDirectorController)
)

movieRouter.get('/directors/get', wrapRequestHandler(getDirectorController))
export default movieRouter

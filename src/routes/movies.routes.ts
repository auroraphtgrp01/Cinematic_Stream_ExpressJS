import { Router } from 'express'
import { createMovieController, getMovieController } from '~/controllers/movies.controllers'
import { paginationValidator } from '~/middlewares/common.middlewares'
import { movieCreateValidator } from '~/middlewares/movies.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const movieRouter = Router()

movieRouter.post('/create', movieCreateValidator, wrapRequestHandler(createMovieController))

movieRouter.get('/get', paginationValidator, wrapRequestHandler(getMovieController))

export default movieRouter

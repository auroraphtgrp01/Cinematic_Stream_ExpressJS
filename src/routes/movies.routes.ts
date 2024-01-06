import { Router } from 'express'
import {
  createContriesController,
  createDirectorController,
  createEpisodeController,
  createLanguageController,
  createMovieController,
  getCountriesController,
  getDirectorController,
  getEpisodesController,
  getLanguageController,
  getMovieController
} from '~/controllers/movies.controllers'
import { paginationValidator } from '~/middlewares/common.middlewares'
import {
  countriesValidator,
  directorValidator,
  languagesValidator,
  movieCreateValidator
} from '~/middlewares/movies.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const movieRouter = Router()

movieRouter.post('/create', accessTokenValidator, movieCreateValidator, wrapRequestHandler(createMovieController))

movieRouter.get('/get', paginationValidator, wrapRequestHandler(getMovieController))

movieRouter.post(
  '/directors/create',
  accessTokenValidator,
  directorValidator,
  wrapRequestHandler(createDirectorController)
)

movieRouter.get('/directors/get', wrapRequestHandler(getDirectorController))

movieRouter.post(
  '/countries/create',
  accessTokenValidator,
  countriesValidator,
  wrapRequestHandler(createContriesController)
)

movieRouter.get('/countries/get', accessTokenValidator, languagesValidator, wrapRequestHandler(getDirectorController))

movieRouter.post(
  '/languages/create',
  languagesValidator,
  accessTokenValidator,
  wrapRequestHandler(createLanguageController)
)
movieRouter.get('/languages/get', wrapRequestHandler(getLanguageController))

movieRouter.post('/episodes/create', accessTokenValidator, wrapRequestHandler(createEpisodeController))

movieRouter.get('/episodes/get/:id', wrapRequestHandler(getEpisodesController))

export default movieRouter

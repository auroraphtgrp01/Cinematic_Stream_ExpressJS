import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import Movie from '~/models/schemas/Movie.schemas'
import imageService from '~/services/images.services'
import movieService from '~/services/movie.services'

export const createMovieController = async (req: Request, res: Response, next: NextFunction) => {
  const id_img = await imageService.uploadImage(req.body.url_image)
  const movie = new Movie({
    original_name: req.body.original_name,
    vietnamese_name: req.body.vietnamese_name,
    description: req.body.description,
    id_img: new ObjectId(id_img),
    id_contries: new ObjectId(req.body.id_contries),
    id_director: new ObjectId(req.body.id_director),
    id_user_upload: new ObjectId(req.body.id_user_upload),
    id_language_original: new ObjectId(req.body.id_language_original)
  })
  const result = await movieService.createMovie(movie)
  return res.json(result)
}

export const getMovieController = async (req: Request, res: Response, next: NextFunction) => {
  const [limit, page] = [Number(req.query.limit), Number(req.query.page)]
  const result = await movieService.getMovie(limit, page)
  return res.json(result)
}

export const createDirectorController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.createDirector(req.body.name)
  return res.json(result)
}

export const getDirectorController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.getDirector()
  return res.json(result)
}

export const createContriesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.createContries(req.body.name)
  return res.json(result)
}

export const getCountriesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.getContries()
  return res.json(result)
}

export const createLanguageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.createLanguage(req.body.name)
  return res.json(result)
}

export const getLanguageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await movieService.getLanguage()
  return res.json(result)
}

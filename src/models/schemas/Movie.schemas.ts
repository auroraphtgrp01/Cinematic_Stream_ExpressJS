import { ObjectId } from 'mongodb'

export interface MovieType {
  _id?: ObjectId
  original_name: string
  vietnamese_name: string
  id_img: ObjectId
  rating?: number
  description?: string
  id_contries: ObjectId
  id_director: ObjectId
  id_user_upload: ObjectId
  id_language_original?: ObjectId
  views?: number
  created_at?: Date
  updated_at?: Date
  date?: Date
}

export default class Movie {
  _id?: ObjectId
  original_name: string
  vietnamese_name: string
  id_img?: ObjectId
  rating?: number
  description?: string
  id_contries: ObjectId
  id_director: ObjectId
  id_user_upload: ObjectId
  id_language_original?: ObjectId
  views?: number
  created_at?: Date
  updated_at?: Date
  date?: Date
  constructor(movie: MovieType) {
    const date = new Date()
    this._id = movie._id
    this.original_name = movie.original_name
    this.vietnamese_name = movie.vietnamese_name
    this.id_img = movie.id_img
    this.rating = movie.rating
    this.description = movie.description
    this.id_contries = movie.id_contries
    this.id_director = movie.id_director
    this.id_user_upload = movie.id_user_upload
    this.id_language_original = movie.id_language_original
    this.views = movie.views
    this.created_at = movie.created_at || date
    this.updated_at = movie.updated_at || date
    this.date = movie.date || date
  }
}

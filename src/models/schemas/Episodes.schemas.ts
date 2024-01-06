import { ObjectId } from 'mongodb'

export interface EpisodesType {
  _id?: ObjectId
  num_ep: string
  description?: string
  id_movie: ObjectId
  created_at?: Date
  updated_at?: Date
  id_user_upload?: ObjectId
}

export default class Episodes {
  _id?: ObjectId
  num_ep: string
  description?: string
  id_movie: ObjectId
  created_at?: Date
  updated_at?: Date
  id_user_upload?: ObjectId
  constructor(episodes: EpisodesType) {
    this._id = episodes._id
    this.num_ep = episodes.num_ep
    this.description = episodes.description
    this.id_movie = episodes.id_movie
    this.created_at = episodes.created_at || new Date()
    this.updated_at = episodes.updated_at || new Date()
    this.id_user_upload = episodes.id_user_upload
  }
}

import { ObjectId } from 'mongodb'

export interface ImageType {
  _id?: ObjectId
  url: string
  created_at?: Date
  updated_at?: Date
}

export default class Image {
  _id?: ObjectId
  url: string
  created_at?: Date
  updated_at?: Date
  constructor(image: ImageType) {
    const date = new Date()
    this._id = image._id
    this.url = image.url
    this.created_at = image.created_at || date
    this.updated_at = image.updated_at || date
  }
}

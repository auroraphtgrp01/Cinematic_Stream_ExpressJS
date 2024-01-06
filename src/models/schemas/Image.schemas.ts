import { ObjectId } from 'mongodb'

export interface ImageType {
  _id?: ObjectId
  file_name: string
  path: string
  created_at?: Date
  updated_at?: Date
}

export default class Image {
  _id?: ObjectId
  file_name: string
  path: string
  created_at?: Date
  updated_at?: Date
  constructor(image: ImageType) {
    const date = new Date()
    this._id = image._id
    this.path = image.path
    this.file_name = image.file_name
    this.created_at = image.created_at || date
    this.updated_at = image.updated_at || date
  }
}

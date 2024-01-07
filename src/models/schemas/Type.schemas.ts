import { ObjectId } from 'mongodb'

export interface MovieType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Type {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
  constructor(type: MovieType) {
    const date = new Date()
    this._id = type._id
    this.name = type.name
    this.created_at = type.created_at || date
    this.updated_at = type.updated_at || date
  }
}

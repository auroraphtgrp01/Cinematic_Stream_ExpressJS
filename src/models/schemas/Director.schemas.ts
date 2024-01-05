import { ObjectId } from 'mongodb'

export interface DirectorType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Director {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
  constructor(director: DirectorType) {
    const date = new Date()
    this._id = director._id
    this.name = director.name
    this.created_at = director.created_at || date
    this.updated_at = director.updated_at || date
  }
}

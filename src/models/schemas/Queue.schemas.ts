import { ObjectId } from 'mongodb'

export interface QueueType {
  _id?: ObjectId
  name: string
  message?: string
  created_at?: Date
  updated_at?: Date
}

export default class Queue {
  _id?: ObjectId
  name: string
  message?: string
  created_at?: Date
  updated_at?: Date
  constructor({ _id, name, message }: QueueType) {
    this._id = _id || new ObjectId()
    this.name = name
    this.message = message
    this.created_at = new Date()
    this.updated_at = new Date()
  }
}

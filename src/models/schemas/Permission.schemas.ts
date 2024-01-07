import { ObjectId } from 'mongodb'

export interface PermisstionType {
  _id?: ObjectId
  name: string
  id_function: ObjectId[]
  created_at?: Date
  updated_at?: Date
}
export default class Permisstion {
  _id?: ObjectId
  name: string
  id_function: ObjectId[]
  created_at?: Date
  updated_at?: Date
  constructor(permisstion: PermisstionType) {
    const date = new Date()
    this._id = permisstion._id
    this.name = permisstion.name
    this.id_function = permisstion.id_function
    this.created_at = permisstion.created_at || date
    this.updated_at = permisstion.updated_at || date
  }
}

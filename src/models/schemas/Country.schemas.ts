import { ObjectId } from 'mongodb'

export interface CountryType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Country {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
  constructor(country: CountryType) {
    const date = new Date()
    this._id = country._id
    this.name = country.name
    this.created_at = country.created_at || date
    this.updated_at = country.updated_at || date
  }
}

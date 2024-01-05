import { ObjectId } from 'mongodb'

export interface LanguageType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class Language {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
  constructor(language: LanguageType) {
    const date = new Date()
    this._id = language._id
    this.name = language.name
    this.created_at = language.created_at || date
    this.updated_at = language.updated_at || date
  }
}

import { ObjectId } from 'mongodb'

export interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  exp: number
  iat: number
}
export default class RefreshToken {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  exp: Date
  iat: Date
  constructor(refresh_token: RefreshTokenType) {
    this._id = refresh_token._id
    this.token = refresh_token.token
    this.created_at = new Date()
    this.user_id = refresh_token.user_id
    this.exp = new Date(refresh_token.exp * 1000)
    this.iat = new Date(refresh_token.exp * 1000)
  }
}

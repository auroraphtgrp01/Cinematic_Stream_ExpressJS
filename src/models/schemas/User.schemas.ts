import { ObjectId } from 'mongodb'
import { UserTypes, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  date_of_birth?: Date
  password: string
  user_type: UserTypes
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  avatar?: string
  id_permission?: ObjectId
  username?: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  name?: string
  email: string
  username?: string
  date_of_birth?: Date
  password: string
  id_permission?: ObjectId
  user_type: UserTypes
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  avatar?: string
  created_at?: Date
  updated_at?: Date
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.email = user.email
    this.id_permission = user.id_permission
    this.date_of_birth = user.date_of_birth || date
    this.password = user.password
    this.user_type = user.user_type || UserTypes.Client
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.avatar = user.avatar || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.username = user.username || ''
  }
}

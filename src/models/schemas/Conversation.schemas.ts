import { ObjectId } from 'mongodb'

export interface ConversationType {
  _id?: ObjectId
  sender_id: ObjectId
  username: string
  messages: string
  created_at?: Date
  updated_at?: Date
}

export default class Conversation {
  _id?: ObjectId
  sender_id: ObjectId
  messages: string
  username: string
  created_at?: Date
  updated_at?: Date
  constructor(conversation: ConversationType) {
    this._id = conversation._id
    this.sender_id = conversation.sender_id
    this.username = conversation.username
    this.messages = conversation.messages
    this.created_at = conversation.created_at || new Date()
    this.updated_at = conversation.updated_at || new Date()
  }
}

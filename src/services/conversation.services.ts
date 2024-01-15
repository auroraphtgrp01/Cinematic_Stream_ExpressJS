import Conversation from '~/models/schemas/Conversation.schemas'
import databaseService from './database.services'
import { skip } from 'node:test'

class ConversationServices {
  async createConversation(conversation: Conversation) {
    const result = await databaseService.conversation.insertOne(conversation)
    return result
  }
  async getConversation(limit: number = 0, page: number = 0) {
    const [result, total] = await Promise.all([
      databaseService.conversation
        .aggregate([
          {
            $match: {}
          },
          {
            $sort: {
              created_at: -1
            }
          },
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          }
        ])
        .toArray(),
      databaseService.conversation
        .aggregate([
          {
            $match: {}
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])
    return {
      data: result,
      total: Math.ceil(total[0]?.total / limit)
    }
  }
}

const conversationServices = new ConversationServices()
export default conversationServices

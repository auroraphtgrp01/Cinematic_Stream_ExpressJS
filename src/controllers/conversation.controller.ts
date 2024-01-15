import { Request, Response } from 'express'
import conversationServices from '~/services/conversation.services'

export const GetConversationControrller = async (req: Request, res: Response) => {
  const result = await conversationServices.getConversation(Number(req.query.limit), Number(req.query.skip))
  return res.json({
    message: 'Get conversation successfully',
    result
  })
}

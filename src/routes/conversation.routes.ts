import Router from 'express'
import { GetConversationControrller } from '~/controllers/conversation.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const conversationRouter = Router()

conversationRouter.get('/get', wrapRequestHandler(GetConversationControrller))

export default conversationRouter

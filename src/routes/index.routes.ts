import express from 'express'
import usersRouter from './users.routes'
import movieRouter from './movies.routes'
import mediasRouter from './medias.routes'
import staticRouter from './static.routes'
import permissionRouter from './permission.routes'
import conversationRouter from './conversation.routes'

const RouterApp = async (useRouter: express.Application) => {
  useRouter.use('/users', usersRouter)
  useRouter.use('/movies', movieRouter)
  useRouter.use('/media', mediasRouter)
  useRouter.use('/static', staticRouter)
  useRouter.use('/permission', permissionRouter)
  useRouter.use('/conversations', conversationRouter)
}

export default RouterApp

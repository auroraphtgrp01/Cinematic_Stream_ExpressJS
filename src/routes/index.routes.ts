import express from 'express'
import usersRouter from './users.routes'

const RouterApp = async (useRouter: express.Application) => {
  useRouter.use('/users', usersRouter)
}

export default RouterApp

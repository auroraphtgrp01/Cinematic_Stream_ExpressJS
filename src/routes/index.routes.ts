import express from 'express'
import usersRouter from './users.routes'
import movieRouter from './movies.routes'

const RouterApp = async (useRouter: express.Application) => {
  useRouter.use('/users', usersRouter)
  useRouter.use('/movies', movieRouter)
}

export default RouterApp

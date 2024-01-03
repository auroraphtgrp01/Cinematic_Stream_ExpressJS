import Router from 'express'
import { RegisterUserController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.get('/register', registerValidator, wrapRequestHandler(RegisterUserController))

export default usersRouter

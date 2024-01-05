import Router from 'express'
import { LoginUserController, LogoutUserController, RegisterUserController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(RegisterUserController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(LoginUserController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(LogoutUserController))

export default usersRouter

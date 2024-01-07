import Router from 'express'
import {
  CreatePermissionController,
  LoginUserController,
  LogoutUserController,
  RegisterUserController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  employeeValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(RegisterUserController))

usersRouter.post('/login', loginValidator, wrapRequestHandler(LoginUserController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(LogoutUserController))

usersRouter.post('/permission/create', accessTokenValidator, wrapRequestHandler(CreatePermissionController))

usersRouter.post(
  '/employee/create',
  accessTokenValidator,
  employeeValidator,
  wrapRequestHandler(RegisterUserController)
)

export default usersRouter

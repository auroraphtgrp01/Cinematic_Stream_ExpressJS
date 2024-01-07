import { Router } from 'express'
import {
  AddPermissonToUserController,
  CreatePermissionController,
  GetPermissionController
} from '~/controllers/users.controllers'
import { addPermissonValidator } from '~/middlewares/movies.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const permissionRouter = Router()

permissionRouter.post('/create', accessTokenValidator, wrapRequestHandler(CreatePermissionController))

permissionRouter.get('/get/function', accessTokenValidator, wrapRequestHandler(GetPermissionController))

permissionRouter.post(
  '/add-permission-to-user',
  accessTokenValidator,
  addPermissonValidator,
  wrapRequestHandler(AddPermissonToUserController)
)
export default permissionRouter

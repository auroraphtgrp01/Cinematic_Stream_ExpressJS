import { Request, Response, NextFunction } from 'express'
import { Function, UserTypes } from '~/constants/enums'
import { TokenPayload } from '~/models/requests/User.requests'
import Permisstion from '~/models/schemas/Permission.schemas'
import databaseService from '~/services/database.services'
import userServices from '~/services/users.services'

export const RegisterUserController = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body
  try {
    const result = await userServices.register(payload)
    return res.json({
      message: 'User registered successfully',
      data: result
    })
  } catch (error) {
    next(error)
  }
  res.json(payload)
}

export const LoginUserController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user
  const login = await userServices.login(user._id)
  return res.json({
    message: 'User logged in successfully',
    data: login
  })
}
export const LogoutUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await userServices.logout(user_id)
  return res.json(result)
}

export const CreatePermissionController = async (req: Request, res: Response, next: NextFunction) => {
  const id_function = req.body.id_function
  const permission = new Permisstion({
    name: req.body.name as string,
    id_function: id_function.map((item: string) => parseInt(item))
  })
  const result = await userServices.permissionCreate(permission)
  return res.json(result)
}

export const GetPermissionController = async (req: Request, res: Response, next: NextFunction) => {
  const func = Function
  return res.json({
    message: 'Get permission successfully',
    data: func
  })
}

export const AddPermissonToUserController = async (req: Request, res: Response, next: NextFunction) => {
  await userServices.addPermissonToUser(req.body.id_user, req.body.id_permission)
  return res.json({
    message: 'Add permission to user successfully'
  })
}

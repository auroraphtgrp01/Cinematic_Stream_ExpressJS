import { Request, Response, NextFunction } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
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

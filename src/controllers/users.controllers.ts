import { Request, Response, NextFunction } from 'express'
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

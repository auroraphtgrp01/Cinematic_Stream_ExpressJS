import { Request } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import userServices from '~/services/users.services'

export const permissionValidator = async (id_function: number, req: Request) => {
  const { user_type, user_id } = req.decoded_authorization as TokenPayload
  if (user_type === 0) return false
  const per = await userServices.checkPermisson(user_id)
  const check = per?.id_function.map((item: any) => parseInt(item))?.find((item: any) => item === id_function)
  if (!check) return false
  return true
}

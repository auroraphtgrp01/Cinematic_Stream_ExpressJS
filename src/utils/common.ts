import { ErrorWithStatus } from '~/models/Errors'
import { verifyToken } from './jwt'
import HTTP_STATUS from '~/constants/httpStatus'
import { Request } from 'express'

export const verifyAccessToken = async (access_token: string, req: Request) => {
  if (!access_token) {
    throw new Error('Access token is required')
  }
  try {
    const decoded_authorization = await verifyToken({
      secretOnPublicKey: process.env.JWT_ACCESS_TOKEN_SECRET as string,
      token: access_token
    })
    if (req) {
      req.decoded_authorization = decoded_authorization
      return decoded_authorization
    }
  } catch (error) {
    throw new ErrorWithStatus({
      message: 'Access token is invalid',
      status: HTTP_STATUS.UNAUTHORIZED
    })
  }
}

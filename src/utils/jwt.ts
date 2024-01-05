import jwt, { JwtPayload } from 'jsonwebtoken'
import { resolve } from 'path'
import { TokenPayload } from '~/models/requests/User.requests'

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (erorr, token) => {
      if (erorr) {
        reject(erorr)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOnPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOnPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOnPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

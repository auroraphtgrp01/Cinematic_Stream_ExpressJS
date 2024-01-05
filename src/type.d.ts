import { request } from 'express'
import { TokenPayload } from './models/requests/User.requests'

declare module 'express' {
  interface Request {
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}

import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserTypes } from '~/constants/enums'

export interface RegisterRequestBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  user_type: UserTypes
  token_type: TokenType
  exp: number
  iat: number
}

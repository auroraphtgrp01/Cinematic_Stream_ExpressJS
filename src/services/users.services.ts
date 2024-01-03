import { ObjectId } from 'mongodb'
import { RegisterRequestBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import User from '~/models/schemas/User.schemas'
import { signToken, verifyToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { random } from 'lodash'
import RefreshToken from '~/models/schemas/RefreshToken.schemas'

class UserServices {
  async register(payload: RegisterRequestBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken((user_id as ObjectId).toString())
    await databaseService.users.insertOne(
      new User({
        _id: user_id,
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        email_verify_token,
        username: payload.email.split('@')[0] + random(1000, 9999)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken((user_id as ObjectId).toString())
    const { exp, iat } = await this.decodedRefereshToken(refresh_token)
    await databaseService.refresh_tokens.insertOne(
      new RefreshToken({
        user_id,
        token: refresh_token,
        iat: iat as number,
        exp: exp as number
      })
    )
    return {
      access_token,
      refresh_token
    }
  }
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_ACCESS_TOKEN_SECRET as string,
      options: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN
      }
    })
  }
  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          exp
        },
        privateKey: process.env.JWT_REFRESH_TOKEN_SECRET as string
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_REFRESH_TOKEN_SECRET as string,
      options: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN
      }
    })
  }
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken
      },
      privateKey: process.env.JWT_EMAIL_VERIFY_TOKEN_SECRET as string,
      options: {
        expiresIn: process.env.JWT_EMAIL_VERIFY_TOKEN_EXPIRE_IN
      }
    })
  }
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET as string,
      options: {
        expiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRE_IN
      }
    })
  }

  private signAccessTokenAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken({ user_id })])
  }
  private decodedRefereshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOnPublicKey: process.env.JWT_REFRESH_TOKEN_SECRET as string
    })
  }
  async checkExistEmail(email: string) {
    const check = await databaseService.users.findOne({ email })
    return Boolean(check)
  }
}

const userServices = new UserServices()

export default userServices

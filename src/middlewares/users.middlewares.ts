import { Request } from 'express'
import { ParamSchema, check, checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { TokenPayload } from '~/models/requests/User.requests'
import databaseService from '~/services/database.services'
import userServices from '~/services/users.services'
import { verifyAccessToken } from '~/utils/common'
import { hashPassword } from '~/utils/hash'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validate'

const passwordSchemas: ParamSchema = {
  notEmpty: {
    errorMessage: 'Password cannot be empty'
  },
  isLength: {
    options: { min: 8, max: 50 },
    errorMessage: 'Password must be between 8 and 50 chars long'
  },
  isStrongPassword: {
    errorMessage:
      'Password must be at least 8 chars long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
    options: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }
  }
}

const confirmPasswordSchemas: ParamSchema = {
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.Password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    }
  }
}
const nameSchema: ParamSchema = {
  isString: {
    errorMessage: 'Name must be a string'
  },
  notEmpty: {
    errorMessage: 'Name cannot be empty'
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 400
    },
    errorMessage: 'Name must be between 1 and 400 chars long'
  }
}

export const registerValidator = validate(
  checkSchema(
    {
      name: nameSchema,
      email: {
        notEmpty: {
          errorMessage: 'Email cannot be empty'
        },
        trim: true,
        isEmail: {
          errorMessage: 'Email must be a valid email'
        },
        custom: {
          options: async (value, { req }) => {
            const checkExistEmail = await userServices.checkExistEmail(value)
            if (checkExistEmail) {
              throw new Error('Email already exists')
            }
            return true
          }
        }
      },
      password: passwordSchemas,
      confirmPassword: confirmPasswordSchemas
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: 'Email cannot be empty'
      },
      trim: true,
      isEmail: {
        errorMessage: 'Email must be a valid email'
      },
      custom: {
        options: async (value, { req }) => {
          const checkExistEmail = await userServices.checkExistEmail(value)
          if (!checkExistEmail) {
            throw new Error('Email does not exist')
          }
          return true
        }
      }
    },
    password: {
      ...passwordSchemas,
      custom: {
        options: async (value, { req }) => {
          const check = await databaseService.users.findOne({ email: req.body.email })
          if (!check) {
            throw new Error('Email does not exist')
          }
          const isPasswordMatch = check.password === hashPassword(value)
          if (!isPasswordMatch) {
            throw new Error('Password does not match')
          }
          return (req.body.user = check)
        }
      }
    }
  })
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      authorization: {
        notEmpty: {
          errorMessage: 'Access Token cannot be empty'
        },
        custom: {
          options: async (value, { req }) => {
            const access_token = value.split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema({
    refresh_token: {
      notEmpty: {
        errorMessage: 'Refresh Token cannot be empty'
      },
      isString: {
        errorMessage: 'Refresh Token must be a string'
      },
      custom: {
        options: async (value, { req }) => {
          try {
            const [decoded_refresh_token, refresh_token] = await Promise.all([
              verifyToken({
                token: value,
                secretOnPublicKey: process.env.JWT_REFRESH_TOKEN_SECRET as string
              }),
              databaseService.refresh_tokens.findOne({ token: value })
            ])
            if (refresh_token === null) {
              throw new ErrorWithStatus({
                message: 'Refresh token does not exist',
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            req.decoded_refresh_token = decoded_refresh_token
          } catch (error) {
            throw new ErrorWithStatus({
              message: 'Refresh token is invalid',
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
        }
      }
    }
  })
)

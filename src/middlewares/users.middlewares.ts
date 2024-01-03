import { ParamSchema, check, checkSchema } from 'express-validator'
import userServices from '~/services/users.services'
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

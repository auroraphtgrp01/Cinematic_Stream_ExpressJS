import { validate } from '~/utils/validate'
import { checkSchema } from 'express-validator'
import { permissionValidator } from './permission.middlewares'
import { Request } from 'express'

export const movieCreateValidator = validate(
  checkSchema(
    {
      image: {
        isString: true,
        errorMessage: 'image is required'
      },
      original_name: {
        isString: true,
        errorMessage: 'original_name is required',
        custom: {
          options: (value, { req }) => {
            const id_function = 0
            const permission = permissionValidator(id_function, req as Request)
            if (!permission) throw new Error('You do not have permission to perform this action')
            return true
          }
        }
      },
      vietnamese_name: {
        isString: true,
        errorMessage: 'vietnamese_name is required'
      },
      description: {
        isString: true,
        errorMessage: 'description is required'
      },
      id_contries: {
        isString: true,
        errorMessage: 'id_contries is required'
      },
      id_director: {
        isString: true,
        errorMessage: 'id_director is required'
      },
      id_language_original: {
        isString: true,
        errorMessage: 'id_language_original is required'
      },
      date: {
        isString: true,
        errorMessage: 'date is required'
      }
    },
    ['body']
  )
)

export const directorValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: 'name must be a string'
      },
      errorMessage: 'name is required'
    }
  })
)

export const countriesValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: 'name must be a string'
      },
      custom: {
        options: (value, { req }) => {
          const id_function = 12
          const permission = permissionValidator(id_function, req as Request)
          if (!permission) throw new Error('You do not have permission to perform this action')
          return true
        }
      },
      errorMessage: 'name is required'
    }
  })
)

export const languagesValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: 'name must be a string'
      },
      custom: {
        options: (value, { req }) => {
          const id_function = 12
          const permission = permissionValidator(id_function, req as Request)
          if (!permission) throw new Error('You do not have permission to perform this action')
          return true
        }
      },
      errorMessage: 'name is required'
    }
  })
)

export const typeCreateValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: 'name must be a string'
      },
      custom: {
        options: (value, { req }) => {
          const id_function = 12
          const permission = permissionValidator(id_function, req as Request)
          if (!permission) throw new Error('You do not have permission to perform this action')
          return true
        }
      },
      errorMessage: 'name is required'
    }
  })
)

export const eposodeCreateValidator = validate(
  checkSchema({
    num: {
      errorMessage: 'num is required'
    },
    desc: {
      errorMessage: 'num is required'
    },
    id: {
      errorMessage: 'id is required',
      custom: {
        options: (value, { req }) => {
          const id_function = 3
          const permission = permissionValidator(id_function, req as Request)
          if (!permission) throw new Error('You do not have permission to perform this action')
          return true
        }
      }
    }
  })
)

export const addPermissonValidator = validate(
  checkSchema({
    id_user: {
      errorMessage: 'id_user is required',
      custom: {
        options: async (value, { req }) => {
          const id_function = 16
          const permission = await permissionValidator(id_function, req as Request)
          if (!permission) throw new Error('You do not have permission to perform this action')
          return true
        }
      }
    },
    id_permission: {
      errorMessage: 'id_permission is required'
    }
  })
)

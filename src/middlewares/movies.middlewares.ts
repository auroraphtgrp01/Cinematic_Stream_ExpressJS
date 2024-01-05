import { validate } from '~/utils/validate'
import { checkSchema } from 'express-validator'

export const movieCreateValidator = validate(
  checkSchema({
    url_image: {
      isString: true,
      errorMessage: 'url_image is required'
    },
    original_name: {
      isString: true,
      errorMessage: 'original_name is required'
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
  })
)

export const directorValidator = validate(checkSchema({
  name: {
    isString: {
      errorMessage: 'name must be a string'
    },
    errorMessage: 'name is required'
  }
}))
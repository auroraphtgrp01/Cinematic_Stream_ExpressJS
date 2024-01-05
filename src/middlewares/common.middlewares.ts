import { check, checkSchema } from "express-validator";
import { validate } from "~/utils/validate";

export const paginationValidator = validate(checkSchema({
  page: {
    isNumeric: {
      errorMessage: 'page must be a number'
    },
  },
  limit: {
    isNumeric: {
      errorMessage: 'limit must be a number'
    }
  }
}, ['query']))
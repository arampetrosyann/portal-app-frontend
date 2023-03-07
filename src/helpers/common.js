import { v4 as uuidv4 } from "uuid"
import { SNACKBAR_TYPE } from "@Constants/common"
import { ERROR_MESSAGES, ERROR_CODES } from "@Constants/errors"

export const createSnackbarItem = ({ id, type, message }) => ({ id, type, message })

export const parseError = (e) => {
  const { graphQLErrors, message } = e

  if (graphQLErrors && graphQLErrors.length) {
    return graphQLErrors.map(({ extensions: { code } }) => {
      let m = ERROR_MESSAGES.somethingWentWrong

      if (Object.values(ERROR_CODES).includes(code)) {
        m = message
      }

      return createSnackbarItem({
        id: uuidv4(),
        type: SNACKBAR_TYPE.error,
        message: m,
      })
    })
  }

  return [
    createSnackbarItem({
      id: uuidv4(),
      type: SNACKBAR_TYPE.error,
      message: ERROR_MESSAGES.somethingWentWrong,
    }),
  ]
}

export const debounce = (func, time = 400) => {
  let timeout

  return function (...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => func.apply(this, args), time)
  }
}

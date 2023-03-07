import { useDispatch } from "react-redux"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { addSnackbarItem } from "@Redux/snackbar/actions"

export const useMutationWithOnError = (mutation, options) => {
  const dispatch = useDispatch()

  return useMutation(mutation, {
    ...options,
    onError(e) {
      dispatch(addSnackbarItem(e))
    },
  })
}

export const useQueryWithOnError = (query, options) => {
  const dispatch = useDispatch()

  return useQuery(query, {
    ...options,
    onError(e) {
      dispatch(addSnackbarItem(e))
    },
  })
}

export const useLazyQueryWithOnError = (query, options) => {
  const dispatch = useDispatch()

  return useLazyQuery(query, {
    ...options,
    onError(e) {
      dispatch(addSnackbarItem(e))
    },
  })
}

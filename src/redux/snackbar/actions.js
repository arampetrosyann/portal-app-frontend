import { createAction } from "redux-actions"
import { REMOVE_SNACKBAR_ITEM, ADD_SNACKBAR_ITEM } from "./actionTypes"

export const removeSnackbarItem = createAction(REMOVE_SNACKBAR_ITEM)
export const addSnackbarItem = createAction(ADD_SNACKBAR_ITEM)

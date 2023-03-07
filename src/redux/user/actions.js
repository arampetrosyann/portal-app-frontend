import { createAction } from "redux-actions"
import { SET_USER, SET_USER_LOADING } from "./actionTypes"

export const setUser = createAction(SET_USER)
export const setUserLoading = createAction(SET_USER_LOADING)

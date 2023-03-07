import { createAction } from "redux-actions"
import { ADD_LOADING_DATA, REMOVE_LOADING_DATA } from "./actionTypes"

export const addLoadingData = createAction(ADD_LOADING_DATA)
export const removeLoadingData = createAction(REMOVE_LOADING_DATA)

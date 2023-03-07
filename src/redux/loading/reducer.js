import { handleActions } from "redux-actions"
import { produce } from "immer"
import { ADD_LOADING_DATA, REMOVE_LOADING_DATA } from "./actionTypes"

const reducer = handleActions(
  {
    [ADD_LOADING_DATA]: (state, { payload = {} }) =>
      produce(state, (draft) => {
        const { key = "", text, open } = payload

        draft[key] = { text, open }
      }),
    [REMOVE_LOADING_DATA]: (state, { payload: key = "" }) =>
      produce(state, (draft) => {
        delete draft[key]
      }),
  },
  {},
)

export default reducer

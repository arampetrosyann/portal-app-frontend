import { handleActions } from "redux-actions"
import { produce } from "immer"
import { SET_USER, SET_USER_LOADING } from "./actionTypes"

const reducer = handleActions(
  {
    [SET_USER]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.data = payload || null
        draft.loading = false
      }),
    [SET_USER_LOADING]: (state, { payload = false }) =>
      produce(state, (draft) => {
        draft.loading = payload
      }),
  },
  {
    loading: true,
    data: null,
  },
)

export default reducer

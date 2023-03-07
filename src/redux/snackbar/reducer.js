import { handleActions } from "redux-actions"
import { v4 as uuidv4 } from "uuid"
import { produce } from "immer"
import { parseError, createSnackbarItem } from "@Helpers/common"
import { ADD_SNACKBAR_ITEM, REMOVE_SNACKBAR_ITEM } from "./actionTypes"

const reducer = handleActions(
  {
    [ADD_SNACKBAR_ITEM]: (state, { payload = {} }) =>
      produce(state, (draft) => {
        if (payload instanceof Error) {
          draft.data = [...draft.data, ...parseError(payload, draft.data)]
        } else {
          draft.data.push(createSnackbarItem({ ...payload, id: uuidv4() }))
        }
      }),
    [REMOVE_SNACKBAR_ITEM]: (state, { payload: id = "" }) =>
      produce(state, (draft) => {
        const itemIndex = draft.data.findIndex((i) => i.id === id)

        if (itemIndex > -1) draft.data.splice(itemIndex, 1)
      }),
  },
  {
    data: [],
  },
)

export default reducer

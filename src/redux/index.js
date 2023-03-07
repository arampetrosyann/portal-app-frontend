import { combineReducers, applyMiddleware, createStore } from "redux"
import reduxThunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import user from "./user/reducer"
import snackbar from "./snackbar/reducer"
import loading from "./loading/reducer"

const store = createStore(
  combineReducers({ user, snackbar, loading }),
  composeWithDevTools(applyMiddleware(reduxThunk)),
)

export default store

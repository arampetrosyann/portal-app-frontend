import { isApolloError } from "@apollo/client"
import { client } from "@Apollon/apolloClient"
import { GET_CURRENT_USER, SIGN_IN, SIGN_UP, REFRESH_TOKEN } from "@Graphql/user"
import { addLoadingData, removeLoadingData } from "@Redux/loading/actions"
import { addSnackbarItem } from "@Redux/snackbar/actions"
import { FETCH_LOADING_TEXT, AUTH_KEY } from "@Constants/common"
import { setUser, setUserLoading } from "./actions"

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(
      addLoadingData({
        key: "getUser",
        text: FETCH_LOADING_TEXT,
        open: true,
      }),
    )
    dispatch(setUserLoading(true))

    const {
      data: { currentUser },
    } = await client.query({
      query: GET_CURRENT_USER,
      fetchPolicy: "no-cache",
    })

    dispatch(removeLoadingData("getUser"))
    dispatch(setUser(currentUser))
  } catch (error) {
    dispatch(removeLoadingData("getUser"))
    if (isApolloError(error)) {
      const token = localStorage.getItem(AUTH_KEY)

      if (token) {
        dispatch(refresToken(JSON.parse(token).refresToken))
        return
      }

      dispatch(setUser(null))
    }
  }
}

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch(
      addLoadingData({
        key: "signIn",
        text: FETCH_LOADING_TEXT,
        open: true,
      }),
    )
    dispatch(setUserLoading(true))

    const {
      data: { signIn },
    } = await client.mutate({
      mutation: SIGN_IN,
      variables: { data: payload },
      fetchPolicy: "no-cache",
    })

    const { user, token } = signIn

    dispatch(removeLoadingData("signIn"))
    dispatch(setUser(user))
    localStorage.setItem(AUTH_KEY, JSON.stringify(token))
  } catch (error) {
    dispatch(removeLoadingData("signIn"))
    if (isApolloError(error)) dispatch(addSnackbarItem(error))
    dispatch(setUserLoading(false))
  }
}

export const signUp = (payload) => async (dispatch) => {
  try {
    dispatch(
      addLoadingData({
        key: "signUp",
        text: FETCH_LOADING_TEXT,
        open: true,
      }),
    )
    dispatch(setUserLoading(true))

    const {
      data: { signUp },
    } = await client.mutate({
      mutation: SIGN_UP,
      variables: { data: payload },
      fetchPolicy: "no-cache",
    })

    const { user, token } = signUp

    dispatch(removeLoadingData("signUp"))
    dispatch(setUser(user))
    localStorage.setItem(AUTH_KEY, JSON.stringify(token))
  } catch (error) {
    dispatch(removeLoadingData("signUp"))
    if (isApolloError(error)) dispatch(addSnackbarItem(error))
    dispatch(setUserLoading(false))
  }
}

export const refresToken = (payload) => async (dispatch) => {
  try {
    dispatch(
      addLoadingData({
        key: "refreshToken",
        text: FETCH_LOADING_TEXT,
        open: true,
      }),
    )
    dispatch(setUserLoading(true))

    const {
      data: { refreshToken: token },
    } = await client.mutate({
      mutation: REFRESH_TOKEN,
      variables: { refresToken: payload },
      fetchPolicy: "no-cache",
    })

    dispatch(removeLoadingData("refreshToken"))
    localStorage.setItem(AUTH_KEY, JSON.stringify(token))
    dispatch(setUserLoading(false))
  } catch (error) {
    localStorage.removeItem(AUTH_KEY)

    dispatch(setUser(null))
    dispatch(removeLoadingData("refreshToken"))
    if (isApolloError(error)) {
      dispatch(addSnackbarItem(error))
    }
  }
}

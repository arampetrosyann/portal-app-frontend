import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { LinearProgress } from "@material-ui/core"
import { Auth, Main, Snackbar, CircularLoading } from "@Components"
import { selectLoading } from "@Redux/loading/selectors"
import { selectUser, selectUserLoading } from "@Redux/user/selectors"
import { setUser } from "@Redux/user/actions"
import { getCurrentUser } from "@Redux/user/thunks"
import { AUTH_KEY } from "@Constants/common"

const App = () => {
  const user = useSelector(selectUser)
  const userLoading = useSelector(selectUserLoading)
  const loadingData = useSelector(selectLoading)

  const dispatch = useDispatch()

  const loadingText = useMemo(() => {
    return Object.values(loadingData).find((val) => val.open)?.text
  }, [loadingData])

  const loadingOpen = useMemo(
    () => Object.values(loadingData).some((val) => val.open),
    [loadingData],
  )

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY)) {
      dispatch(getCurrentUser())
    } else {
      dispatch(setUser(null))
    }
  }, [dispatch])

  if (userLoading) return <LinearProgress />

  return (
    <>
      <CircularLoading text={loadingText} open={loadingOpen} />
      <div className="app">{user ? <Main /> : <Auth />}</div>
      <Snackbar />
    </>
  )
}

export default App

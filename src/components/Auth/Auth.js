import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const Auth = () => (
  <>
    <Switch>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Redirect to="/sign-in" />
    </Switch>
  </>
)

export default Auth

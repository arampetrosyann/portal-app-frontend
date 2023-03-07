import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Workspace } from "@Components"

const Main = () => (
  <>
    <Switch>
      <Route path="/workspaces">
        <Workspace />
      </Route>
      <Redirect to="/workspaces" />
    </Switch>
  </>
)

export default Main

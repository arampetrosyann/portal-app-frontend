import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import { client } from "@Apollon/apolloClient"
import store from "@Redux"
import "@Styles/index.css"
import App from "./App"

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById("root"),
)

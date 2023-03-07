import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client"
import { AUTH_KEY } from "@Constants/common"

const getApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `${process.env.SERVER_BASE_URL}/graphql`,
  })

  const token = localStorage.getItem(AUTH_KEY)

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${JSON.parse(token).accessToken}` : "",
      },
    })

    return forward(operation)
  })

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })

  return client
}

const client = getApolloClient()

export { client }

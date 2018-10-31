import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin"
})

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      getProduct: (_, args, { getCacheKey }) => {
        const pathParts = args.path.split("/")
        const id = pathParts[pathParts.length - 1].replace(".uts", "")
        return getCacheKey({ __typename: "Product", id })
      }
    }
  }
})

export default () =>
  new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache
  })

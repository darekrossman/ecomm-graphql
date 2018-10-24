import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import { ApolloProvider } from "react-apollo"
import { ThemeProvider } from "styled-components"
import theme, { GlobalStyle } from "./theme"
import ModalSwitch from "./common/ModalSwitch"
import ProductList from "./products/ProductList"

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache({
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
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <Router>
            <>
              <Route exact path="/" component={ProductList} />
              <Route component={ModalSwitch} />

              {/* <Route path="/men" component={ProductList} />
              <Route path="/women" component={ProductList} />
              <Route path="/top_10" component={ProductList} /> */}
            </>
          </Router>
        </ApolloProvider>
      </>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { BatchHttpLink } from "apollo-link-batch-http"
import { onError } from "apollo-link-error"
import { ApolloLink } from "apollo-link"
import { ApolloProvider } from "react-apollo"
import { ThemeProvider } from "styled-components"
import theme from "./theme"
import GlobalStyle from "./GlobalStyle"
import ProductList from "./products/ProductList"
import ProductDetail from "./products/ProductDetail"

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
              <Route
                path="/thumbnail/:sectionSlug/:categorySlug/:subcategorySlug/pc/:sectionId/c/:categoryId/:subcategoryId.uts"
                component={ProductList}
              />
              <Route
                path="/category/:sectionSlug/:subcategorySlug/pc/:sectionId/:subcategoryId.uts"
                component={ProductList}
              />
              <Route
                path="/product/:parentCategorySlug/:categorySlug/:productSlug/pc/:parentCategoryId/c/:categoryId/:productId.uts"
                component={ProductDetail}
              />
              <Route
                path="/product/:parentCategorySlug/:categorySlug/:subCategorySlug/:productSlug/pc/:parentCategoryId/c/:categoryId/sc/:subCategoryId/:productId.uts"
                component={ProductDetail}
              />
              <Route
                path="/product/:parentCategorySlug/:categorySlug/:productSlug/productVariantId/:productVariantId/pc/:parentCategoryId/c/:categoryId/:productId.uts"
                component={ProductDetail}
              />
            </>
          </Router>
        </ApolloProvider>
      </>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

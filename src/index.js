import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import ProductList from "./ProductList"
import ProductDetail from "./ProductDetail"

import "./styles.css"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cacheRedirects: {
    Query: {
      getProduct: (_, args, { getCacheKey }) => {
        const pathParts = args.path.split('/')
        const id = pathParts[pathParts.length - 1].replace('.uts', '')
        return getCacheKey({ __typename: "Product", id })
      }
    }
  }
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <>
          <Route exact path="/" component={ProductList} />
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
      </ApolloProvider>
    </Router>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

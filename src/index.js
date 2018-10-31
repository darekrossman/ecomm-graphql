import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import { ThemeProvider } from "styled-components"
import createClient from "./apollo-client"
import theme, { GlobalStyle } from "./theme"
import ModalSwitch from "./common/ModalSwitch"
import ProductList from "./products/ProductList"
import Cart from "./cart/Cart"

const client = createClient()

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
              <Route path="/cart" component={Cart} />
            </>
          </Router>
        </ApolloProvider>
      </>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

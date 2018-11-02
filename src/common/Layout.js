import React from "react"
import ScrollToTopOnMount from "./ScrollToTopOnMount"
import Header from "./Header"
import { Flex } from "../ui"

const Layout = props => (
  <>
    <ScrollToTopOnMount />
    <Flex
      flexDirection="column"
      minHeight="100vh"
      align="stretch"
      bg="grey.100"
      {...props}
    >
      <Header />
      {props.children}
    </Flex>
  </>
)

export default Layout

import React from "react"
import ScrollToTopOnMount from "./ScrollToTopOnMount"
import Header from "./Header"
import { Flex } from "../ui"

const Layout = props => (
  <>
    {props.scrollToTopOnMount && <ScrollToTopOnMount />}
    <Flex flexDirection="column" minHeight="100vh" align="stretch" {...props}>
      <Header />
      {props.children}
    </Flex>
  </>
)

export default Layout

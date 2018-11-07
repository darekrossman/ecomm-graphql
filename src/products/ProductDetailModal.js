import React from "react"
import ProductDetail from "./ProductDetail"
import Header from "../common/Header"
import { Drawer, IconButton } from "../ui"

class ProductDetailModal extends React.Component {
  state = {
    isOpen: false
  }

  componentDidMount() {
    this.setState({ isOpen: true })
  }

  goBack = () => {
    this.setState({ isOpen: false })
    setTimeout(() => this.props.history.goBack(), 300)
  }

  render() {
    return (
      <Drawer
        noBackdrop
        isOpen={this.state.isOpen}
        close={this.goBack}
        width="100%"
        dock="right"
        header={
          <Header
            leftButton={
              <IconButton
                color="grey.900"
                icon="ArrowBack"
                bg="transparent"
                ml="-3px"
                onClick={this.goBack}
              />
            }
          />
        }
      >
        <ProductDetail {...this.props} noLayout delayAnimation />
      </Drawer>
    )
  }
}

export default ProductDetailModal

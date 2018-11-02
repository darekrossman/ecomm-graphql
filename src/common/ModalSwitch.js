import React from "react"
import { Route, Switch } from "react-router-dom"
import ProductList from "../products/ProductList"
import ProductDetail from "../products/ProductDetail"
import ProductDetailModal from "../products/ProductDetailModal"

class ModalSwitch extends React.Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    } else if (nextProps.history.action === "POP") {
      this.previousLocation = nextProps.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/(category|thumbnail)/" component={ProductList} />
          <Route path="/product/" component={ProductDetail} />
        </Switch>

        {isModal && <Route path="/product/" component={ProductDetailModal} />}
      </>
    )
  }
}

export default ModalSwitch

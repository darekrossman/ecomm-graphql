import React from "react"
import { Route, Switch } from "react-router-dom"
import ProductList from "../products/ProductList"
import ProductDetail from "../products/ProductDetail"
import ProductDetailModal from "../products/ProductDetailModal"

class ModalSwitch extends React.Component {
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ) // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
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
        </Switch>
        {isModal ? (
          <>
            <Route
              path="/product/:parentCategorySlug/:categorySlug/:productSlug/pc/:parentCategoryId/c/:categoryId/:productId.uts"
              component={ProductDetailModal}
            />
            <Route
              path="/product/:parentCategorySlug/:categorySlug/:subCategorySlug/:productSlug/pc/:parentCategoryId/c/:categoryId/sc/:subCategoryId/:productId.uts"
              component={ProductDetailModal}
            />
            <Route
              path="/product/:parentCategorySlug/:categorySlug/:productSlug/productVariantId/:productVariantId/pc/:parentCategoryId/c/:categoryId/:productId.uts"
              component={ProductDetailModal}
            />
          </>
        ) : null}
      </div>
    )
  }
}

export default ModalSwitch

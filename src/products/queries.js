import gql from "graphql-tag"
import {
  ProductSummaryFragment,
  ProductDetailFragment,
  CartItemsFragment
} from "./fragments"

export const productSummaryQuery = gql`
  query GetProduct($path: String!) {
    product: getProduct(path: $path) {
      ...ProductSummaryFragment
    }
  }
  ${ProductSummaryFragment}
`

export const productDetailQuery = gql`
  query GetProductDeliveryOptions($path: String!) {
    productDetail: getProduct(path: $path) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`

export const getCartQuery = gql`
  query GetCart {
    cart: getCart {
      ...CartItemsFragment
    }
  }
  ${CartItemsFragment}
`

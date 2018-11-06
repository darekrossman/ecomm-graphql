import gql from "graphql-tag"
import { Image } from "../ui"

export const ProductSummaryFragment = gql`
  fragment ProductSummaryFragment on Product {
    id
    name
    path
    sku
    price
    rating
    reviewCount
    brand
    thumbnail {
      src
      s7 {
        fluid(maxWidth: 250) {
          ...FluidImage
        }
      }
    }
  }
  ${Image.fragments.fluidImage}
`

export const ProductDetailFragment = gql`
  fragment ProductDetailFragment on Product {
    id
    description
    categoryId
    parentCategoryId
    subCategoryId
    quantity
    productVariantId
    deliveryMethod
    deliveryOptions {
      key
      value
      primaryLabel
      secondaryLabel
    }
  }
`

export const CartItemsFragment = gql`
  fragment CartItemsFragment on Cart {
    items {
      id
      name
      path
      sku
      price
      rating
      reviewCount
      brand
      thumbnail {
        src
        s7 {
          fluid(maxWidth: 250) {
            ...FluidImage
          }
        }
      }
      uuid
      quantity
      deliveryMethod
      deliveryOptions {
        key
        value
        primaryLabel
        secondaryLabel
      }
    }
  }
  ${Image.fragments.fluidImage}
`

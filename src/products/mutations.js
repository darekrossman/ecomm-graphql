import gql from "graphql-tag"
import { CartItemsFragment } from "./fragments"

export const setDeliveryMethodMutation = gql`
  mutation SetProductDeliveryMethod($id: String!, $deliveryMethod: String!) {
    setProductDeliveryMethod(id: $id, deliveryMethod: $deliveryMethod) @client
  }
`

export const addToCartMutation = gql`
  mutation AddToCart(
    $id: String!
    $name: String!
    $categoryId: String!
    $parentCategoryId: String!
    $subCategoryId: String!
    $quantity: Int!
    $productVariantId: String!
    $deliveryMethod: String!
  ) {
    addToCart(
      id: $id
      name: $name
      categoryId: $categoryId
      parentCategoryId: $parentCategoryId
      subCategoryId: $subCategoryId
      quantity: $quantity
      productVariantId: $productVariantId
      deliveryMethod: $deliveryMethod
    ) {
      items {
        id
      }
    }
  }
`

export const removeFromCartMutation = gql`
  mutation RemoveFromCart($uuid: String!) {
    removeFromCart(uuid: $uuid) {
      ...CartItemsFragment
    }
  }
  ${CartItemsFragment}
`

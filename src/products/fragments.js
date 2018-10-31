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

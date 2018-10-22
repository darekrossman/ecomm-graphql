import gql from "graphql-tag"
import { Image } from "../ui"

export const ProductSummaryFragment = gql`
  fragment ProductSummaryFragment on Product {
    id
    name
    path
    price
    rating
    thumbnail {
      s7 {
        fluid(maxWidth: 250) {
          ...FluidImage
        }
      }
    }
  }
  ${Image.fragments.fluidImage}
`

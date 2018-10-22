import React from "react"
import styled from "styled-components"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { Image } from "../ui"

const PRODUCT_IMAGES_QUERY = gql`
  query GetProduct($path: String!) {
    productImages: getProduct(path: $path) {
      id
      images {
        s7 {
          fluid(maxWidth: 320) {
            ...FluidImage
          }
        }
      }
    }
  }
  ${Image.fragments.fluidImage}
`

class ProductDetailImages extends React.Component {
  state = { loaded: false }

  render() {
    const { props } = this
    return (
      <Query
        query={PRODUCT_IMAGES_QUERY}
        variables={{ path: props.productPath }}
      >
        {({ loading, error, data }) => {
          const thumbnail = props.productData.thumbnail
            ? props.productData.thumbnail.s7
            : {}
          const image =
            !loading && !error ? data.productImages.images[0].s7 : {}

          return (
            <Image
              fluid={image.fluid}
              alt={props.productData.name}
              blurUpPreview={thumbnail.fluid.src}
            />
          )
        }}
      </Query>
    )
  }
}

export default ProductDetailImages

import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { Transition, config } from "react-spring"

const ProductDetail = props => (
  <Query
    query={gql`
      query GetProduct($path: String!) {
        productImages: getProduct(path: $path) {
          id
          images
        }
      }
    `}
    variables={{ path: props.productPath }}
  >
    {({ loading, error, data }) => {
      return (
        <div className="product-detail-image aspect-1">
          {!loading && !error ? (
            <img
              src={data.productImages.images[0]}
              alt={props.productData.name}
            />
          ) : (
            <img
              className="blur-up"
              src={props.productData.thumbnail}
              alt="blurred preview"
            />
          )}
        </div>
      )
    }}
  </Query>
)

export default ProductDetail

import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const ProductDetail = props => (
  <Query
    query={gql`
      query GetProduct($path: String!) {
        product: getProduct(path: $path) {
          id
          name
          price
          rating
          images
        }
      }
    `}
    variables={{ path: props.match.url }}
  >
    {({ loading, error, data }) => {
      console.log(data)
      if (error) return <p>{error.message}</p>
      return <pre>{JSON.stringify(data.product, null, 2)}</pre>
    }}
  </Query>
)

export default ProductDetail

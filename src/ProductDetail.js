import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import ProductDetailImages from "./ProductDetailImages"

const ProductDetail = props => (
  <Query
    query={gql`
      query GetProduct($path: String!) {
        product: getProduct(path: $path) {
          id
          name
          price
          rating
          thumbnail
        }
      }
    `}
    variables={{ path: props.match.url }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>loading...</p>
      if (error) return <p>{error.message}</p>

      const { product } = data

      return (
        <div className="product-detail-root">
          <ProductDetailImages
            productPath={props.match.url}
            productData={product}
          />
          <section className="product-detail-content">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
          </section>
        </div>
      )
    }}
  </Query>
)

export default ProductDetail

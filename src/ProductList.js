import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { Link } from "react-router-dom"

const ProductList = () => (
  <Query
    query={gql`
      {
        products: getProducts(path: "/thumbnail/Furniture/Living-Room-Furniture/Console-Tables/pc/2285/c/3058/2610.uts") {
          id
          name
          path
          price
          rating
          thumbnail
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{error.message}</p>

      return (
        <div className="product-grid">
          {data.products.map(product => (
            <Link to={product.path} key={product.id} className="product-card">
              <div className="product-card-image">
                <img src={product.thumbnail} alt={product.name} />
              </div>
              <div className="product-card-info">
                <p className="product-card-title">{product.name}</p>
                <p className="product-card-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )
    }}
  </Query>
)

export default ProductList

import React from "react"
import gql from "graphql-tag"
import QueryLoader from "../common/QueryLoader"
import { ProductSummaryFragment } from "./fragments"
import Layout from "../common/Layout"
import ProductListCard from "./ProductListCard"
import { Grid } from "../ui"

const QUERY = gql`
  query GetProducts($path: String!) {
    products: getProducts(path: $path) {
      ...ProductSummaryFragment
    }
  }
  ${ProductSummaryFragment}
`

const ProductList = props => (
  <Layout bg="grey.200">
    <QueryLoader query={QUERY} variables={{ path: props.location.pathname }}>
      {({ data }) => (
        <Grid
          p={3}
          gridTemplateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)"
          ]}
          gridGap="24px 16px"
        >
          {data.products.map(product => (
            <ProductListCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </QueryLoader>
  </Layout>
)

export default ProductList

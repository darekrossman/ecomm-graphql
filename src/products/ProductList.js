import React, { Fragment } from "react"
import gql from "graphql-tag"
import { Link } from "react-router-dom"
import styled from "styled-components"
import QueryLoader from "../common/QueryLoader"
import { ProductSummaryFragment } from "./fragments"
import Layout from "../common/Layout"
import RatingStars from "./RatingStars"
import { Grid, Flex, AspectBox, Text, Image } from "../ui"

const QUERY = gql`
  query GetProducts($path: String!) {
    products: getProducts(path: $path) {
      ...ProductSummaryFragment
    }
  }
  ${ProductSummaryFragment}
`

const ProductCard = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border-radius: 3px;
`

const ProductList = props => (
  <Layout bg="grey.200">
    <QueryLoader query={QUERY} variables={{ path: props.match.url }}>
      {({ loading, error, data: { products } }) => (
        <Grid
          gridTemplateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)"
          ]}
          gridGap="24px 16px"
          p={3}
        >
          {products.map(product => (
            <ProductCard to={product.path} key={product.id}>
              <Image fluid={product.thumbnail.s7.fluid} alt={product.name} />

              <Flex flexDirection="column" flex="1 1 auto" bg="grey.50" p={2}>
                <Text
                  flex="1 1 auto"
                  color="grey.900"
                  fontSize={1}
                  lineHeight="16px"
                  fontWeight="semibold"
                  mb={1}
                >
                  {product.name}
                </Text>

                <RatingStars rating={product.rating} size={14} mb={1} />

                <Text color="grey.900" fontSize={3}>
                  ${product.price}
                </Text>
              </Flex>
            </ProductCard>
          ))}
        </Grid>
      )}
    </QueryLoader>
  </Layout>
)

export default ProductList

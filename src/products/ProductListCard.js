import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import RatingStars from "./RatingStars"
import { Flex, Box, Text, Image } from "../ui"

const ProductListCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border-radius: 3px;
`

const ProductListCard = ({ product }) => {
  return (
    <ProductListCardWrapper
      to={{
        pathname: product.path,
        state: { modal: true }
      }}
    >
      <Image
        fluid={
          (product.thumbnail &&
            product.thumbnail.s7 &&
            product.thumbnail.s7.fluid) ||
          product.thumbnail
        }
        alt={product.name}
      />

      <Flex flexDirection="column" flex="1 1 auto" bg="grey.50" p={2}>
        <Box flex="1 1 auto" mb={1}>
          <Text
            color="grey.900"
            fontSize={1}
            lineHeight="16px"
            fontWeight="semibold"
          >
            {product.name}
          </Text>
          {product.brand !== null && (
            <Text color="grey.600" fontSize={0} lineHeight="16px" mt="2px">
              {product.brand}
            </Text>
          )}
        </Box>

        {product.rating !== null && (
          <RatingStars rating={product.rating} size={14} mb={1} />
        )}

        <Text color="grey.900" fontSize={3}>
          ${product.price}
        </Text>
      </Flex>
    </ProductListCardWrapper>
  )
}

export default ProductListCard

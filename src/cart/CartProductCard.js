import React from "react"
import styled from "styled-components"
import { Flex, Box, Text, Image, Button, IconLabel } from "../ui"
import ProductDeliveryOptions from "../products/ProductDeliveryOptions"

const Root = styled(Flex)`
  background: white;
  flex-direction: column;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const CartProductCard = ({ product }) => {
  return (
    <Root mb={2}>
      <Flex flex="1 1 auto" p={3}>
        <Box width={100} flex="1 0 auto">
          <Image
            fluid={
              (product.thumbnail &&
                product.thumbnail.s7 &&
                product.thumbnail.s7.fluid) ||
              product.thumbnail
            }
            alt={product.name}
            borderRadius={3}
          />
        </Box>

        <Flex flexDirection="column" ml={3}>
          <Box flex="1 1 auto">
            <Text textStyle="title" mt="-3px">
              {product.name}
            </Text>
            <Text textStyle="caption" mt="3px">
              Item #{product.sku}
            </Text>
          </Box>
          <Text textStyle="headline" lineHeight={1}>
            ${product.price}
          </Text>
        </Flex>
      </Flex>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        py={3}
        mx={3}
        borderTop="1px solid"
        borderColor="grey.200"
      >
        <Text lineHeight={1}>Qty: {product.quantity}</Text>
        <Text textStyle="headline" fontWeight="bold" lineHeight={1}>
          ${product.quantity * product.price}
        </Text>
      </Flex>

      <ProductDeliveryOptions
        options={product.deliveryOptions}
        selectedOption={product.deliveryMethod}
      />

      <Flex p={3}>
        <Button bg="transparent" px={0} height={24}>
          <IconLabel
            icon="Close"
            size={14}
            color="grey.400"
            textProps={{
              fontSize: 0,
              ml: "-3px",
              fontWeight: "normal",
              color: "black"
            }}
          >
            Remove
          </IconLabel>
        </Button>
      </Flex>
    </Root>
  )
}

export default CartProductCard

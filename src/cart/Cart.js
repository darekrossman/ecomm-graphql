import React from "react"
import gql from "graphql-tag"
import { Trail, animated, config } from "react-spring"
import { ProductSummaryFragment } from "../products/fragments"
import QueryLoader from "../common/QueryLoader"
import Layout from "../common/Layout"
import CartProductCard from "./CartProductCard"
import { Flex, Text } from "../ui"

const QUERY = gql`
  query GetCart {
    cart: getCart {
      items {
        ...ProductSummaryFragment
        quantity
        deliveryMethod
        deliveryOptions {
          key
          value
          primaryLabel
          secondaryLabel
        }
      }
    }
  }
  ${ProductSummaryFragment}
`

const CONTEXT = {
  headers: {
    "x-cookie-payload": "PIPELINE_SESSION_ID=7972f191a21c47e480bb36ecc79bfa57;"
  }
}

const Cart = props => (
  <Layout>
    <QueryLoader query={QUERY} context={CONTEXT}>
      {({ data }) => {
        console.log(data.cart.items)
        return (
          <>
            <Flex justifyContent="space-between" m={3}>
              <Text textStyle="title">Shopping Cart</Text>
              <Text textStyle="caption">{data.cart.items.length} Items</Text>
            </Flex>

            <Trail
              native
              items={data.cart.items}
              keys={item => item.id}
              from={{ transform: "translate3d(0,20px,0)" }}
              to={{ transform: "translate3d(0,0px,0)" }}
            >
              {item => props => (
                <animated.div style={props}>
                  <CartProductCard product={item} />
                </animated.div>
              )}
            </Trail>
          </>
        )
      }}
    </QueryLoader>
  </Layout>
)

export default Cart

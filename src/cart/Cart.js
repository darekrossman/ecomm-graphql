import React from "react"
import { Transition, animated } from "react-spring"
import { Mutation } from "react-apollo"
import { removeFromCartMutation } from "../products/mutations"
import { getCartQuery } from "../products/queries"
import QueryLoader from "../common/QueryLoader"
import Layout from "../common/Layout"
import CartProductCard from "./CartProductCard"
import { Box, Flex, Text } from "../ui"

const Cart = props => (
  <Layout>
    <QueryLoader query={getCartQuery} fetchPolicy="cache-and-network">
      {({ data }) => (
        <>
          <Flex justifyContent="space-between" m={3}>
            <Text textStyle="title">Shopping Cart</Text>
            <Text textStyle="caption">{data.cart.items.length} Items</Text>
          </Flex>

          <Box position="relative">
            <Mutation
              mutation={removeFromCartMutation}
              update={(cache, { data: { removeFromCart } }) => {
                cache.writeQuery({
                  query: getCartQuery,
                  data: { cart: removeFromCart }
                })
              }}
            >
              {removeFromCart => (
                <Transition
                  native
                  items={data.cart.items}
                  keys={item => item.uuid}
                  from={{
                    transform: "translateY(50px)",
                    opacity: 0,
                    height: "auto"
                  }}
                  enter={{
                    transform: "translateY(0px)",
                    opacity: 1,
                    height: "auto"
                  }}
                  leave={{
                    transform: "translateY(0px)",
                    opacity: 0,
                    height: 0
                  }}
                  trail={100}
                  config={{ tension: 220, friction: 25, mass: 0.8 }}
                >
                  {item => props => (
                    <animated.div style={props}>
                      <CartProductCard
                        mb={2}
                        product={item}
                        onRemove={uuid =>
                          removeFromCart({
                            variables: { uuid },
                            optimisticResponse: {
                              __typename: "Mutation",
                              removeFromCart: {
                                __typename: "Cart",
                                items: data.cart.items.filter(
                                  item => item.uuid !== uuid
                                )
                              }
                            }
                          })
                        }
                      />
                    </animated.div>
                  )}
                </Transition>
              )}
            </Mutation>
          </Box>
        </>
      )}
    </QueryLoader>
  </Layout>
)

export default Cart

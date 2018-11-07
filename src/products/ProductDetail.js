import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { Spring, Transition, animated } from "react-spring"
import Spinner from "react-spinkit"
import { productSummaryQuery, productDetailQuery } from "./queries"
import { setDeliveryMethodMutation, addToCartMutation } from "./mutations"
import Layout from "../common/Layout"
import QueryLoader from "../common/QueryLoader"
import ProductDetailImages from "./ProductDetailImages"
import RatingStars from "./RatingStars"
import ProductDeliveryOptions from "./ProductDeliveryOptions"
import { Box, Flex, Text, Heading, Button, IconLabel } from "../ui"

const SlideIn = ({ children, delay = 0, ...props }) => (
  <Spring
    native
    from={{ opacity: 0, transform: "translateX(-15px)" }}
    to={{ opacity: 1, transform: "translateX(0px)" }}
    config={{ tension: 220, friction: 25, delay }}
    {...props}
  >
    {styles => children(styles)}
  </Spring>
)

const ProductSummary = ({ delayAnimation, product }) => (
  <Box p={3} pb={2}>
    <SlideIn delay={delayAnimation ? 200 : 0}>
      {styles => (
        <animated.div style={styles}>
          <Heading as="h3" fontSize={4} fontWeight="semibold">
            {product.name}
          </Heading>
        </animated.div>
      )}
    </SlideIn>

    <SlideIn delay={delayAnimation ? 300 : 100}>
      {styles => (
        <animated.div style={styles}>
          <Flex alignItems="center" mb={3} mt={1}>
            <RatingStars
              rating={product.rating}
              mr={2}
              count={product.reviewCount}
            />
            <Text fontSize={1} color="grey.700">
              Item #{product.sku}
            </Text>
          </Flex>
        </animated.div>
      )}
    </SlideIn>

    <SlideIn delay={delayAnimation ? 380 : 180}>
      {styles => (
        <animated.div style={styles}>
          <Text fontSize={5}>${product.price}</Text>
        </animated.div>
      )}
    </SlideIn>
  </Box>
)

const DeliveryOptions = ({ delayAnimation, product }) => (
  <Spring
    native
    from={{ opacity: 0, transform: "translateY(25px)" }}
    to={{ opacity: 1, transform: "translateY(0px)" }}
    config={{
      tension: 210,
      friction: 25,
      delay: 380
    }}
  >
    {styles => (
      <animated.div style={styles}>
        <Box bg="white" borderBottom="1px solid" borderColor="grey.200">
          <Mutation mutation={setDeliveryMethodMutation}>
            {setProductDeliveryMethod => (
              <ProductDeliveryOptions
                options={product.deliveryOptions}
                selectedOption={product.deliveryMethod}
                onSelect={deliveryMethod =>
                  setProductDeliveryMethod({
                    variables: {
                      id: product.id,
                      deliveryMethod
                    }
                  })
                }
              />
            )}
          </Mutation>

          <Flex p={3}>
            <Box
              as="input"
              height={40}
              width={40}
              border="1px solid"
              borderColor="grey.300"
              borderRadius={3}
              mr={3}
              defaultValue="1"
              textAlign="center"
              fontSize="16px"
            />
            <Mutation mutation={addToCartMutation} variables={product}>
              {(addToCart, { loading, error }) => (
                <Button
                  position="relative"
                  bg="green.500"
                  flex="1 1 auto"
                  overflow="hidden"
                  onClick={addToCart}
                  disabled={loading}
                >
                  <Transition
                    items={loading}
                    from={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      transform: "translateX(50px)",
                      opacity: 0
                    }}
                    enter={{
                      transform: "translateX(0px)",
                      opacity: 1
                    }}
                    leave={{
                      transform: "translateX(-50px)",
                      opacity: 0
                    }}
                    config={{ tension: 220, friction: 25, mass: 0.8 }}
                  >
                    {isLoading =>
                      !isLoading
                        ? props => (
                            <Flex
                              justifyContent="center"
                              alignItems="center"
                              style={props}
                            >
                              <IconLabel icon="ShoppingCart" size={16}>
                                Add to Cart
                              </IconLabel>
                            </Flex>
                          )
                        : props => (
                            <Flex
                              justifyContent="center"
                              alignItems="center"
                              style={props}
                            >
                              <Spinner
                                name="circle"
                                color="#fff"
                                fadeIn="none"
                              />
                            </Flex>
                          )
                    }
                  </Transition>
                </Button>
              )}
            </Mutation>
          </Flex>
        </Box>
      </animated.div>
    )}
  </Spring>
)

const ProductDescription = ({ delayAnimation, product }) => (
  <Box>
    <Spring
      native
      from={{ opacity: 0, transform: "translateY(25px)" }}
      to={{ opacity: 1, transform: "translateY(0px)" }}
      config={{ tension: 210, friction: 25, delay: 400 }}
    >
      {styles => (
        <animated.div style={styles}>
          <Box
            p={3}
            css={`
              & * {
                font-size: 14px;
                line-height: 20px;
                font-family: inherit;
              }
              & .description > * {
                margin-bottom: 20px;
              }
              p,
              ul {
                margin-bottom: 20px;
              }
              ul {
                padding-left: 20px;
              }
              li p {
                margin-bottom: 0;
              }
            `}
          >
            <Heading as="h5" mb={3} fontWeight="semibold">
              Product Decription
            </Heading>
            <Box
              dangerouslySetInnerHTML={{
                __html: product.description
              }}
            />
          </Box>
        </animated.div>
      )}
    </Spring>
  </Box>
)

const Detail = ({ delayAnimation, ...props }) => (
  <QueryLoader
    query={productSummaryQuery}
    variables={{ path: props.location.pathname }}
  >
    {({ loading, error, data: { product } }) => (
      <Fragment>
        <Box bg="white">
          <ProductDetailImages
            productPath={props.location.pathname}
            productData={product}
          />
          <ProductSummary delayAnimation={delayAnimation} product={product} />
        </Box>

        <Box position="relative" minHeight={100}>
          <Query
            query={productDetailQuery}
            variables={{ path: props.location.pathname }}
          >
            {({ error, loading, data }) =>
              !error && (
                <Transition
                  items={loading}
                  from={{ opacity: 1 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={{ tension: 350, friction: 30 }}
                >
                  {loading =>
                    loading
                      ? props => (
                          <animated.div
                            style={{
                              ...props,
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              marginTop: -11,
                              marginLeft: -11
                            }}
                          >
                            <Spinner name="circle" color="#678cae" />
                          </animated.div>
                        )
                      : props => (
                          <animated.div style={props}>
                            <DeliveryOptions
                              delayAnimation={delayAnimation}
                              product={{ ...product, ...data.productDetail }}
                            />
                            <ProductDescription
                              delayAnimation={delayAnimation}
                              product={{ ...product, ...data.productDetail }}
                            />
                          </animated.div>
                        )
                  }
                </Transition>
              )
            }
          </Query>
        </Box>
      </Fragment>
    )}
  </QueryLoader>
)

const ProductDetail = ({ noLayout = false, ...props }) =>
  noLayout ? (
    <Detail {...props} />
  ) : (
    <Layout bg="grey.50">
      <Detail {...props} />
    </Layout>
  )

export default ProductDetail

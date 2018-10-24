import React, { Fragment } from "react"
import gql from "graphql-tag"
import { Spring, animated } from "react-spring"
import { ProductSummaryFragment } from "./fragments"
import Layout from "../common/Layout"
import QueryLoader from "../common/QueryLoader"
import ProductDetailImages from "./ProductDetailImages"
import RatingStars from "./RatingStars"
import ProductDetailDescription from "./ProductDetailDescription"
import { Box, Text, Heading } from "../ui"

const QUERY = gql`
  query GetProduct($path: String!) {
    product: getProduct(path: $path) {
      ...ProductSummaryFragment
    }
  }
  ${ProductSummaryFragment}
`

const SlideIn = ({ children, ...props }) => (
  <Spring
    native
    from={{ opacity: 0, transform: "translateX(-15px)" }}
    to={{ opacity: 1, transform: "translateX(0px)" }}
    {...props}
  >
    {styles => children(styles)}
  </Spring>
)

const Detail = ({ delayAnimation, ...props }) => (
  <QueryLoader query={QUERY} variables={{ path: props.match.url }}>
    {({ loading, error, data: { product } }) => (
      <Fragment>
        <Box bg="white">
          <ProductDetailImages
            productPath={props.match.url}
            productData={product}
          />
          <Box p={3}>
            <SlideIn delay={delayAnimation ? 200 : 0}>
              {styles => (
                <animated.div style={styles}>
                  <Heading as="h3" fontSize={4} fontWeight="semibold" mb={1}>
                    {product.name}
                  </Heading>
                </animated.div>
              )}
            </SlideIn>

            <SlideIn delay={delayAnimation ? 300 : 100}>
              {styles => (
                <animated.div style={styles}>
                  <RatingStars rating={product.rating} mb={3} />
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
        </Box>

        <Box borderTop="1px solid" borderColor="grey.100">
          <ProductDetailDescription
            path={props.match.url}
            delayAnimation={delayAnimation}
          />
        </Box>
      </Fragment>
    )}
  </QueryLoader>
)

const ProductDetail = ({ noLayout = false, ...props }) =>
  noLayout ? (
    <Detail {...props} />
  ) : (
    <Layout bg="grey.50" scrollToTopOnMount>
      <Detail {...props} />
    </Layout>
  )

export default ProductDetail

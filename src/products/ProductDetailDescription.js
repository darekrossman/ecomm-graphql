import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { Spring, animated, config } from "react-spring"
import { Box, Heading } from "../ui"

const QUERY = gql`
  query GetProductDescription($path: String!) {
    product: getProduct(path: $path) {
      id
      description
    }
  }
`

const ProductDetailDescription = ({ delayAnimation, ...props }) => (
  <Query query={QUERY} variables={{ path: props.path }}>
    {({ loading, error, data }) => {
      if (loading || error) return null

      const { product } = data

      return (
        <Spring
          native
          from={{ opacity: 0, transform: "translateY(25px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          delay={delayAnimation ? 150 : 50}
          config={config.stiff}
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
                <Heading as="h5" mb={3}>
                  Product Decription
                </Heading>
                <Box
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  {...props}
                />
              </Box>
            </animated.div>
          )}
        </Spring>
      )
    }}
  </Query>
)

export default ProductDetailDescription

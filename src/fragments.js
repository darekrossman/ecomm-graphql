import gql from "graphql-tag"

export const FluidImage = gql`
  fragment FluidImage on S7Picture {
    src
    sizes
    srcSet
    aspectRatio
    width
    height
  }
`

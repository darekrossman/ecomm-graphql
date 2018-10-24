import React from "react"
import { Flex, Icon } from "../ui"

const iterator = Array.from(Array(5).keys())

const RatingStars = ({ rating, size = 18, ...props }) => (
  <Flex
    color={!rating ? "grey.500" : "deeporange.800"}
    {...props}
    css={`
      & svg {
        margin: 0 -1px;
      }
    `}
  >
    {iterator.map(idx => {
      const i = idx + 1
      const iconName =
        i <= rating ? "Star" : i - rating === 0.5 ? "StarHalf" : "StarBorder"
      return <Icon name={iconName} key={`ratingstar-${i}`} size={size} />
    })}
  </Flex>
)

export default RatingStars

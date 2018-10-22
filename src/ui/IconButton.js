import React from "react"
import Button from "./Button"
import Icon from "./Icon"

const IconButton = ({ icon, size = 24, round = true, ...props }) => (
  <Button
    height={size + 18}
    width={size + 18}
    minWidth={size + 18}
    px={0}
    borderRadius={round ? "50%" : 3}
    {...props}
  >
    <Icon name={icon} size={size} />
  </Button>
)

export default IconButton

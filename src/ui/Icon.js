import React from "react"
import * as Icons from "styled-icons/material"

const Icon = ({ name, size = 23, ...props }) =>
  React.createElement(Icons[name], { size, ...props })

export default Icon

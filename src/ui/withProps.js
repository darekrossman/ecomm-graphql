import React from 'react'

const withProps = (Component, sysProps) => props => (
  <Component {...sysProps} {...props} />
)

export default withProps

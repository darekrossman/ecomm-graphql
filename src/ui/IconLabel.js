import React from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Grid from './Grid'
import Text from './Text'
import Icon from './Icon'

const Root = styled(Grid)`
  & svg {
    color: ${p => themeGet(`colors.${p.iconColor || p.color}`, 'inherit')(p)};
  }
`

const IconLabel = ({
  icon,
  children,
  size = 23,
  split,
  flip,
  textProps,
  iconStyle,
  ...props
}) => (
  <Root
    gridAutoFlow="column"
    gridGap="6px"
    alignItems="center"
    justifyContent={split ? 'space-between' : 'center'}
    {...props}
  >
    <Icon name={icon} size={size} style={iconStyle} />
    <Text
      as="span"
      gridColumn={!flip ? '2/2' : '1/2'}
      fontFamily="inherit"
      {...textProps}
    >
      {children}
    </Text>
  </Root>
)

export default IconLabel

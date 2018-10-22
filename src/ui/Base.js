import React from 'react'
import styled from 'styled-components'
import * as sty from 'styled-system'

const style = (prop, cssProperty, key, transformValue, scale) =>
  sty.style({ prop, cssProperty, key, transformValue, scale })

const Base = styled.div`
  ${sty.color}
  ${sty.background}
  ${sty.backgroundImage}
  ${sty.backgroundSize}
  ${sty.backgroundPosition}
  ${sty.backgroundRepeat}
  ${sty.fontSize}
  ${sty.space}
  ${sty.display}
  ${sty.borderRadius}
  ${sty.boxShadow}
  ${sty.opacity}
  ${sty.size}
  ${sty.ratio}
  ${sty.verticalAlign}
  ${sty.maxWidth}
  ${sty.minWidth}
  ${sty.maxHeight}
  ${sty.minHeight}
  ${sty.width}
  ${sty.borders}
  ${sty.position}
  ${sty.zIndex}
  ${sty.top}
  ${sty.right}
  ${sty.bottom}
  ${sty.left}
  ${sty.borderColor}
  ${sty.height}
  ${sty.flex}
  ${sty.alignItems}
  ${sty.justifyItems}
  ${sty.justifyContent}
  ${sty.flexWrap}
  ${sty.flexDirection}
  ${sty.alignContent}
  ${sty.alignSelf}
  ${sty.justifySelf}
  ${sty.flexBasis}
  ${sty.fontFamily}
  ${sty.textAlign}
  ${sty.lineHeight}
  ${sty.fontWeight}
  ${sty.letterSpacing}
  ${style('textTransform', 'text-transform')}

  /* grid */
  ${sty.gridRowGap}
  ${sty.gridColumnGap}
  ${sty.gridGap}
  ${sty.gridColumn}
  ${sty.gridRow}
  ${sty.gridAutoFlow}
  ${sty.gridAutoRows}
  ${sty.gridAutoColumns}
  ${sty.gridTemplateRows}
  ${sty.gridTemplateColumns}
  ${style('gridTemplateAreas', 'grid-template-areas')}
  ${style('gridArea', 'grid-area')}

  ${style('transform', 'transform')}
  ${style('transition', 'transition', 'transitions')}

  ${style('overflow', 'overflow')}
  ${style('blend', 'mix-blend-mode')}
  ${style('filter', 'filter')}
  ${style('order', 'order')}

  ${props => props.css}
`

export default Base

export const extendBase = defaultProps => props => {
  const _props =
    typeof defaultProps === 'function'
      ? defaultProps(props)
      : { ...defaultProps, ...props }
  return <Base {..._props} />
}

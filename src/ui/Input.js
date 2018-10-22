import styled from 'styled-components'
import Base from './Base'

const Input = styled(Base)(
  {
    appearance: 'none',
    display: 'inline-block',
    lineHeight: 'inherit',
    outline: 'none',
    '&[disabled]': {
      opacity: 0.5,
    },
  },
  p => p.theme['Input']
)

Input.defaultProps = {
  as: 'input',
  type: 'text',
  px: 3,
  py: 0,
  m: 0,
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'grey.300',
  height: 48,
  bg: 'white',
  fontFamily: 'sans',
  fontSize: 1,
}

export default Input

import styled from 'styled-components'
import { textStyle } from 'styled-system'
import Base from './Base'

const Text = styled(Base)({}, textStyle)

Text.defaultProps = {
  as: 'p',
  m: 0,
  fontFamily: 'sans',
  lineHeight: 1.5,
}

export default Text

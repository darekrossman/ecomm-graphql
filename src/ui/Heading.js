import styled from 'styled-components'
import { textStyle } from 'styled-system'
import Base from './Base'

const Heading = styled(Base)({}, textStyle)

Heading.defaultProps = {
  as: 'h2',
  fontFamily: 'sans',
  m: 0,
}

export default Heading

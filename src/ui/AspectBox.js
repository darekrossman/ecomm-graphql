import styled from "styled-components"
import Box from "./Box"

export default styled(Box)`
  position: relative;
  overflow: hidden;
  height: 0;
  padding-top: 100%;
  background: #ccc;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

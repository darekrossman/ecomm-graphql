import { createGlobalStyle as css } from "styled-components"
import { normalize } from "polished"

const GlobalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    box-sizing: inherit;
  }

  body,
  input,
  textarea,
  select,
  button {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyle

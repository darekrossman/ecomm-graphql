import React from "react"
import styled from "styled-components"
import { Link as _Link } from "react-router-dom"
import { Box, Text, Icon } from "../ui"

const Link = styled(_Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 8px;
  border-bottom: 1px solid ${p => p.theme.colors.grey[200]};
  color: #111;
`

class NavMenu extends React.Component {
  static defaultProps = {
    onNavigation: Function.prototype
  }

  state = {
    items: null
  }

  renderNavItems = items => e => {
    e.preventDefault()
    this.setState({ items })
  }

  render() {
    const { menu } = this.props
    const { items } = this.state

    if (!menu) {
      return <Text>Loading...</Text>
    }

    return (
      <Box>
        {(items || menu.levels[0].items).map((item, rootIdx) => {
          return (
            <Box key={`root-nav-${rootIdx}`}>
              {item.url ? (
                <Link to={item.url} onClick={this.props.onNavigation}>
                  {item.text}
                </Link>
              ) : (
                <Link onClick={this.renderNavItems(item.items)} to="">
                  <Text mx={1}>{item.text}</Text>
                  <Icon name="ChevronRight" />
                </Link>
              )}
            </Box>
          )
        })}
      </Box>
    )
  }
}

export default NavMenu

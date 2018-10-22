import React from 'react'

class Toggle extends React.Component {
  state = { active: this.props.defaultActive || false }
  toggle = () => this.setState({ active: !this.state.active })
  render() {
    return this.props.children(this.state.active, this.toggle)
  }
}

export default Toggle

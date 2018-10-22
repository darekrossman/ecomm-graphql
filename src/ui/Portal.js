import React from 'react'
import { createPortal } from 'react-dom'

class Portal extends React.Component {
  render() {
    return createPortal(this.props.children, document.body)
  }
}

export default Portal

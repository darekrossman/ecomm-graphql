import React from 'react'

class Selectable extends React.Component {
  static defaultProps = {
    defaultSelection: [],
    max: 0,
  }
  state = {
    selection: [].concat(this.props.defaultSelection).splice(-this.props.max),
  }
  toggleIndex = index => {
    const { selection } = this.state
    const isSelected = selection.includes(index)
    const nextSelection = isSelected
      ? selection.filter(i => i !== index)
      : selection.concat(index)
    this.setState({ selection: nextSelection.splice(-1 * this.props.max) })
  }
  clear = () => this.setState({ selection: [] })
  render() {
    return this.props.children(this.state.selection, {
      toggleIndex: this.toggleIndex,
      clear: this.clear,
    })
  }
}

export default Selectable

import React from "react"
import Portal from "./Portal"
import Box from "./Box"
import IconButton from "./IconButton"

class Drawer extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    isEntering: this.props.isOpen
  }

  static getDerivedStateFromProps(next, prev) {
    if (!prev.isOpen && next.isOpen) {
      return { isEntering: true, isLeaving: false }
    }
    if (prev.isOpen && !next.isOpen) {
      return { isEntering: false, isLeaving: true }
    }
    return {}
  }

  componentDidUpdate(pprops, pstate) {
    if (this.state.isEntering && !pstate.isEntering && !this.state.isOpen) {
      setTimeout(() => this.setState({ isOpen: true }))
    }
    if (this.state.isLeaving && !pstate.isLeaving && this.state.isOpen) {
      setTimeout(() => this.setState({ isOpen: false }), 200)
    }
  }

  render() {
    const {
      close,
      portalProps,
      width = "280px",
      height = "100%",
      dock = "left",
      ...props
    } = this.props
    const { isOpen, isEntering, isLeaving } = this.state
    const transitioning = isOpen && isEntering

    if (!isOpen && !isEntering) {
      return null
    }

    const transform = {
      left: `translateX(${transitioning ? "0" : "-100%"})`,
      right: `translateX(${transitioning ? "0" : "100%"})`
    }[dock]

    const margins = {
      left: 0,
      right: "0 0 0 auto"
    }[dock]

    return (
      <Portal>
        <React.Fragment>
          <Box
            bg={transitioning ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)"}
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={1000}
            css={`
              transition: all 200ms ${isLeaving ? "ease-in" : "ease-out"};
            `}
            {...portalProps}
          >
            <Box
              position="relative"
              bg="grey.50"
              maxWidth="100%"
              width={width}
              height={height}
              m={margins}
              css={`
                transform: ${transform};
                transition: all 200ms ease-out;
              `}
              {...props}
            >
              <IconButton
                icon="Close"
                onClick={close}
                bg="transparent"
                color="grey.800"
              />

              <Box>{this.props.children}</Box>
            </Box>
          </Box>
        </React.Fragment>
      </Portal>
    )
  }
}

/** @component */
export default Drawer

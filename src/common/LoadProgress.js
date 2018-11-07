import React from "react"
import { Transition, animated } from "react-spring"
import Spinner from "react-spinkit"
import { Flex } from "../ui"

class LoadProgress extends React.Component {
  render() {
    return (
      <>
        <Transition
          native
          items={this.props.loading}
          from={{ opacity: 1 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {loading =>
            loading &&
            (styles => (
              <animated.div style={styles}>
                <Flex
                  flex="1 1 auto"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  top={60}
                  right={0}
                  bottom={0}
                  left={0}
                  zIndex={9999}
                  bg="grey.200"
                  {...this.props}
                >
                  <Spinner name="circle" color="#678cae" fadeIn="none" />
                </Flex>
              </animated.div>
            ))
          }
        </Transition>
        {!this.props.loading && this.props.children()}
      </>
    )
  }
}

export default LoadProgress

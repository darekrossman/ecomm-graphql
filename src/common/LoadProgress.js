import React from "react"
import { Transition, config } from "react-spring"
import Spinner from "react-spinkit"
import { Flex } from "../ui"

class LoadProgress extends React.Component {
  render() {
    return (
      <>
        <Transition
          from={{ opacity: 1 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          config={config.stiff}
        >
          {this.props.loading &&
            (styles => (
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
                style={styles}
                {...this.props}
              >
                <Spinner name="circle" color="#678cae" fadeIn="none" />
              </Flex>
            ))}
        </Transition>
        {!this.props.loading && this.props.children()}
      </>
    )
  }
}

export default LoadProgress

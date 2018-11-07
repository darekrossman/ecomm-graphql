import React from "react"
import styled from "styled-components"
import { Transition, animated } from "react-spring"
import gql from "graphql-tag"
import VisibilitySensor from "react-visibility-sensor"
import { AspectBox } from "./"

const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  opacity: ${p => (p.loaded ? 1 : 0)};
  transition: opacity 0.5s ease 0s;
`

const BlurredImg = styled.img`
  filter: blur(10px);
  transform: scale(4);
`

class Image extends React.Component {
  state = { loaded: false, ready: false }

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ ready: true })
    }
  }

  render() {
    const { alt, fluid, blurUpPreview, ...props } = this.props
    const { ready, loaded } = this.state
    return (
      <VisibilitySensor
        onChange={this.onVisibilityChange}
        partialVisibility={true}
      >
        <AspectBox ref={node => (this.root = node)} {...props}>
          <Transition
            native
            items={fluid && ready}
            from={{
              position: "absolute",
              opacity: 1
            }}
            enter={{
              opacity: 1
            }}
            leave={{
              opacity: 0
            }}
            config={{ tension: 300, friction: 30, delay: 5000 }}
          >
            {isReady =>
              !isReady
                ? props => (
                    <animated.div style={props}>
                      {blurUpPreview ? (
                        <BlurredImg
                          className="blur-up"
                          src={blurUpPreview}
                          alt="blurred preview"
                        />
                      ) : null}
                      )}
                    </animated.div>
                  )
                : props => (
                    <animated.div style={props}>
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={fluid.srcSet}
                          sizes={fluid.sizes}
                        />
                        <Img
                          src={fluid.src}
                          alt={alt}
                          loaded={loaded}
                          onLoad={e => this.setState({ loaded: true })}
                        />
                      </picture>
                    </animated.div>
                  )
            }
          </Transition>
        </AspectBox>
      </VisibilitySensor>
    )
  }
}

Image.fragments = {
  fluidImage: gql`
    fragment FluidImage on Picture {
      src
      sizes
      srcSet
      aspectRatio
      width
      height
    }
  `
}

export default Image

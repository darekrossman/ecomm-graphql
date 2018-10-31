import React from "react"
import styled from "styled-components"
import gql from "graphql-tag"
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

  componentDidMount() {
    this.scrollObserver = new IntersectionObserver(
      ([el], observer) => {
        if (el.isIntersecting) {
          this.setState({ ready: true })
          this.scrollObserver.unobserve(this.root)
        }
      },
      {
        threshold: [0, 1.0]
      }
    )
    this.scrollObserver.observe(this.root)
  }

  render() {
    const { alt, fluid, blurUpPreview, ...props } = this.props
    const { ready, loaded } = this.state
    return (
      <AspectBox ref={node => (this.root = node)} {...props}>
        {blurUpPreview && (
          <BlurredImg
            className="blur-up"
            src={blurUpPreview}
            alt="blurred preview"
          />
        )}
        {fluid &&
          ready && (
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
          )}
      </AspectBox>
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

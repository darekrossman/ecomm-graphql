import React from 'react'
import { Spring, config } from 'react-spring'
import Portal from './Portal'
import Box from './Box'
import Flex from './Flex'
import Heading from './Heading'
import IconButton from './IconButton'

class Modal extends React.Component {
  render() {
    const { isOpen, close, title, portalProps, ...props } = this.props
    if (!isOpen) {
      return null
    }
    return (
      <Portal>
        <Spring
          from={{ opacity: 0, y: 0.8 }}
          to={{ opacity: 1, y: 1.0 }}
          config={config.stiff}
        >
          {({ opacity, y }) => (
            <Box
              bg="rgba(0,0,0,0.6)"
              position="fixed"
              p={[0, 0, 5]}
              pt={[0, 0, 6]}
              top={0}
              right={0}
              bottom={0}
              left={0}
              zIndex={1000}
              {...portalProps}
              style={{ opacity }}
            >
              <Box
                position="relative"
                bg="grey.50"
                maxWidth="100%"
                width={600}
                m="auto"
                borderRadius={3}
                {...props}
                style={{ opacity, transform: `scale(${y})` }}
              >
                <Flex alignItems="center" height={64} pl={2}>
                  <Heading
                    as="h6"
                    fontSize={2}
                    fontWeight={400}
                    mx={3}
                    flex={1}
                  >
                    {title || ''}
                  </Heading>
                  <IconButton
                    icon="X"
                    onClick={close}
                    mr={[2, 2, 3]}
                    color="grey.500"
                    transparent
                  />
                </Flex>
                <Box px={[3, 3, 4]} pt={1}>
                  {this.props.children}
                </Box>
              </Box>
            </Box>
          )}
        </Spring>
      </Portal>
    )
  }
}

export default Modal

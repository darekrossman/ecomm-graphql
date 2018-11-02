import React from "react"
import { Transition } from "react-spring"
import { Flex, Box, Text, Icon } from "../ui"

class ProductDeliveryOptions extends React.Component {
  render() {
    const {
      options,
      selectedOption,
      onSelect = () => null,
      ...props
    } = this.props
    return (
      <Box {...props}>
        {options.map((opt, idx) => {
          const selected = opt.value === selectedOption
          return (
            <Flex
              key={`${opt.key}${idx}`}
              alignItems="center"
              position="relative"
              py={3}
              px={3}
              bg={selected ? "grey.50" : "white"}
              transition="all 200ms ease-out"
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor={selected ? "grey.100" : "grey.100"}
              zIndex={selected ? 2 : 1}
              mt={idx > 0 ? "-1px" : 0}
              onClick={() => onSelect(opt.value)}
            >
              <Box flex="1 1 auto">
                <Text fontSize={1} fontWeight="semibold" lineHeight="18px">
                  {opt.primaryLabel}
                </Text>
                {opt.secondaryLabel && (
                  <Text fontSize={0} color="grey.900">
                    {opt.secondaryLabel}
                  </Text>
                )}
              </Box>
              <Flex
                flex="0 0 auto"
                width={24}
                height={24}
                justifyContent="center"
                alignItems="center"
                position="relative"
                color={selected ? "green.500" : "grey.300"}
                css="* svg {width: 100%; height: 100%; color: inherit;}"
              >
                <Transition
                  items={selected}
                  from={{ position: "absolute", transform: "scale(0)" }}
                  enter={{ transform: "scale(1)" }}
                  leave={{ transform: "scale(0)" }}
                  config={{ tension: 350, friction: 30 }}
                >
                  {selected =>
                    !selected
                      ? props => (
                          <Icon
                            name="RadioButtonUnchecked"
                            size="100%"
                            style={props}
                          />
                        )
                      : props => (
                          <Icon name="CheckCircle" size="100%" style={props} />
                        )
                  }
                </Transition>
              </Flex>
            </Flex>
          )
        })}
      </Box>
    )
  }
}

export default ProductDeliveryOptions

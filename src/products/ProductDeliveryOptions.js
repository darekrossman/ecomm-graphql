import React from "react"
import { Flex, Box, Text, Icon } from "../ui"

class ProductDeliveryOptions extends React.Component {
  render() {
    const { options, selectedOption, ...props } = this.props
    return (
      <Box mx={3} {...props}>
        {options.map((opt, idx) => {
          const selected = opt.value === selectedOption
          return (
            <Flex
              key={`${opt.key}${idx}`}
              alignItems="center"
              py="10px"
              px={2}
              border={selected ? "1px solid" : "0"}
              borderColor="green.100"
              bg={selected ? "green.50" : "transparent"}
              borderRadius={3}
            >
              <Flex
                flex="0 0 auto"
                width={24}
                height={24}
                mr={2}
                justifyContent="center"
                alignItems="center"
                color={selected ? "green.500" : "grey.300"}
                css="* svg {width: 100%; height: 100%; color: inherit;}"
              >
                <Icon
                  name={selected ? "CheckCircle" : "RadioButtonUnchecked"}
                  size="100%"
                />
              </Flex>
              <Box flex="1 1 auto">
                <Text fontSize={1} fontWeight="semibold" lineHeight="18px">
                  {opt.primaryLabel}
                </Text>
                {opt.secondaryLabel && (
                  <Text textStyle="caption" color="black" mb="-3px">
                    {opt.secondaryLabel}
                  </Text>
                )}
              </Box>
            </Flex>
          )
        })}
      </Box>
    )
  }
}

export default ProductDeliveryOptions

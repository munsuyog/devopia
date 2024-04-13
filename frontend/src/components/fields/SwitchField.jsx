// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import React from "react";

export default function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    reversed,
    fontSize,
    ...rest
  } = props;
  return (
    <Box w="100%" fontWeight="500" {...rest}>
      
    </Box>
  );
}

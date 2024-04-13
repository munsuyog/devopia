// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.jsx";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function Project(props) {
  const { title, ranking, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p='14px'>
      
    </Card>
  );
}

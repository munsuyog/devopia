// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.jsx";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";

export default function Notifications(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb="20px" mt="40px" mx="auto" maxW="410px" {...rest}>
      
    </Card>
  );
}

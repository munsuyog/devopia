import { Badge, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const InsuranceCard = ({ title, description }) => {
    const bgColor = useColorModeValue("gray.200", "gray.700");

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} mb={4} bg={bgColor} boxShadow="lg">
            <Heading mb={2} size="lg">{title}</Heading>
            <Badge borderRadius="full" px="2" colorScheme="teal">
                New
            </Badge>
            <Text mt={2}>{description}</Text>
        </Box>
    );
};

export default InsuranceCard;
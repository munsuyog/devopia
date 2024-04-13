import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useColorModeValue,
  Text,
  VStack,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
} from "@chakra-ui/react";

const PeopleList = () => {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });

  const [members, setMembers] = useState([]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMembers([...members, formState]);
    setFormState({
      name: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleDelete = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const buttonColor = useColorModeValue("teal", "green");

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
    >
      <Box
        p={5}
        rounded="md"
        bg={formBackground}
        shadow="md"
        width="100%"
        maxWidth="600px"
        mb={5}
      >
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Members
        </Text>
        <VStack spacing={4} align="start" width="100%">
          {members.length > 0 ? (
            members.map((member, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius="lg"
                p={5}
                width="100%"
                bg={formBackground}
                shadow="lg"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Avatar name={member.name} size="md" mr={4} />
                    <Box>
                      <Text fontWeight="semibold" fontSize="lg">
                        {member.name}
                      </Text>
                      <Text color="gray.500">{member.age} years old</Text>
                      <Text color="gray.500">{member.gender}</Text>
                      <Text color="gray.500">{member.phoneNumber}</Text>
                      <Text color="gray.500">{member.email}</Text>
                    </Box>
                  </Flex>
                  <Button
                    onClick={() => handleDelete(index)}
                    colorScheme="red"
                    size="sm"
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            ))
          ) : (
            <Text>No members yet.</Text>
          )}
        </VStack>
      </Box>

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Add New Member
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box
              as="form"
              onSubmit={handleSubmit}
              p={5}
              rounded="md"
              bg={formBackground}
              shadow="md"
              minWidth="70vw"
            >
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  color="white" // Set text color to white
                />
              </FormControl>

              <FormControl id="age" mb={4}>
                <FormLabel>Age</FormLabel>
                <Input
                  name="age"
                  value={formState.age}
                  onChange={handleChange}
                  color="white" // Set text color to white
                />
              </FormControl>

              <FormControl id="gender" mb={4}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formState.gender}
                  onChange={handleChange}
                  placeholder="Select Gender"
                  color="white" // Set text color to white
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl id="phoneNumber" mb={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                  color="white" // Set text color to white
                />
              </FormControl>

              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  color="white" // Set text color to white
                />
              </FormControl>

              <Button mt={4} colorScheme={buttonColor} type="submit">
                Submit
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default PeopleList;

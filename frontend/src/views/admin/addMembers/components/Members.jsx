import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, updateDoc} from "firebase/firestore";
import {app} from '../../../../utils/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
      phoneNumber: "",
      email: "",
    });
  };

  const handleDelete = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const buttonColor = useColorModeValue("teal", "green");

  console.log(formState.name, formState.age, formState.phoneNumber, formState.email);
  const auth = getAuth();
  const db = getFirestore(app);

  const handleSubmit2 = () => {
    onAuthStateChanged(auth, async (user) => {
      if(user){
      const docRef = doc(db,`users/${user.uid}/Family/Member`);
      await setDoc(docRef, {
        Name : formState.name,
        Age : formState.age,
        Phone_NO : formState.phoneNumber,
        Email : formState.email
    })
      }
      else{
          alert("not signed in")
      }
  })
  }

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

              <Button mt={4} colorScheme={buttonColor} type="submit" onClick={handleSubmit2}>
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

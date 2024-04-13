import { Alert, AlertIcon, AspectRatio, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from 'react';
import InsuranceCards from "./Insurancecards";

const InsuranceVideo = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [age, setAge] = useState('');
    const [income, setIncome] = useState('');
    const [insurance, setInsurance] = useState('');

    const calculateInsurance = () => {
        const result = ((74 - age) * income)/10000000;
        setInsurance(result);
    };

    return (
        <Box maxW="560px" mx="auto" p={4}>
            
            <Text mb="4" fontSize="xl" fontWeight="bold">
                Understanding Term Insurance
            </Text>
            <Text mt="4">
                Term insurance is a type of life insurance policy that provides coverage for a certain period of time or a specified "term" of years.
            </Text>
            <AspectRatio ratio={16 / 9} my="4">
                <iframe
                    src="https://www.youtube.com/embed/uIj5oQJOmFA"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </AspectRatio>
            <Text mt="4"> Term insurance is Calculated based on your age and income. </Text>
            <Button onClick={onOpen}>Open Calculator</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Insurance Calculator</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NumberInput value={age}  onChange={(value) => setAge(value)} min={0} max={74} p={4}> 
                        <NumberInputField placeholder="Enter your age" bg="white" />
                        </NumberInput>
                        <NumberInput value={income} onChange={(value) => setIncome(value)} min={0} p={4} >
                        <NumberInputField placeholder="Enter your annual income" bg="white" />
                        </NumberInput>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={calculateInsurance}>
                            Calculate
                        </Button>
                        {insurance && 
                            <Alert status="info">
                                <AlertIcon />
                                Your term insurance could be: {insurance} cr
                            </Alert>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <InsuranceCards insurance={insurance}/>
        </Box>
        
    );
};

export default InsuranceVideo;
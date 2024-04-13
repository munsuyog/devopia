// import { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";

// const PeopleList = () => {
    

//     return (
//         <Box>
//             <VStack spacing={4}>
//                 <FormControl>
//                     <FormLabel>Name</FormLabel>
//                     <Input value={name} onChange={(e) => setName(e.target.value)} />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Age</FormLabel>
//                     <Input value={age} onChange={(e) => setAge(e.target.value)} />
//                 </FormControl>
//                 <Button onClick={addPerson}>Add Person</Button>
//             </VStack>
//             <Box mt={6}>
//                 {people.map((person, index) => (
//                     <Box key={index}>
//                         <Text>Name: {person.name}</Text>
//                         <Text>Age: {person.age}</Text>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// export default PeopleList;

import React from 'react'
import PeopleList from './components/Members'

const index = () => {
  return (
    <div>
        <PeopleList/>
    </div>
  )
}

export default index
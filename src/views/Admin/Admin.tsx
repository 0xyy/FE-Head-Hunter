import React from 'react';
import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Stack } from '@chakra-ui/react';
import { AddHrForm } from '../../components/Forms/AddHrForm';

import './Admin.css';
import { AddStudentsForm } from '../../components/Forms/AddStudentsForm';

export const Admin = () => {
    return <>
        <Flex align="center" justify="center" bg="#222224" height="100vh">
            <Box p={6} rounded="md" w="80vw" h="80vh">
                <Center mb="60px">
                    <Heading color="white" as="h2" size="xl">Panel Admina</Heading>
                </Center>
                <HStack align="flex-start" justify="space-between">
                    <Box w="50%">
                        <Heading color="white" as="h3" size="lg" mb="20px">Dodaj kursantów (plik .json)</Heading>
                        <AddStudentsForm/>
                    </Box>
                    <Box w="50%">
                        <Heading color="white" as="h3" size="lg" mb="20px">Dodaj HR-a</Heading>
                        <AddHrForm/>
                    </Box>
                </HStack>
            </Box>
        </Flex>
    </>;
};
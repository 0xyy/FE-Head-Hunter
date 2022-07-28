import React from 'react';
import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Link, Stack, Text } from '@chakra-ui/react';

import './Admin.css';

export const Admin = () => {
    return <>
        <Flex align="center" justify="center" bg="#222224" height="100vh">
            <Box p={6} rounded="md" w="80vw" h="80vh">
                <Center mb="60px">
                    <Heading color="white" as="h2" size="xl">Panel Admina</Heading>
                </Center>
                <HStack align="flex-start" justify="space-between">
                    <Box w="50%">
                        <Heading color="white" as="h3" size="lg" mb="20px">Dodaj kursanta</Heading>
                        <form>
                            <FormControl>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <Stack width="100%" pt="10px">
                                <Button type="submit" colorScheme="red">Dodaj</Button>
                            </Stack>
                        </form>
                    </Box>
                    <Box w="50%">
                        <Heading color="white" as="h3" size="lg" mb="20px">Dodaj HR-a</Heading>
                        <form>
                            <FormControl mb="10px">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    variant="filled"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <FormControl mb="10px">
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Imię i nazwisko"
                                    variant="filled"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <FormControl mb="10px">
                                <Input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder="Nazwa firmy"
                                    variant="filled"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    id="maxReservedStudents"
                                    name="maxReservedStudents"
                                    type="number"
                                    placeholder="Maksymalna liczba osób, jakie może dodać do listy 'Do rozmowy'."
                                    variant="filled"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <Stack width="100%" pt="10px">
                                <Button type="submit" colorScheme="red">Dodaj</Button>
                            </Stack>
                        </form>
                    </Box>
                </HStack>
            </Box>
        </Flex>
    </>;
};
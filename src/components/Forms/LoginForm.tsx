import React from 'react';
import {useFormik} from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input, Link, Stack, Text,
    VStack
} from "@chakra-ui/react";

export const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async(values) => {

          await fetch(`http://localhost:3001/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
        }
    });

    return (
        <Flex align="center" justify="center" bg="#222224" height="100vh">
            <Box bg="#222224" p={6} rounded="md" border="1px" mt="20px" mb="20px">
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                placeholder="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                bgColor="#292A2B"
                                color="#DADADA"
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                variant="filled"
                                bgColor="#292A2B"
                                color="#DADADA"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </FormControl>
                        <Stack spacing={10} width="100%" pt="10px">
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'center'}
                                justify={'flex-end'}>
                                <Text> <Link color="#DADADA">Zapomniałeś hasła?</Link></Text>
                                <Button type="submit" colorScheme="red">
                                    Zaloguj się
                                </Button>
                            </Stack>
                        </Stack>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}

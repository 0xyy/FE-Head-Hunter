import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Stack,
    VStack,
    Image,
    Center,
    FormErrorMessage,
} from "@chakra-ui/react";

import logo from '../../assets/megak.png';
import {useNavigate, useParams} from "react-router-dom";
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";

export const ActivateUser = () => {
    const [errorTextValidation, setErrorTextValidation] = useState('');
    const [result, setResult] = useState();
    const {userId, activeToken} = useParams();
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            "repeat-password": '',
            password: '',
        },
        onSubmit: async (values) => {
            if (userId === undefined || activeToken === undefined) {
                return;
            }
            if (values.password !== values["repeat-password"]) {
                return setErrorTextValidation("Podane hasła są rózne!");
            } else if (values.password.length < 2 || values["repeat-password"].length < 2) {
                return setErrorTextValidation("Hasło musi mieć minimum 2 znaki");
            } else {
                setErrorTextValidation("");
            }

            const data = await sendRequest('/user/activate', 'PATCH', {
                password: values.password,
                userId,
                token: activeToken,
            }, {
                'Content-Type': 'application/json',
            });
            if (data.isSuccess) {
                setResult(data.message);
            }
        }
    });

    const goToLoginPage = () => {
        clearError()
        return nav('/')
    }

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
            {result && <InfoModal message={"Przejdź do logowania."} onClose={goToLoginPage} title={result}/>}
            <Flex position="absolute" top="0" left="0" width="100%" height="100vh" align="center" justify="center"
                  bg="#222224">
                <Box bg="#222224" p={6} rounded="md" border="1px" mt="20px" mb="20px">
                    <Center>
                        <Image
                            mb="20px"
                            htmlWidth="80px"
                            src={logo}
                            alt="MegaK logo"
                        />
                    </Center>
                    <form onSubmit={formik.handleSubmit}>
                        <VStack spacing={4} align="flex-start">
                            <FormControl isInvalid={!!errorTextValidation}>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Hasło"
                                    variant="filled"
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {errorTextValidation && (
                                    <FormErrorMessage>{errorTextValidation}</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl>
                                <Input
                                    id="repeat-password"
                                    name="repeat-password"
                                    type="password"
                                    variant="filled"
                                    placeholder="Powtórz hasło"
                                    onChange={formik.handleChange}
                                    value={formik.values["repeat-password"]}
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </FormControl>
                            <Stack spacing={10} width="100%" pt="10px">
                                <Stack
                                    align={'center'}>
                                    <Button type="submit" colorScheme="red">
                                        Aktywuj!
                                    </Button>
                                </Stack>
                            </Stack>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </>
    );
};

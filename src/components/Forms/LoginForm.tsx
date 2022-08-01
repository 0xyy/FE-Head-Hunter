import React from 'react';
import {useFormik} from 'formik';
import {
    Button,
    FormControl, FormErrorMessage,
    Input, Link, Stack, Text,
    VStack,
} from '@chakra-ui/react';
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import * as Yup from 'yup';
import {useAuth} from "../../common/hooks/auth-hook";
import { Link as ReachLink } from "react-router-dom";

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(255, 'Hasło jest za długie!')
        .required('Wymagane!'),
    email: Yup.string().email('Podaj poprawny adres e-mail!').required('Wymagane!'),
});

export const LoginForm = () => {
        const {sendRequest, error, clearError, isLoading} = useHttpClient();
        const {login} = useAuth();
        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: LoginSchema,
            onSubmit: async (values) => {
                const data = await sendRequest('/auth/login', 'POST', {
                    email: values.email,
                    pwd: values.password,
                }, {
                    'Content-Type': 'application/json',
                });
                if (data.isSuccess) {
                    login(data.userFullName,data.userId,data.userRole,data.avatarUrl);
                }
            }
        });

        return (
            <>
                {isLoading && <LoadingSpinner/>}
                {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl isInvalid={!!formik.errors.email}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                placeholder="E-mail"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                bgColor="#292A2B"
                                color="#DADADA"
                            />
                            {!!formik.errors.email && (
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!formik.errors.password}>
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
                            {!!formik.errors.password && (
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack spacing={10} width="100%" pt="10px">
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'center'}
                                justify={'flex-end'}>
                                <Text> <Link as={ReachLink} to="/recover-password" color="#DADADA">Zapomniałeś hasła?</Link></Text>
                                <Button type="submit" colorScheme="red">
                                    Zaloguj się
                                </Button>
                            </Stack>
                        </Stack>
                    </VStack>
                </form>
            </>
        );
    }
;

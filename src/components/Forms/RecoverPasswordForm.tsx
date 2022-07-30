import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {
    Button,
    FormControl, FormErrorMessage,
    Input, Stack, useToast,
    VStack,
} from '@chakra-ui/react';
import {useHttpClient} from "../../common/hooks/http-hook";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Podaj poprawny adres e-mail!').required('Wymagane!'),
});

export const RecoverPasswordForm = () => {
        const [toastMessage, setToastMessage] = useState({
            title: '',
            body: '',
        });
        const {sendRequest, error, clearError} = useHttpClient();
        const toast = useToast();
        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: LoginSchema,
            onSubmit: async (values) => {
                await sendRequest('/user/recover', 'POST', {
                    email: values.email,
                }, {
                    'Content-Type': 'application/json',
                });
                setToastMessage({
                    title: 'Sukces!',
                    body: 'Jeśli e-mail jest prawidłowy. Nowe hasło zostanie wysłane.',
                });
            }
        });

        useEffect(() => {
            if (toastMessage.title !== '' && toastMessage.body !== '') {
                const {title, body} = toastMessage;

                toast({
                    title,
                    description: body,
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });
            }
        }, [toastMessage, toast]);

        return (
            <>
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
                        <Stack spacing={10} width="100%" pt="10px">
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'center'}
                                justify={'center'}>
                                <Button type="submit" colorScheme="red">
                                    Odzyskaj hasło
                                </Button>
                            </Stack>
                        </Stack>
                    </VStack>
                </form>
            </>
        );
    }
;

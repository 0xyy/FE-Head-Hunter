import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {
    Button,
    FormControl, FormErrorMessage,
    Input, Stack, useToast,
    VStack,
} from '@chakra-ui/react';
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import * as Yup from 'yup';

const EditSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(255, 'Hasło jest za długie!')
        .required('Wymagane!'),
    "new-password": Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(255, 'Hasło jest za długie!')
        .required('Wymagane!'),
    "new-password-repeat": Yup.string()
        .min(2, 'Hasło jest za krótkie!')
        .max(255, 'Hasło jest za długie!')
        .required('Wymagane!')
        .oneOf([Yup.ref('new-password'), null], 'Hasła muszą się zgadzać.')

});


export const EditPasswordForm = () => {
        const {sendRequest, error, clearError, isLoading} = useHttpClient();
        const [toastMessage, setToastMessage] = useState<{title: string,body: string,status:"error" | "success" | "info" | "warning" | "loading" | undefined}>({
            title: '',
            body: '',
            status: undefined,
        });
        const toast = useToast();
        const formik = useFormik({
            initialValues: {
                password: '',
                "new-password": '',
                "new-password-repeat": '',
            },
            validationSchema: EditSchema,
            onSubmit: async (values) => {
                const data = await sendRequest('/user/edit', 'PATCH', {
                    pwd: values.password,
                    newPwd: values["new-password"],
                }, {
                    'Content-Type': 'application/json',
                });
                if (data.isSuccess) {
                    setToastMessage({
                        status: 'success',
                        title: 'Sukces!',
                        body: 'Hasło zostało zmienione.',
                    })
                } else {
                    setToastMessage({
                        status: 'error',
                        title: 'Błąd!',
                        body: 'Problem przy zmianie hasła, spróbuj ponownie.',
                    })
                    formik.values.password = ''
                }
            }
        });

        useEffect(() => {
            if (toastMessage.title !== '' && toastMessage.body !== '') {
                const {title, body,status} = toastMessage;

                toast({
                    title,
                    description: body,
                    status: status,
                    duration: 5000,
                    isClosable: true
                });
            }
        }, [toastMessage, toast]);

        return (
            <>
                {isLoading && <LoadingSpinner/>}
                {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
                <form onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
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
                        <FormControl isInvalid={!!formik.errors["new-password"]}>
                            <Input
                                id="new-password"
                                name="new-password"
                                type="password"
                                placeholder="Nowe hasło"
                                variant="filled"
                                bgColor="#292A2B"
                                color="#DADADA"
                                onChange={formik.handleChange}
                                value={formik.values["new-password"]}
                            />
                            {!!formik.errors["new-password"] && (
                                <FormErrorMessage>{formik.errors["new-password"]}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!formik.errors["new-password-repeat"]}>
                            <Input
                                id="new-password-repeat"
                                name="new-password-repeat"
                                type="password"
                                placeholder="powtórz nowe hasło"
                                variant="filled"
                                bgColor="#292A2B"
                                color="#DADADA"
                                onChange={formik.handleChange}
                                value={formik.values["new-password-repeat"]}
                            />
                            {!!formik.errors["new-password-repeat"] && (
                                <FormErrorMessage>{formik.errors["new-password-repeat"]}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack spacing={10} width="100%" pt="10px">
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'center'}>
                                <Button type="submit" colorScheme="red">
                                    Zmień hasło
                                </Button>
                            </Stack>
                        </Stack>
                    </VStack>
                </form>
            </>
        );
    }
;

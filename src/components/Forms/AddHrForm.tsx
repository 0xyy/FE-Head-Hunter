import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, Stack, useToast} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {CreateHrResponse} from 'types';
import {useHttpClient} from "../../common/hooks/http-hook";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";

export const AddHrForm = () => {
        const {sendRequest, error, clearError, isLoading} = useHttpClient();
        const [toastMessage, setToastMessage] = useState({
            title: '',
            body: '',
        });
        const toast = useToast();

        const formik = useFormik({
            initialValues: {
                email: '',
                fullName: '',
                company: '',
                maxReservedStudents: '',
            },
            onSubmit: async values => {
                const data: CreateHrResponse = await sendRequest('/admin/addHr', 'POST', values, {
                    'Content-Type': 'application/json',
                });
                if (data.isSuccess) {
                    setToastMessage({
                        title: 'Sukces!',
                        body: 'Użytkownik został dodany.',
                    });
                }

            }
        });

        useEffect(() => {
            if (toastMessage.title !== '' && toastMessage.body !== '') {
                const {title, body} = toastMessage;

                toast({
                    title,
                    description: body,
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                });
            }
        }, [toastMessage, toast]);

        return (
            <>
                {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mb="10px">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            variant="filled"
                            bgColor="#292A2B"
                            color="#DADADA"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
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
                            required
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    {isLoading && <LoadingSpinner zIndex={'1'} absolute/>}
                    <FormControl mb="10px">
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Nazwa firmy"
                            variant="filled"
                            bgColor="#292A2B"
                            color="#DADADA"
                            required
                            value={formik.values.company}
                            onChange={formik.handleChange}
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
                            required
                            min="1"
                            max="999"
                            value={formik.values.maxReservedStudents}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <Stack width="100%" pt="10px">
                        <Button type="submit" colorScheme="red">Dodaj</Button>
                    </Stack>
                </form>
            </>
        );
    }
;
;
import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { CreateHrResponse } from 'types';

export const AddHrForm = () => {
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
            try {
                const res = await fetch(`http://localhost:3001/hr`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data: CreateHrResponse = await res.json();

                if (data.isSuccess) {
                    setToastMessage({
                        title: 'Sukces!',
                        body: data.message,
                    });
                }
            } catch (e) {
                throw e;
            }
        },
    });

    useEffect(() => {
        if (toastMessage.title !== '' && toastMessage.body !== '') {
            const { title, body } = toastMessage;

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
    );
};
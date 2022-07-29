import React, {useEffect, useState} from 'react';
import {Button, FormControl, Input, Stack, useToast} from '@chakra-ui/react';
import {useHttpClient} from "../../common/hooks/http-hook";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import { InsertStudentResponse } from 'types';

interface Event<T = EventTarget> {
    target: T;
}

export const AddStudentsForm = () => {
    const [file, setFile] = useState<string | Blob>('');
    const {sendRequest, error,setError, clearError, isLoading} = useHttpClient();

    const [toastMessage, setToastMessage] = useState({
        title: '',
        body: '',
    });
    const toast = useToast();

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const data:InsertStudentResponse = await sendRequest('/admin/createUsersFromFile', 'POST', formData,);
        console.log(data);

        if (data.isSuccess === true) {
            setToastMessage({
                title: 'Sukces!',
                body: `Dodano ${data.countSuccess} kursantów.`
            });
        } else {
            const failedResults = data.users.map(user => `${user.user.email}`)
            setError(failedResults.join('\n'))
        }
    };
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

    const onFileChange = (e: Event<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
    };

    return (
        <>
            {error && <InfoModal isError message={error} onClose={clearError} title={'Nie dodano użytkowników o adresie e-mail:'}/>}
            {isLoading && <LoadingSpinner/> }
            <form onSubmit={handleFormSubmit}>
                <FormControl>
                    <Input
                        id="file"
                        name="file"
                        type="file"
                        bgColor="#292A2B"
                        color="#DADADA"
                        variant="unstyled"
                        required
                        p="5px"
                        accept="application/JSON"
                        onChange={onFileChange}
                    />
                </FormControl>
                <Stack width="100%" pt="10px">
                    <Button type="submit" colorScheme="red">Dodaj</Button>
                </Stack>
            </form>
        </>
    );
};
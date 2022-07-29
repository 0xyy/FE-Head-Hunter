import React, { useState } from 'react';
import { Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';

interface Event<T = EventTarget> {
    target: T;
}

export const AddStudentsForm = () => {
    const [file, setFile] = useState<string | Blob>('');
    const toast = useToast()

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);

            await axios.post(`http://localhost:3001/student`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (e) {
            console.log(e)
        }
    };

    const onFileChange = (e: Event<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
    };

    return (
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
                <Button type="submit" colorScheme="red" >Dodaj</Button>
            </Stack>
        </form>
    );
};
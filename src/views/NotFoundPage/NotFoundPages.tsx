import React from 'react';
import {Box, Flex, Image} from "@chakra-ui/react";

export function NotFoundPage() {
    return (
        <Flex bg="#222224" alignItems="center" justifyContent="center" h="100vh">
            <Box>
                <Image src='https://http.cat/404' alt='page not found 404' />
            </Box>
        </Flex>
    );
}


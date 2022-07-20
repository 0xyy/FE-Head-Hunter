import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {LoadingSpinner} from "./components/LoadingSpinner/LoadingSpinner";

function App() {
    return (
        <ChakraProvider>
            <LoadingSpinner/>
        </ChakraProvider>
    );
}

export default App;

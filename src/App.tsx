import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {LoadingSpinner} from "./components/LoadingSpinner/LoadingSpinner";
import {LoginForm} from "./components/Forms/LoginForm";

function App() {
    return (
        <ChakraProvider>
            <LoginForm/>
            <LoadingSpinner/>
        </ChakraProvider>
    );
}

export default App;

import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {LoginForm} from "./components/Forms/LoginForm";

function App() {
    return (
        <ChakraProvider>
            <LoginForm/>
        </ChakraProvider>
    );
}

export default App;

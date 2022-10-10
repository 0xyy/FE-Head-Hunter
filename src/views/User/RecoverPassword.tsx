import React from "react";
import {Box, Center, Flex, Image} from "@chakra-ui/react";
import logo from "../../assets/megak.png";
import {RecoverPasswordForm} from "../../components/Forms/RecoverPasswordForm";


export const RecoverPassword = () => {
    return (
        <Flex position="absolute" top="0" left="0" width="100%" height="100vh" align="center" justify="center"
              bg="#222224">
            <Box bg="#222224" p={6} rounded="md" border="1px" mt="20px" mb="20px">
                <Center>
                    <Image
                        mb="20px"
                        htmlWidth="80px"
                        src={logo}
                        alt="MegaK logo"
                    />
                </Center>
                <RecoverPasswordForm/>
            </Box>
        </Flex>
    );
};
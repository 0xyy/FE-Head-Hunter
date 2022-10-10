import React from "react";
import {
    Box, Center,
    Flex,
    Image,
} from "@chakra-ui/react";
import logo from "../../assets/megak.png";
import "./Header.css";
import {MenuHeader} from "./MenuHeader";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <Box
            w="100vw"
            bg="#1E1E1F"
            color="#F7F7F7"
            position="fixed"
        >
            <Center>
                <Flex
                    as="nav"
                    align="center"
                    justify="space-between"
                    wrap="wrap"
                    w="1430px"
                    h="80px"
                    ml="20px"
                    mr="20px"
                >
                    <Box>
                        <Link to="/">
                            <Image
                                htmlWidth="89px"
                                height="55"
                                src={logo}
                                alt="MegaK logo"
                                alignItems={"center"}
                            />
                        </Link>
                    </Box>
                    <MenuHeader/>
                </Flex>
            </Center>
        </Box>
    );
};




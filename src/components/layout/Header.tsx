import React from 'react';
import {
    Box,
    Flex,
    Image,
} from "@chakra-ui/react";
import logo from "../../assets/megak.png";
import './Header.css';
import {MenuHeader} from "./MenuHeader";
import {Link} from "react-router-dom";
export const Header = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            h="80px"
            bg="#1E1E1F"
            color="#F7F7F7"
            position="fixed"
            w="100vw"
        >
            <Box ml="12.76%">
                <Link to="/">
                    <Image
                        htmlWidth="89px"
                        height="55"
                        src={logo}
                        alt="MegaK logo"
                        alignItems={'center'}
                    />
                </Link>
            </Box>
            <MenuHeader/>
        </Flex>
    );
};




import React from 'react';
import {Box, Flex, Image, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Text} from "@chakra-ui/react";
import defaultIcon from "../../assets/default-icon-profil.jpg";
import {useAuth} from "../../common/hooks/auth-hook";

export function MenuHeader() {
    const {avatarUrl, userFullName} = useAuth();
    return (
        <Menu autoSelect={false}>
            <MenuButton mr="12.76%">
                <Flex align="center"
                      justify="space-between" w="260px">
                    <Box>
                        <Flex
                            align="center">
                            <Image
                                width="45"
                                height="45"
                                borderRadius="full"
                                objectFit="cover"
                                src={avatarUrl ? avatarUrl : defaultIcon}
                                alt="user profil icon"
                                alignItems="center"
                                mr="10px"
                            />
                            <Text fontSize="18px">{userFullName}</Text>
                        </Flex>
                    </Box>
                    <Box w={0} h={0} borderTop="5px solid #9e9e9e" borderLeft="5px solid transparent"
                         borderRight="5px solid transparent">
                    </Box>
                </Flex>
            </MenuButton>
            <MenuList borderRadius={0} bgColor="#1E1E1F" borderColor="#1E1E1F" >
                <MenuGroup title="Profile">
                    <MenuItem _hover={{backgroundColor: "#292A2B"}}>Zmień hasło</MenuItem>
                    <MenuItem _hover={{backgroundColor: "#292A2B"}}>Wyloguj </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}


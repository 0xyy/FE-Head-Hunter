import React, {useState} from 'react';
import {
    Box, Button,
    Flex,
    Image,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import defaultIcon from "../../assets/default-icon-profil.jpg";
import {useAuth} from "../../common/hooks/auth-hook";
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import {EditPasswordForm} from "../Forms/EditPasswordForm";

export function MenuHeader() {
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const [isEditPassword, setIsEditPassword] = useState(false);
    const {avatarUrl, userFullName, logout} = useAuth();

    const logoutClick = async () => {
        const data = await sendRequest('/auth/logout', 'GET');
        if (data.isSuccess) {
            logout();
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {error && <InfoModal isError message={error} onClose={clearError} title={'Nieudana próba!'}/>}
            <Modal onClose={() => setIsEditPassword(false)} isOpen={isEditPassword} isCentered>
                <ModalOverlay/>
                <ModalContent bgColor="#222224" color="#F7F7F7">
                    <ModalHeader>Zmiana Hasła</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <EditPasswordForm/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={() => setIsEditPassword(false)}>Zamknij</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
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
                <MenuList borderRadius={0} bgColor="#1E1E1F" borderColor="#1E1E1F">
                    <MenuGroup title="Profile">
                        <MenuItem onClick={() => setIsEditPassword(true)} _hover={{backgroundColor: "#292A2B"}}>Zmień
                            hasło</MenuItem>
                        <MenuItem onClick={logoutClick} _hover={{backgroundColor: "#292A2B"}}>Wyloguj </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </>
    );
}


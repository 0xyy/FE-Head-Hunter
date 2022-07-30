import React from 'react';
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {EditPasswordForm} from "../Forms/EditPasswordForm";

interface Props {
    onClose: ()=> void,
    isOpen: boolean
}

export function ModalEditPassword(props:Props) {
    const {isOpen,onClose} = props

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay/>
            <ModalContent bgColor="#222224" color="#F7F7F7">
                <ModalHeader>Zmiana Hasła</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <EditPasswordForm/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose} >Zamknij</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
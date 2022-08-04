import React, {useState} from "react";
import "./Hr.css";
import {
    Box,
    Center,
    Flex,
    Text,
    HStack,
    InputLeftElement,
    Input,
    InputGroup,
    Button,
    Image,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import filterIcon from "../../assets/filter-icon.png";


export const Hr = () => {
    const [isStudentPage, setIsStudentPage] = useState(true);
    return (
        <Box
            w="100vw"
            minH="100vh"
            bg="#1E1E1F"
            color="#222224"
        >
            <Center>
                <Flex
                    mt="100px"
                    align="flex-start"
                    flexDirection="column"
                    justify="flex-start"
                    wrap="wrap"
                    w="1430px"
                    bgColor="#292A2B"
                >
                    <Box
                        className="Hr__SelectPages"
                        w="100%"
                        m="15px 0 0 0"
                    >
                        <HStack
                            color="#F7F7F7"
                            justify="flex-start"
                            align="center">
                            <Text cursor="pointer" onClick={() => setIsStudentPage(true)} padding="20px" fontSize="18px"
                                  borderBottom={isStudentPage ? "red 2px solid" : ""}>Dostępni kursanci</Text>
                            <Text cursor="pointer" onClick={() => setIsStudentPage(false)} padding="20px"
                                  fontSize="18px" borderBottom={!isStudentPage ? "red 2px solid" : ""}>Do rozmowy</Text>
                        </HStack>
                    </Box>
                    <Box
                        w="100%"
                        padding="10px 20px"
                        borderTop="2px solid #1E1E1F"
                    >
                        <HStack className={"Hr__Search-filter"} color="#F7F7F7" justify="space-between">
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="#666666"/>}
                                />
                                <Input type="text"
                                       placeholder="miasto, typ umowy, rodzaj pracy"
                                       _placeholder={{color: "#666666"}}
                                       id="password"
                                       name="password"
                                       variant="filled"
                                       bgColor="#1E1E1F"
                                       color="#DADADA"
                                       w="365px"
                                />
                            </InputGroup>
                            <Button
                                bgColor="#1E1E1F"
                                color="#F7F7F7">
                                <Image
                                    htmlWidth="16px"
                                    src={filterIcon}
                                    alt="ikona filtrowania"
                                /> Filtrowanie</Button>
                        </HStack>

                    </Box>
                </Flex>
            </Center>
        </Box>
    );
};
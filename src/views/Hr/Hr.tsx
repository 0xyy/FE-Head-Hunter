import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
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
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    WrapItem,
    Td,
    Table,
    Thead,
    Th, TableCaption, TableContainer, Tbody, Tr,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import filterIcon from "../../assets/filter-icon.png";
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import {ActiveStudentsResponse, StudentAvailabilityViewInterface} from "types";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "../../common/hooks/query-params";
import {FilterStudents} from "../../components/FilterStudents/FilterStudents";
import "./Hr.css";


export const Hr = () => {
    const [isStudentPage, setIsStudentPage] = useState(true);
    const [studentList, setStudentList] = useState<StudentAvailabilityViewInterface[]>([]);
    const [studentsCount, setStudentsCount] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const [path, setPath] = useState(useLocation().search);
    const [pathFilter, setPathFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(Number(useQuery("currentPage")) || 1);
    const [pageSize, setPageSize] = useState(Number(useQuery("search")) || 10);
    const [search, setSearch] = useState(useQuery("search") || "");
    const nav = useNavigate();

    const link = useLocation().search;
    useEffect(() => {
        (async () => {
            if (link.length === 0) {
                setSearch("");
                setPath("");
                setPathFilter("");
            }
            const data: ActiveStudentsResponse = await sendRequest(`/hr/students/available/${link}`, "GET");
            if (data.isSuccess) {
                setStudentsCount(data.studentsCount);
                setStudentList(data.students);
            }
        })();
    }, [useLocation()]);

    const selectPageSizeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setPath(`search=${search}&currentPage=${currentPage}&pageSize=${e.target.value}`);
        nav(`/?search=${search}&currentPage=${currentPage}&pageSize=${e.target.value}${pathFilter}`);
        setPageSize(Number(e.target.value));
    };

    function submitSearchHandler(e: KeyboardEvent<HTMLElement>) {
        if (e.key === "Enter") {
            setPath(`search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`);
            nav(`/?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}${pathFilter}`);
        }
    }

    //@TODO porpawić wyświetlanie ilość użytkowników przy selekcie...
    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {error && <InfoModal isError message={error} onClose={clearError} title={"Nieudana próba!"}/>}
            <FilterStudents
                isOpen={isFilter}
                onClose={() => setIsFilter(false)}
                path={path}
                setPathFilter={setPathFilter}
            />
            <Box
                w="100vw"
                minH="100vh"
                bg="#1E1E1F"
                color="#F7F7F7"
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
                                <Text cursor="pointer" onClick={() => setIsStudentPage(true)} padding="20px"
                                      fontSize="18px"
                                      borderBottom={isStudentPage ? "red 2px solid" : ""}>Dostępni kursanci</Text>
                                <Text cursor="pointer" onClick={() => setIsStudentPage(false)} padding="20px"
                                      fontSize="18px" borderBottom={!isStudentPage ? "red 2px solid" : ""}>Do
                                    rozmowy</Text>
                            </HStack>
                        </Box>
                        <Box
                            w="100%"
                            padding="10px 20px"
                            borderTop="2px solid #1E1E1F"
                        >
                            <HStack className={"Hr__Search-filter"} color="#F7F7F7" justify="space-between" pb='2'>
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
                                           value={search}
                                           onKeyUp={submitSearchHandler}
                                           onChange={(e) => setSearch(e.target.value)}
                                           w="365px"
                                    />
                                </InputGroup>
                                <Button
                                    bgColor="#1E1E1F"
                                    color="#F7F7F7"
                                    onClick={() => setIsFilter(true)}
                                >
                                    <Image
                                        htmlWidth="16px"
                                        src={filterIcon}
                                        alt="ikona filtrowania"
                                    />
                                    Filtrowanie
                                </Button>
                            </HStack>

                        </Box>
                        <Box>
                            {/*{studentList.map(student => <p key={student.studentId}>{student.firstName}</p>)}*/}
                            <Accordion allowToggle w='100vw'>
                                <AccordionItem borderTop="2px solid #1E1E1F" borderBottom="15px solid #1E1E1F">
                                    <h2>
                                        <AccordionButton p='5'>
                                            <Box flex='1' textAlign='left'>
                                                <Flex
                                                    align="center"
                                                    flexDirection="row"
                                                    justify="space-between"
                                                    mr='12'
                                                >
                                                    Jan K.
                                                    <WrapItem>
                                                        <Button colorScheme='red'>Zarezerwuj rozmowę</Button>
                                                    </WrapItem>
                                                </Flex>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel  p='15' m='3' bgColor="#222324">
                                        <TableContainer>
                                            <Table variant='unstyled'>
                                                <Thead  w='100vw'>
                                                    <Tr style={{
                                                        whiteSpace: "normal",
                                                        wordWrap: "break-word",
                                                    }}>
                                                        <Th>Ocena przejścia kursu</Th>
                                                        <Th>Ocena aktywności i zaangazowania na kursie</Th>
                                                        <Th>Ocena kodu w projekcie własnym</Th>
                                                        <Th>Ocena pracy w zespole scrum</Th>
                                                        <Th>Preferowane miejsce pracy</Th>
                                                        <Th>Docelowe miasto, gdzie chce pracować kandydat</Th>
                                                        <Th>Oczekiwany typ kontraktu</Th>
                                                        <Th>Oczekiwane wynagrodzenie miesięczne netto</Th>
                                                        <Th>Zgoda na odbycie bezpłatnych prakty/stazu na początek</Th>
                                                        <Th>Komercyjne doświadczenie w programowaniu</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>5 / 5</Td>
                                                        <Td>3 / 5</Td>
                                                        <Td>4 / 5</Td>
                                                        <Td>5 / 5</Td>
                                                        <Td>Biuro</Td>
                                                        <Td>Warszawa</Td>
                                                        <Td>Umowa o pracę</Td>
                                                        <Td>8 000 zł</Td>
                                                        <Td>TAK</Td>
                                                        <Td>6 miesięcy</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem borderTop="2px solid #1E1E1F" borderBottom="15px solid #1E1E1F">
                                    <h2>
                                        <AccordionButton p='5'>
                                            <Box flex='1' textAlign='left'>
                                                <Flex
                                                    align="center"
                                                    flexDirection="row"
                                                    justify="space-between"
                                                    mr='12'
                                                >
                                                    Katarzyna S.
                                                    <WrapItem>
                                                        <Button colorScheme='red'>Zarezerwuj rozmowę</Button>
                                                    </WrapItem>
                                                </Flex>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel  p='15' m='3' bgColor="#222324">
                                        <TableContainer>
                                            <Table variant='unstyled'>
                                                <Thead  w='100vw'>
                                                    <Tr style={{
                                                        whiteSpace: "normal",
                                                        wordWrap: "break-word",
                                                    }}>
                                                        <Th>Ocena przejścia kursu</Th>
                                                        <Th>Ocena aktywności i zaangazowania na kursie</Th>
                                                        <Th>Ocena kodu w projekcie własnym</Th>
                                                        <Th>Ocena pracy w zespole scrum</Th>
                                                        <Th>Preferowane miejsce pracy</Th>
                                                        <Th>Docelowe miasto, gdzie chce pracować kandydat</Th>
                                                        <Th>Oczekiwany typ kontraktu</Th>
                                                        <Th>Oczekiwane wynagrodzenie miesięczne netto</Th>
                                                        <Th>Zgoda na odbycie bezpłatnych prakty/stazu na początek</Th>
                                                        <Th>Komercyjne doświadczenie w programowaniu</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td>5 / 5</Td>
                                                        <Td>3 / 5</Td>
                                                        <Td>4 / 5</Td>
                                                        <Td>5 / 5</Td>
                                                        <Td>Biuro</Td>
                                                        <Td>Warszawa</Td>
                                                        <Td>Umowa o pracę</Td>
                                                        <Td>8 000 zł</Td>
                                                        <Td>TAK</Td>
                                                        <Td>6 miesięcy</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                    </Flex>
                </Center>
                <Text>Ilość studentów </Text>
                <Select
                    size="xs"
                    w="60px"
                    iconSize="15px"
                    value={useQuery("pageSize") || pageSize}
                    onChange={selectPageSizeHandler}
                    bgColor="#F7F7F7"
                    iconColor="black"
                    color="black"
                >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </Select>
                <Text> {currentPage * pageSize} z {studentsCount}</Text>
            </Box>
        </>
    );
};

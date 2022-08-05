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
    Image, Select,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import filterIcon from "../../assets/filter-icon.png";
import {useHttpClient} from "../../common/hooks/http-hook";
import {LoadingSpinner} from "../../common/components/LoadingSpinner/LoadingSpinner";
import {InfoModal} from "../../common/components/InfoModal/InfoModal";
import {ActiveStudentsResponse, StudentAvailabilityViewInterface} from "types";
import {useLocation, useNavigate} from "react-router-dom";
import "./Hr.css";
import {useQuery} from "../../common/hooks/query-params";


export const Hr = () => {
    const [isStudentPage, setIsStudentPage] = useState(true);
    const [studentList, setStudentList] = useState<StudentAvailabilityViewInterface[]>([]);
    const [studentsCount, setStudentsCount] = useState(0);
    const {sendRequest, error, clearError, isLoading} = useHttpClient();
    const [path, setPath] = useState(useLocation().search);
    const [currentPage, setCurrentPage] = useState(Number(useQuery("currentPage")) || 1);
    const [pageSize, setPageSize] = useState(Number(useQuery("search")) || 10);
    const [search, setSearch] = useState(useQuery("search") || "");
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            const data: ActiveStudentsResponse = await sendRequest(`/hr/students/available/${path}`, "GET");
            if (data.isSuccess) {
                setStudentsCount(data.studentsCount);
                setStudentList(data.students);
            }
        })();
    }, [path]);

    const selectPageSizeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setPath(`?search=${search}&currentPage=${currentPage}&pageSize=${e.target.value}`);
        nav(`/?search=${search}&currentPage=${currentPage}&pageSize=${e.target.value}`)
        setPageSize(Number(e.target.value));
    };

    function submitSearchHandler(e: KeyboardEvent<HTMLElement>) {
        if (e.key === "Enter") {
            setPath(`?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`);
            nav(`/?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`)
        }
    }

    //@TODO porpawić wyświetlanie ilość użytkowników przy selekcie...
    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {error && <InfoModal isError message={error} onClose={clearError} title={"Nieudana próba!"}/>}
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
                                           value={search}
                                           onKeyUp={submitSearchHandler}
                                           onChange={(e) => setSearch(e.target.value)}
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
                        <Box>
                            {studentList.map(student => <p key={student.studentId}>{student.firstName}</p>)}
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

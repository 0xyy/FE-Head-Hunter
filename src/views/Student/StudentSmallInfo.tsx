import React from 'react';
import { StudentAvailabilityViewInterface } from 'types';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex, Text,
    WrapItem
} from '@chakra-ui/react';
import { separateNumber } from '../../utils/separate-number';

interface Props {
    student: StudentAvailabilityViewInterface;
}

export const StudentSmallInfo = ({student}: Props) => {
    const {
        firstName,
        lastName,
        courseCompletion,
        courseEngagment,
        projectDegree,
        teamProjectDegree,
        expectedTypeWork,
        targetWorkCity,
        expectedContractType,
        expectedSalary,
        canTakeApprenticeship,
        monthsOfCommercialExp,
    } = student;

    return (
        <Accordion allowToggle>
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
                                {firstName} {lastName[0]}.
                                <WrapItem>
                                    <Button colorScheme='red'>Zarezerwuj rozmowę</Button>
                                </WrapItem>
                            </Flex>
                        </Box>
                        <AccordionIcon/>
                    </AccordionButton>
                </h2>
                <AccordionPanel bgColor="#222324" m='15'>
                    <Flex justifyContent='space-between' alignItems='flex-start' h='140px'>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Ocena przejścia kursu</Text>
                            <Text><Text as='span' fontWeight='bold'>{courseCompletion}</Text> <Text as='span' opacity='0.5'>/ 5</Text></Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Ocena aktywności i zaangażowana na kursie</Text>
                            <Text><Text as='span' fontWeight='bold'>{courseEngagment}</Text> <Text as='span' opacity='0.5'>/ 5</Text></Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Ocena kodu w projekcie własnym</Text>
                            <Text><Text as='span' fontWeight='bold'>{projectDegree}</Text> <Text as='span' opacity='0.5'>/ 5</Text></Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2'  justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Ocena pracy w zespole scrum</Text>
                            <Text><Text as='span' fontWeight='bold'>{teamProjectDegree}</Text> <Text as='span' opacity='0.5'>/ 5</Text></Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Preferowane miejsce pracy</Text>
                            <Text fontWeight='bold'>{expectedTypeWork}</Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Docelowe miasto, gdzie chce pracować kandydat</Text>
                            <Text fontWeight='bold'>{targetWorkCity ? targetWorkCity : 'Bez znaczenia'}</Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Oczekiwany typ kontraktu</Text>
                            <Text fontWeight='bold'>{expectedContractType}</Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Oczekiwane wynagrodzenie miesięczne netto</Text>
                            <Text fontWeight='bold'>{expectedSalary ? `${separateNumber(+expectedSalary)} zł` : 'Bez znaczenia'}</Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Zgoda na odbycie bezpłatnych prakty/stażu na początek</Text>
                            <Text fontWeight='bold'>{canTakeApprenticeship}</Text>
                        </Flex>
                        <Flex flexDirection='column' m='1' p='2' justifyContent='space-between' h='100%'>
                            <Text fontSize='13px' opacity='0.7' mb='7'>Komercyjne doświadczenie w programowaniu</Text>
                            <Text fontWeight='bold'>{monthsOfCommercialExp} (w miesiącach)</Text>
                        </Flex>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    HStack,
    FormControl,
    Input,
    VStack,
    Radio,
    RadioGroup,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import {useFormik} from "formik";
import {CheckboxStar} from "../../common/components/FormElements/CheckboxStar";
import {CheckboxButton} from "../../common/components/FormElements/CheckboxButton";

export function FilterStudents() {
    const [radio, setRadio] = React.useState("0");
    const isOpen = true;
    const onClose = () => {
    };

    const formik = useFormik({
        initialValues: {
            courseCompletion: [],
            courseEngagment: [],
            projectDegree: [],
            teamProjectDegree: [],
            expectedTypeWork: [],
            expectedContractType: [],
            expectedSalaryMin: "",
            expectedSalaryMax: "",
            canTakeApprenticeship: "0",
            monthsOfCommercialExp: "0",
        },
        onSubmit: async (values) => {
            console.log(formik.values);
        }
    });

    const formikChangeValue = (name: "courseCompletion" | "courseEngagment" | "projectDegree" | "teamProjectDegree" | "expectedTypeWork" | "expectedContractType", value: string) => {
        const id = formik.values[name].findIndex((v) => v === value);
        if (id === -1) {
            (formik.values[name] as string[]).push(value);
        } else {
            formik.values[name].splice(id, 1);
        }
    };

    const formikCheckValue = (name: "courseCompletion" | "courseEngagment" | "projectDegree" | "teamProjectDegree" | "expectedTypeWork" | "expectedContractType", value: string) => {
        return (formik.values[name] as string[]).includes(value);
    };
    const clearAllFormikValues = () => {
        formik.values.courseCompletion = [];
        formik.values.courseEngagment = [];
        formik.values.projectDegree = [];
        formik.values.teamProjectDegree = [];
        formik.values.expectedTypeWork = [];

    };

    const changeInputNumber = (v: string) => {
        formik.values.monthsOfCommercialExp = v;
    };

    return (
        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay/>

            <ModalContent bgColor="#0A0A0A" color="#F7F7F7">
                <form onSubmit={formik.handleSubmit}>
                    <ModalHeader>
                        <HStack justifyContent="space-between">
                            <Text fontSize="22px">Filtrowanie</Text>
                            <Button type="reset" onClick={clearAllFormikValues} fontSize="14px" bg="#172A35"
                                    _hover={{backgroundColor: "gray"}}>Wyczyść wszystko
                            </Button>
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Ocena przejścia kursu</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxStar
                                    name="courseCompletion"
                                    value="5"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseCompletion"
                                    value="4"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseCompletion"
                                    value="3"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseCompletion"
                                    value="2"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseCompletion"
                                    value="1"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Ocena aktywnośći i zaangażowania na kursie</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxStar
                                    name="courseEngagment"
                                    value="5"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseEngagment"
                                    value="4"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseEngagment"
                                    value="3"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseEngagment"
                                    value="2"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="courseEngagment"
                                    value="1"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Ocena kodu w projekcie własnym</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxStar
                                    name="projectDegree"
                                    value="5"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="projectDegree"
                                    value="4"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="projectDegree"
                                    value="3"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="projectDegree"
                                    value="2"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="projectDegree"
                                    value="1"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Ocena pracy w zespole w Scrum</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxStar
                                    name="teamProjectDegree"
                                    value="5"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="teamProjectDegree"
                                    value="4"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="teamProjectDegree"
                                    value="3"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="teamProjectDegree"
                                    value="2"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxStar
                                    name="teamProjectDegree"
                                    value="1"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Preferowane miejsce pracy</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxButton
                                    name="expectedTypeWork"
                                    value="1"
                                    text="Praca zdalna"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxButton
                                    name="expectedTypeWork"
                                    value="2"
                                    text="Praca w biurze"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxButton
                                    name="expectedTypeWork"
                                    value="3"
                                    text="Hybrydowa"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Oczekiwany typ kontraktu</Text>
                            <HStack align="center" justifyContent="flex-start">
                                <CheckboxButton
                                    name="expectedContractType"
                                    value="1"
                                    text="Umowa o prace"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxButton
                                    name="expectedContractType"
                                    value="2"
                                    text="B2B"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxButton
                                    name="expectedContractType"
                                    value="3"
                                    text="Umowa zlecenie"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                                <CheckboxButton
                                    name="expectedContractType"
                                    value="4"
                                    text="Umowa o dzieło"
                                    onChange={formikChangeValue}
                                    checked={formikCheckValue}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Oczekiwane wynagrodzenie miesięczne netto</Text>
                            <HStack>
                                <Text fontSize="14px">Od</Text>
                                <Input w="120px"
                                       id="expectedSalaryMin"
                                       name="expectedSalaryMin"
                                       type="input"
                                       variant="filled"
                                       placeholder="np. 1000zł"
                                       onChange={formik.handleChange}
                                       value={formik.values.expectedSalaryMin}
                                       bgColor="#292A2B"
                                       color="#DADADA"
                                />
                                <Text mb="5px" fontSize="14px">Do</Text>
                                <Input
                                    w="120px"
                                    id="expectedSalaryMax"
                                    name="expectedSalaryMax"
                                    type="input"
                                    variant="filled"
                                    placeholder="np. 10000zł"
                                    onChange={formik.handleChange}
                                    value={formik.values.expectedSalaryMax}
                                    bgColor="#292A2B"
                                    color="#DADADA"
                                />
                            </HStack>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</Text>
                            <RadioGroup onChange={s => setRadio(s)} value={radio}>
                                <VStack align="flex-start">
                                    <Radio colorScheme="red"
                                           borderColor="blue.300"
                                           id="canTakeApprenticeship"
                                           name="canTakeApprenticeship"
                                           type="canTakeApprenticeship"
                                           onChange={formik.handleChange}
                                           value="1">
                                        <Text fontSize="14px">Tak</Text>
                                    </Radio>
                                    <Radio colorScheme="red"
                                           borderColor="blue.300"
                                           id="canTakeApprenticeship"
                                           name="canTakeApprenticeship"
                                           type="canTakeApprenticeship"
                                           onChange={formik.handleChange}
                                           value="0">
                                        <Text fontSize="14px">Nie</Text>
                                    </Radio>
                                </VStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb="15px">
                            <Text mb="5px" fontSize="14px">Ilość miesięcy doświadczenia komercyjnego kandydata w
                                programowaniu</Text>
                            <NumberInput id="comercialExp"
                                         name="comercialExp"
                                         w="110px"
                                         color="#DADADA"
                                         bgColor="#292A2B"
                                         borderColor="blue.300"
                                         min={0}
                                         onChange={(v)=> changeInputNumber(v)}
                                         defaultValue={formik.values.monthsOfCommercialExp}
                            >
                                <NumberInputField/>
                                <NumberInputStepper borderColor="red.600">
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <HStack justifyContent="flex-end">
                            <Button colorScheme="transparent" onClick={onClose}>Anuluj</Button>
                            <Button type="submit" colorScheme="red">Pokaż wyniki</Button>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>);
}
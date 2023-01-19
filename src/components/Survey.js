import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import CustomInput from "../components/CustomInput"
import colors from "../assets/theme/colors"
import { FlatList } from "react-native-gesture-handler"
import CustomButton from "./CustomButton"
import useArticle from "../redux/hooks/useArticle"
import { strings } from "../utils/localization"
import i18n from "i18n-js"
import { Box, Flex, Stack, Text } from "native-base"

const Survey = (data) => {
    const { surveyName, surveyQuestions, colors } = data

    const { handleSubmit, control } = useForm()

    const [disabledButton, setDisabledButton] = useState(false)

    const hook = useArticle()

    const questionsList = surveyQuestions ? Object.entries(surveyQuestions) : ""

    const submit = (data) => {
        setDisabledButton(true)
        const payload = {
            survey: hook.detail.survey,
            answers: data,
        }
        hook.postSurvey(payload)
    }

    return (
        <Box mb="20px">
            <Text
                fontSize="14px"
                color={colors.dark}
                letterSpacing={0.5}
                my={1.5}
                textAlign="center"
            >
                {i18n.t("survey")}
            </Text>
            <Text fontSize="14px" color={colors.dark} letterSpacing="1px" my="8px">
                {surveyName}
            </Text>
            <Stack bg={colors.dark} borderRadius="19px" py="10px" space={2}>
                {questionsList.map((item, index) => {
                    return (
                        <Box mx="6px" key={index}>
                            <Controller
                                control={control}
                                render={({ onChange, value }) => (
                                    <CustomInput
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        placeholder={i18n.t("answerPlaceholder")}
                                        label={`${index + 1}. ${item[1]}`}
                                        labelColor={colors.bg}
                                        backgroundColor={colors.bg}
                                        color={colors.dark}
                                    />
                                )}
                                name={`${index + 1}`}
                                rules={{ required: true }}
                                defaultValue={null}
                            />
                        </Box>
                    )
                })}
                <Flex alignItems="flex-end">
                    <CustomButton
                        text={i18n.t("confirm")}
                        icon={"arrow"}
                        onPress={handleSubmit(submit)}
                        disabled={disabledButton}
                        bg={colors.medium}
                        mt="10px"
                        mr="10px"
                    />
                </Flex>
            </Stack>
        </Box>
    )
}

export default Survey

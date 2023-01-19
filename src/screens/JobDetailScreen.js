import { format } from "date-fns"
import I18n from "i18n-js"
import mime from "mime"
import {
	Button,
	Flex,
	Heading,
	HStack,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	VStack
} from "native-base"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BackHandler, Dimensions, StyleSheet } from "react-native"
import AutoHeightWebView from "react-native-autoheight-webview"
import CustomInput from "../components/CustomInput"
import FilePicker from "../components/FilePicker"
import Clock from "../icons/Clock"
import Location from "../icons/Location"
import useJob from "../redux/hooks/useJob"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"

const { width, height } = Dimensions.get("window")

export default function JobDetailScreen({ route, navigation }) {
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const { handleSubmit, control } = useForm()

    const hook = useJob()
    const hookUser = useUser()
    const colors = useConfig().colors

    useEffect(() => {
        hook.cleanDetail()
        hook.fetchOne(route.params.id)
    }, [])

    function handleBackButtonClick() {
        navigation.goBack()
        return true
    }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener("hardwWareBackPress", handleBackButtonClick)
        }
    }, [])

    const handleHTML = (html) =>
        `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=${
            width - 16
        }, user-scalable=no" initial-scale=1", ></head><body>${html}</body></html>`

    const job = hook.detail

    const submit = (data) => {
        setError(null)
        if (!data.first_name || !data.last_name || !data.phone_number || !data.email || !file) {
            setError(I18n.t("allFieldsRequired"))
        } else {
            setDisabled(true)
            let formData = new FormData()

            formData.append("file", {
                name: file.name,
                type: mime.getType(file.uri),
                uri: file.uri,
            })

            formData.append("first_name", data.first_name)
            formData.append("last_name ", data.last_name)
            formData.append("phone_number", data.phone_number)
            formData.append("email", data.email)
            formData.append("note", data.note)
            formData.append("job_listing", route.params.id)

            hook.sendJobApplication(formData).then((res) => {
                if (res !== undefined && res.status === 200) {
                    navigation.navigate(`${I18n.t("jobListings")}`)
                    setDisabled(false)
                } else {
                    setError(I18n.t("serverErrorMessage"))
                    setDisabled(false)
                }
            })
        }
    }

    const handleFileSelect = (chosenFile) => {
        setFile(chosenFile)
    }

    if (job) {
        return (
            <ScrollView flex={1} bg={colors.bg} p={2}>
                <VStack space={5}>
                    <Heading color={colors.dark} textTransform="uppercase" pr={2}>
                        {job.title}
                    </Heading>
                    <VStack space={1}>
                        <HStack space={2} alignItems="center">
                            <Location width={20} height={20} fill={colors.black} />
                            <Text textTransform="uppercase">{`${job.company_name}, ${job.city_name}`}</Text>
                        </HStack>
                        <HStack space={2} alignItems="center">
                            <Clock width={20} height={20} fill={colors.black} />
                            <Text textTransform="uppercase">{I18n.t("applicationDeadline")}:</Text>
                            <Text color={colors.red} bold>
                                {format(new Date(job.application_deadline), "dd-MM-yyyy hh:SS")}
                            </Text>
                        </HStack>
                        <HStack
                            flexWrap="wrap"
                            space={{
                                base: 1,
                                md: 4,
                            }}
                        >
                            {job.tags.map((tag, i) => {
                                return (
                                    <Flex
                                        rounded="md"
                                        key={i}
                                        bg={colors.medium}
                                        py={1}
                                        px={2}
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Text
                                            textTransform="uppercase"
                                            fontSize={12}
                                            bg="transparent"
                                            color={colors.bg}
                                        >
                                            {tag.value_field}
                                        </Text>
                                    </Flex>
                                )
                            })}
                        </HStack>
                    </VStack>

                    <AutoHeightWebView
                        style={{
                            width: "100%",
                            // backgroundColor: colors.bg,
                        }}
                        customStyle={`
                            body{
                                font-family: sans-serif, Arial, tohoma, "Courier New,Courier";
                            }
                                img {
                                    max-width: "100%;
                                    object-fit:contain;
                                }
                                table, td, th {
                                    border: 1px solid black;
                                }
                                table{
                                    border-collapse: collapse;
                                    min-width:100%;
                                    overflow-x: scroll;
                                }
                            `}
                        files={[
                            {
                                href: "cssfileaddress",
                                type: "text/css",
                                rel: "stylesheet",
                            },
                        ]}
                        source={{ html: handleHTML(job.description) }}
                        scalesPageToFit={true}
                        viewportContent={"width=device-width, user-scalable=no"}
                        scrollEnabledWithZoomedin={true}
                        allowsFullscreenVideo={true}
                        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
                    (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                    />

                    <KeyboardAvoidingView
                        // h={{
                        //     base: "900",
                        //     lg: "auto",
                        // }}
                        // behavior={Platform.OS === "ios" ? "padding" : "height"}
                        paddingBottom={10}
                    >
                        {!job.is_registered && (
                            <VStack space={3} mb={4}>
                                <Controller
                                    control={control}
                                    render={({ onChange, onBlur, value }) => (
                                        <CustomInput
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            label={I18n.t("firstName")}
                                            labelColor={colors.medium}
                                        />
                                    )}
                                    name="first_name"
                                    defaultValue={hookUser.firstName}
                                />
                                <Controller
                                    control={control}
                                    render={({ onChange, onBlur, value }) => (
                                        <CustomInput
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            label={I18n.t("lastName")}
                                            labelColor={colors.medium}
                                        />
                                    )}
                                    name="last_name"
                                    defaultValue={hookUser.lastName}
                                />
                                <Controller
                                    control={control}
                                    render={({ onChange, onBlur, value }) => (
                                        <CustomInput
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            label={I18n.t("phoneNumber")}
                                            labelColor={colors.medium}
                                            keyboardType="numeric"
                                        />
                                    )}
                                    name="phone_number"
                                    defaultValue={hookUser.phoneNumber}
                                />
                                <Controller
                                    control={control}
                                    render={({ onChange, onBlur, value }) => (
                                        <CustomInput
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            type="email"
                                            label={I18n.t("email")}
                                            labelColor={colors.medium}
                                        />
                                    )}
                                    name="email"
                                    defaultValue={hookUser.email}
                                />
                                <Controller
                                    control={control}
                                    render={({ onChange, onBlur, value }) => (
                                        <CustomInput
                                            style={styles.input}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                            label={I18n.t("note")}
                                            labelColor={colors.medium}
                                            multiline={true}
                                            textArea
                                        />
                                    )}
                                    name="note"
                                    defaultValue=""
                                />
                                <FilePicker
                                    cv={true}
                                    handleFileSelect={handleFileSelect}
                                    fileSelected={file}
                                />
                                {error && <Text color={colors.red}>{error}</Text>}
                            </VStack>
                        )}
                        {job.is_registered ? (
                            <Flex alignItems="flex-end">
                                <Button
                                    bg={colors.red}
                                    mt={20}
                                    textAlign="right"
                                    // w={220}
                                    color={"#FF0000"}
                                    size="lg"
                                    py="4"
                                    px="8"
                                    rounded="xl"
                                >
                                    <Text textTransform="uppercase" color={colors.bg}>
                                        {I18n.t("applied")}
                                    </Text>
                                </Button>
                            </Flex>
                        ) : (
                            <Flex alignItems="flex-end">
                                <Button
                                    bg={colors.medium}
                                    mt={20}
                                    textAlign="right"
                                    // w={220}
                                    color={"amber.600"}
                                    size="lg"
                                    py="4"
                                    px="8"
                                    rounded="xl"
                                    onPress={handleSubmit(submit)}
                                    disabled={disabled}
                                >
                                    <Text textTransform="uppercase" color={colors.bg}>
                                        {I18n.t("apply")}
                                    </Text>
                                </Button>
                            </Flex>
                        )}
                    </KeyboardAvoidingView>
                </VStack>
            </ScrollView>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        textAlignVertical: "top",
        justifyContent: "flex-start",
    },
})

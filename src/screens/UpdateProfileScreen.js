import { MaterialIcons } from "@expo/vector-icons"
import { default as i18n } from "i18n-js"
import { Box, Button, Flex, FormControl, Icon, Input, Modal, Stack } from "native-base"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import NewSelect from "../components/NewSelect"
import Select from "../components/Select"
import useDropdownData from "../redux/hooks/useDropdownData"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { city, country, position, title } from "../utils/constants"
import { loadingIndicator, makeDropdownOptions, makeDropdownOptionsSearch } from "../utils/functions"
var { width, height } = Dimensions.get("window")

const UpdateProfileScreen = ({ navigation, route }) => {
	const { data } = route.params

	const { handleSubmit, control } = useForm()

	const hookDd = useDropdownData()
	const hookUser = useUser()
	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])
	const [titles, setTitles] = useState([])
	const [languages, setLanguages] = useState([])
	const [positions, setPositions] = useState([])
	const [selectedLanguage, setSelectedLanguage] = useState(null)

	const [showNew, setShowNew] = useState(false)
	const [showRepeatNew, setShowRepeatNew] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const handleClickOnNew = () => setShowNew(!showNew)
	const handleClickOnRepeatNew = () => setShowRepeatNew(!showRepeatNew)

	useEffect(() => {
		hookDd.fetchMd(country)
		if (config.appId !== 2) {
			hookDd.fetchMd(title)
		}
		hookDd.fetchMd(position)
		hookDd.fetchG(city)
	}, [])

	useEffect(() => {
		if (data) setSelectedLanguage(languages.find((ele) => ele.value === data.defaultLanguage))
	}, [data])

	useEffect(() => {
		makeDropdownOptions(hookDd.cities, setCities)
		makeDropdownOptions(hookDd.countries, setCountries)
		if (config.appId !== 2) {
			makeDropdownOptions(hookDd.titles, setTitles)
		}
		makeDropdownOptionsSearch(hookDd.languages, setLanguages, "name", "id")
		makeDropdownOptions(hookDd.positions, setPositions)
	}, [hookDd.cities, hookDd.countries, hookDd.titles, hookDd.languages, hookDd.positions])

	const submit = (submitData) => {
		console.log(submitData.language)
		let country = ""
		if (submitData.country) {
			country = hookDd.countries.find((element) => element.name === submitData.country).id
		}

		let city = ""
		if (submitData.city) {
			city = hookDd.cities.find((element) => element.name === submitData.city).id
		}

		let language = ""
		if (selectedLanguage) {
			language = selectedLanguage
		}

		let title = ""

		if (submitData.title && config.appId !== 2) {
			title = hookDd.titles.find((element) => element.name === submitData.title).id
		}

		let position = ""
		if (submitData.position) {
			position = hookDd.positions.find((element) => element.name === submitData.position).id
		}

		const payload = {
			username: hookUser.username,
			first_name: submitData.first_name,
			last_name: submitData.last_name,
			phone_number: submitData.phone_number,
			bio: submitData.bio,
			country: country,
			city: city,
			language: language,
			position: position,
		}

		if (submitData.new_password && submitData.repeated_password) {
			payload["new_password"] = submitData.new_password
			payload["repeated_password"] = submitData.repeated_password
		}

		if (config.appId !== 2) {
			payload["title"] = title
			payload["licence_number"] = submitData.licence_number
		}

		hookUser.update(payload).then((res1) => {
			if (res1 !== undefined && res1.status === 200) {
				hookUser.refreshAccess().then((res2) => {
					if (res2 !== undefined && res2.status === 200) {
						navigation.navigate("Profile")
					}
				})
			}
		})
	}

	const styles = StyleSheet.create({
		form: {
			alignSelf: "center",
			width: width > 600 ? "80%" : "100%",
			paddingHorizontal: 8,
			marginBottom: 20,
			paddingVertical: 4,
		},
		select: {
			paddingLeft: 10,
			paddingTop: 6,
			// marginVertical: 10,
			// justifyContent: "center",
			// height: 40,
			// borderWidth: 1,
			// borderColor: colors.medium,
			// shadowOffset: {
			//     width: 1,
			//     height: 1,
			// },
			// shadowOpacity: 0.12,
			// shadowRadius: 2,
			// elevation: 2,
			// borderRadius: 10,
			// backgroundColor: colors.bg,
			// marginTop: 10,
			// justifyContent: "center",
			// fontSize: 16,
		},
		title: {
			fontSize: 14,
			fontFamily: `${companyFontName}-Regular`,
			color: colors.dark,
			textTransform: "uppercase",
			marginVertical: 20,
			textAlign: "center",
		},
		textareaInput: {
			// flex: 1,
			textAlignVertical: "top",
			justifyContent: "flex-start",
		},
		btnsWrapper: {
			alignItems: "center",
			marginTop: 20,
			marginBottom: 40,
		},
		btn: {
			backgroundColor: colors.medium,
			width: 190,
			height: 38,
			borderRadius: 12,
			marginVertical: 8,
		},
	})

	const handleDelete = () => {
		setShowDeleteModal(false)
		navigation.navigate("Login", { screen: "Login", params: { deleteAccount: true } })
	}

	const defaultLanguage = languages.find((ele) => ele.value === data.defaultLanguage)

	// console.log(data, "Data")
	// console.log(selectedLanguage, "sel")
	// console.log(defaultLanguage, "def")

	if (hookUser.loading) return loadingIndicator(colors)

	// if (hookUser.loading) {
	// 	return loadingIndicator(colors)
	// } else {
	return (
		<ScrollView backgroundColor={colors.bg}>
			<View style={styles.form}>
				<KeyboardAwareScrollView>
					<Text style={styles.title}>{i18n.t("updateData")}</Text>
					<Stack space={4} maxW="400px">
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									label={i18n.t("firstName")}
									labelColor={colors.medium}
									shadow={1}

									// shadowOpacity={0.4}
								/>
							)}
							name="first_name"
							defaultValue={data.firstName}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									label={i18n.t("lastName")}
									labelColor={colors.medium}
									shadow={1}

									// shadowOpacity={0.4}
								/>
							)}
							name="last_name"
							defaultValue={data.lastName}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormControl w="100%" maxW="400px">
									<FormControl.Label mb="0.5" _text={{ color: colors.medium, fontSize: 12 }}>
										{i18n.t("newPassword")}
									</FormControl.Label>
									<Box
										shadow={2}
										bg={colors.bg}
										borderRadius="lg"
										mx="1px"
										// shadowOpacity="0.18"
									>
										<Input
											borderRadius="lg"
											h="40px"
											pl={2.5}
											fontSize={14}
											borderColor={"gray.100"}
											_focus={{ borderColor: colors.dark }}
											type={showNew ? "text" : "password"}
											InputRightElement={
												<Icon
													as={<MaterialIcons name={showNew ? "visibility" : "visibility-off"} />}
													size={5}
													mr="2px"
													color="muted.400"
													onPress={() => handleClickOnNew()}
												/>
											}
										/>
									</Box>
								</FormControl>
							)}
							name="new_password"
							defaultValue={""}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<FormControl w="100%" maxW="400px">
									<FormControl.Label mb="0.5" _text={{ color: colors.medium, fontSize: 12 }}>
										{i18n.t("repeatPassword")}
									</FormControl.Label>
									<Box shadow={2} bg={colors.bg} borderRadius="lg" mx="1px">
										<Input
											borderRadius="lg"
											h="40px"
											pl={2.5}
											fontSize={14}
											borderColor={"gray.100"}
											_focus={{ borderColor: colors.dark }}
											type={showRepeatNew ? "text" : "password"}
											InputRightElement={
												<Icon
													as={<MaterialIcons name={showRepeatNew ? "visibility" : "visibility-off"} />}
													size={5}
													mr="2px"
													color="muted.400"
													onPress={() => handleClickOnRepeatNew()}
												/>
											}
										/>
									</Box>
								</FormControl>
							)}
							name="repeated_password"
							defaultValue={""}
						/>
						<Controller
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									labelColor={colors.medium}
									label={i18n.t("country")}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
									editable={false}
								/>
							)}
							control={control}
							name="country"
							defaultValue={data.defaultCountry}
						/>

						<Controller
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									labelColor={colors.medium}
									label={i18n.t("city")}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
									editable={false}
								/>
							)}
							control={control}
							name="city"
							defaultValue={data.defaultCity}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									label={i18n.t("phoneNumber")}
									labelColor={colors.medium}
									shadow={1}

									// shadowOpacity={0.4}
								/>
							)}
							name="phone_number"
							defaultValue={data.phoneNumber}
						/>
						{config.appId !== 2 && (
							<>
								<Controller
									control={control}
									render={({ onChange, value }) => (
										<CustomInput
											onChangeText={(value) => onChange(value)}
											value={value}
											label={i18n.t("licenceNumber")}
											labelColor={colors.medium}
										/>
									)}
									name="licence_number"
									defaultValue={data.licence}
								/>
								<Controller
									control={control}
									render={({ onChange }) => (
										<Select
											labelColor={colors.medium}
											label={i18n.t("jobTitle")}
											options={titles}
											defaultValue={data.defaultTitle}
											onSelect={(index) => onChange(titles[index])}
										/>
									)}
									name="title"
									defaultValue={data.defaultTitle}
								/>
							</>
						)}

						{config.appId === 2 ? (
							<Controller
								render={({ onChange, onBlur, value }) => (
									<CustomInput
										labelColor={colors.medium}
										label={"MPO/ORJ"}
										onBlur={onBlur}
										onChangeText={(value) => onChange(value)}
										value={value}
										editable={false}
									/>
								)}
								control={control}
								name="mpo"
								defaultValue={data.defaultSector}
							/>
						) : (
							<Controller
								control={control}
								render={({ onChange }) => (
									<Select
										style={styles.select}
										labelColor={colors.medium}
										label={i18n.t("position")}
										options={positions}
										defaultValue={data.defaultPosition}
										onSelect={(index) => onChange(positions[index])}
									/>
								)}
								name="position"
								defaultValue={data.defaultPosition}
							/>
						)}

						{/* <Controller
							control={control}
							render={({ onChange }) => (
								<Select
									style={styles.select}
									labelColor={colors.medium}
									label={i18n.t("language")}
									options={languages}
									defaultValue={data.defaultLanguage}
									onSelect={(index) => onChange(languages[index])}
								/>
							)}
							name="language"
							defaultValue={data.defaultLanguage}
						/> */}

						{/* <NewSelect
							colors={colors}
							options={documents}
							placeholder={i18n.t("chooseFile")}
							selectedItem={selectedDoc}
							setSelectedItem={setSelectedDoc}
						/> */}

						<FormControl w="100%" maxW="400px">
							<FormControl.Label mb="0.5" _text={{ color: colors.medium, fontSize: 12 }}>
								{i18n.t("language")}
							</FormControl.Label>
							{/* {selectedLanguage && ( */}

							<NewSelect
								colors={colors}
								options={languages}
								placeholder={defaultLanguage ? defaultLanguage.label : i18n.t("choose")}
								selectedItem={selectedLanguage}
								setSelectedItem={setSelectedLanguage}
								defaultValue={selectedLanguage}
							/>
							{/* )} */}
						</FormControl>

						<Controller
							control={control}
							render={({ onChange, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									style={styles.textareaInput}
									value={value}
									textArea
									label={i18n.t("biography")}
									labelColor={colors.medium}
									multiline={true}
								/>
							)}
							name="bio"
							defaultValue={data.bio}
						/>

						<Modal
							size={"lg"}
							isOpen={showDeleteModal}
							onClose={() => setShowDeleteModal(false)}
							_backdrop={{
								bg: "_black",
								opacity: 0.7,
							}}
							key={"test16"}
						>
							<Modal.Content maxWidth="400px" bg="_bg">
								<Modal.CloseButton />
								<Modal.Header bg="_bg">{"DELETE ACCOUNT"}</Modal.Header>
								<Modal.Body py={8}>{i18n.t("areYouSureExitMessage")}</Modal.Body>
								<Modal.Footer w="100%" justifyContent={"flex-start"} bg="_bg">
									<Flex flexDirection="row" w="100%" justifyContent="space-between">
										<Button
											variant="red"
											bg="_red"
											_text={{
												color: "_bg",
												fontSize: "11px",
												textTransform: "uppercase",
											}}
											// colorScheme="blueGray"
											onPress={() => {
												setShowDeleteModal(false)
											}}
										>
											{i18n.t("no")}
										</Button>
										<Button
											bg="_dark"
											_text={{
												color: "_bg",
												fontSize: "11px",
												textTransform: "uppercase",
											}}
											onPress={() => {
												handleDelete()
											}}
										>
											{i18n.t("yes")}
										</Button>
									</Flex>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
						<View style={styles.btnsWrapper}>
							<CustomButton
								bg={colors.medium}
								onPress={handleSubmit(submit)}
								style={[styles.btn, styles.modalBtns, { width: 115 }]}
								text={i18n.t("confirm")}
							/>
						</View>
						{config.appId !== 2 && (
							<Button
								bg={colors.bg}
								p={0}
								variant="ghost"
								_text={{
									color: "_red",
									fontWeight: "bold",
								}}
								onPress={() => setShowDeleteModal(true)}
							>
								{"DELETE ACCOUNT"}
							</Button>
						)}
					</Stack>
				</KeyboardAwareScrollView>
			</View>
		</ScrollView>
	)
	// }
}

export default UpdateProfileScreen

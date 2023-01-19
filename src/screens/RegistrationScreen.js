import { MaterialIcons } from "@expo/vector-icons"
import i18n from "i18n-js"
import { Box, Checkbox, FormControl, Icon, Input, Stack } from "native-base"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BackHandler, ImageBackground, Platform, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import * as yup from "yup"
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import CustomLabel from "../components/CustomLabel"
import DropdownSearch from "../components/DropdownSearch"
import PrivacyPolicy from "../components/PrivacyPolicy"
import Logo from "../icons/Logo"
import useDropdownData from "../redux/hooks/useDropdownData"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { makeDropdownOptionsSearch, useYupValidationResolver } from "../utils/functions"

const RegistrationScreen = ({ navigation }) => {
	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

	const windowWidth = useWindowDimensions().width
	const windowHeight = useWindowDimensions().height
	useWindowDimensions().height - (Platform.OS === "android" ? StatusBar.currentHeight : 0)

	const hookUser = useUser()
	const hook = useDropdownData()

	const [showNew, setShowNew] = useState(false)
	const [showRepeatNew, setShowRepeatNew] = useState(false)
	const handleClickOnNew = () => setShowNew(!showNew)
	const handleClickOnRepeatNew = () => setShowRepeatNew(!showRepeatNew)

	const [countries, setCountries] = useState([])
	const [companies, setCompanies] = useState([])
	const [cities, setCities] = useState([])
	const [positions, setPositions] = useState([])
	const [titles, setTitles] = useState([])
	const [message, setMessage] = useState(null)
	const [accepted, setAccepted] = useState(false)

	const [selectedCity, setSelectedCity] = useState(null)
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [selectedCompany, setSelectedCompany] = useState(null)
	const [selectedPosition, setSelectedPosition] = useState(null)
	const [selectedTitle, setSelectedTitle] = useState(null)

	const [cityError, setCityError] = useState(null)
	const [countryError, setCountryError] = useState(null)
	const [companyError, setCompanyError] = useState(null)
	const [positionError, setPositionError] = useState(null)
	const [titleError, setTitleError] = useState(null)
	const [bottomError, setBottomError] = useState(null)

	const validationSchema = yup.object().shape({
		first_name: yup.string().required("First name is required!").min(3, "Minimum 3 letters.").max(21, "Maximum 21 letters.").nullable(),
		last_name: yup.string().required("Last name is required!").min(3, "Minimum 3 letters.").max(21, "Maximum 21 letters.").nullable(),
		username: yup.string().required("Username is required!").max(21, "Maximum 21 letters.").nullable(),
		email: yup.string().required("E-mail is required!").email("E-mail is not valid").nullable(),
		password: yup.string().required("Password is required!").min(3, "Minimum 3 letters.").max(21, "Maximum 21 letters.").nullable(),
		repeated_password: yup
			.string()
			.required("Repeated password is required!")
			.min(3, "Minimum 3 letters.")
			.max(21, "Maximum 21 letters.")
			.nullable(),
		// country: yup.string()
		// 	.required('Country is required!'),
		// city: yup.string()
		// 	.required('City is required!'),
		// title: yup.string()
		// 	.required('Title is required!'),
		// company: yup.string()
		// 	.required('Company is required!'),
		// position: yup.string()
		// 	.required('Position is required!')
	})

	const resolver = useYupValidationResolver(validationSchema)

	const { handleSubmit, control, errors } = useForm({
		resolver: resolver,
		mode: "onSubmit",
		reValidateMode: "onChange",
		defaultValues: {},
		criteriaMode: "firstError",
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const handleCheckBox = () => {
		setBottomError(false)
		setAccepted(!accepted)
	}

	useEffect(() => {
		hook.fetchPublic()
		BackHandler.addEventListener("hardwareBackPress", () => true)
		return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
	}, [])

	useEffect(() => {
		if (hookUser.message && hookUser.message.type === "success") {
			setTimeout(() => {
				navigation.navigate("Success")
			}, 5)
		}
	}, [hookUser.message])

	useEffect(() => {
		makeDropdownOptionsSearch(hook.countries, setCountries)
		makeDropdownOptionsSearch(hook.titles, setTitles)
		makeDropdownOptionsSearch(hook.positions, setPositions)
		makeDropdownOptionsSearch(hook.cities, setCities)
		makeDropdownOptionsSearch(hook.companies, setCompanies)
	}, [hook.countries, hook.titles, hook.positions, hook.cities, hook.companies])

	const submit = (data) => {
		if (!accepted) {
			setBottomError("Privacy policy is required!")
			// scrollOnTop()
		} else if (data.password !== data.repeated_password) {
			setBottomError("Passwords do not match!")
			// scrollOnTop()
		} else if (!selectedCountry || !selectedCity || !selectedTitle || !selectedCompany || !selectedPosition) {
			if (!selectedCountry) {
				setCountryError("Country is required!")
			}
			if (!selectedCity) {
				setCityError("City is required!")
			}
			if (!selectedTitle) {
				setTitleError("Title is required!")
			}
			if (!selectedCompany) {
				setCompanyError("Company is required!")
			}
			if (!selectedPosition) {
				setPositionError("Position is required!")
			}
		} else {
			setMessage(null)
			setCountryError(null)
			setCityError(null)
			setTitleError(null)
			setCompanyError(null)
			setPositionError(null)

			// const country = hook.countries.find((element) => element.name === data.country).id
			// const city = hook.cities.find((element) => element.name === data.city).id
			// const title = hook.titles.find((element) => element.name === data.title).id
			// const position = hook.positions.find((element) => element.name === data.position).id
			// const company = hook.companies.find((element) => element.name === data.company).id

			const payload = {
				first_name: data.first_name,
				last_name: data.last_name,
				username: data.username,
				email: data.email,
				password: data.password,
				repeated_password: data.repeated_password,
				phone_number: data.phone_number,
				licence_number: data.licence_number,
				country: selectedCountry.id,
				city: selectedCity.id,
				title: selectedTitle.id,
				position: selectedPosition.id,
				company: selectedCompany.id,
			}

			// console.log(payload)

			hookUser.register(payload).then((res) => {
				if ((res !== undefined) & (res.status === 200)) {
					navigation.navigate("Success")
				}
			})
		}
	}

	const styles = StyleSheet.create({
		container: {
			// marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		},
		image: {
			// width: windowWidth,
			// height: windowHeight,
			resizeMode: "cover",
			justifyContent: "center",
		},

		logoWrapper: {
			marginTop: 20,
			alignItems: "center",
		},
		title: {
			fontSize: 20,
			letterSpacing: 7,
			paddingVertical: 20,
			color: colors.dark,
			fontFamily: `${companyFontName}-Regular`,
			textAlign: "center",
		},
		formWrapper: {
			width: 300,
			paddingBottom: 20,
			marginBottom: 20,
		},
		dropdownInput: {
			backgroundColor: colors.bg,
			zIndex: 10,
		},
		select: {
			// marginVertical: 10,
			justifyContent: "center",
			height: 47,
			// borderWidth: 1,
			// borderColor: colors.medium,
			shadowOffset: {
				width: 1,
				height: 1,
			},
			shadowOpacity: 0.12,
			shadowRadius: 2,
			elevation: 2,
			borderRadius: 10,
			backgroundColor: colors.bg,
			// marginTop: 10,
			justifyContent: "center",
			paddingLeft: 10,
			fontSize: 16,
		},
		btnsWrapper: {
			alignItems: "center",
			marginBottom: 40,
		},
		btn: {
			backgroundColor: colors.medium,
			width: 115,
			height: 38,
			borderRadius: 12,
			marginVertical: 8,
		},
		error: {
			color: colors.red,
			paddingTop: 4,
			fontSize: 12,
			fontFamily: `${companyFontName}-Regular`,
		},
		checkboxTextStyle: {
			color: colors.medium,
		},
	})

	// if (hookUser.loading) {
	//     return loadingIndicator()
	// } else {
	return (
		<KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="always">
			<ImageBackground
				source={config.background}
				style={{
					width: windowWidth,
					// height: windowHeight,
					// width: "100%",
					height: "100%",
					resizeMode: "cover",
					alignItems: "center",
				}}
			>
				{/* <KeyboardAwareScrollView> */}
				{/* <ScrollView style={{ width: windowWidth }}> */}
				{/* <View style={{ alignItems: "center" }}> */}
				<View style={styles.logoWrapper}>
					<Logo width={100} height={100} style={{ marginTop: 20, alignItems: "center" }} />
				</View>

				<Text style={styles.title}>{i18n.t("registration")}</Text>
				<View style={styles.formWrapper}>
					{message && <CustomLabel text={message.text} type={message.type} />}

					<Stack space={4} mb={4}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("firstName")}
									error={errors.first_name}
								/>
							)}
							style={styles.inputWrapper}
							name="first_name"
							rules={{ required: true }}
							defaultValue={null}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("lastName")}
									error={errors.last_name}
								/>
							)}
							name="last_name"
							rules={{ required: true }}
							defaultValue={null}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("username")}
									error={errors.username}
								/>
							)}
							name="username"
							rules={{ required: true }}
							defaultValue={null}
						/>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("email")}
									error={errors.email}
								/>
							)}
							name="email"
							rules={{ required: true }}
							defaultValue={null}
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
											onChangeText={(value) => onChange(value)}
											value={value}
											borderRadius="lg"
											h="40px"
											pl={2.5}
											fontSize={14}
											borderColor={"gray.100"}
											_focus={{ borderColor: colors.dark }}
											type={showNew ? "text" : "password"}
											error={errors.password}
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
							name="password"
							rules={{ required: true }}
							defaultValue={null}
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
							rules={{ required: true }}
							defaultValue={null}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("phoneNumber")}
								/>
							)}
							name="phone_number"
							defaultValue={null}
						/>

						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<CustomInput
									onChangeText={(value) => onChange(value)}
									value={value}
									labelColor={colors.medium}
									label={i18n.t("licenceNumber")}
								/>
							)}
							name="licence_number"
							defaultValue={null}
						/>

						<DropdownSearch
							labelColor={colors.medium}
							label={i18n.t("country")}
							options={countries}
							selectedItems={selectedCountry}
							setSelectedItems={setSelectedCountry}
							error={countryError}
							setError={setCountryError}
						/>

						<DropdownSearch
							labelColor={colors.medium}
							label={i18n.t("city")}
							options={cities}
							selectedItems={selectedCity}
							setSelectedItems={setSelectedCity}
							error={cityError}
							setError={setCityError}
						/>

						<DropdownSearch
							labelColor={colors.medium}
							label={i18n.t("jobTitle")}
							options={titles}
							selectedItems={selectedTitle}
							setSelectedItems={setSelectedTitle}
							error={titleError}
							setError={setTitleError}
						/>

						<DropdownSearch
							labelColor={colors.medium}
							label={i18n.t("company")}
							options={companies}
							selectedItems={selectedCompany}
							setSelectedItems={setSelectedCompany}
							error={companyError}
							setError={setCompanyError}
						/>

						<DropdownSearch
							labelColor={colors.medium}
							label={i18n.t("position")}
							options={positions}
							selectedItems={selectedPosition}
							setSelectedItems={setSelectedPosition}
							error={positionError}
							setError={setPositionError}
						/>
					</Stack>
					<PrivacyPolicy link={true} />

					<Checkbox value={accepted} onChange={handleCheckBox} _text={{ fontSize: "14", color: colors.medium }}>
						I agree to privacy policy
					</Checkbox>
				</View>
				{bottomError && <Text style={styles.error}>{bottomError}</Text>}
				<View style={styles.btnsWrapper}>
					<CustomButton onPress={handleSubmit(submit)} bg={colors.medium} style={styles.btn} text={i18n.t("confirm")} />
				</View>

				{/* </View>
                        </ScrollView>
                    </KeyboardAwareScrollView> */}
			</ImageBackground>
		</KeyboardAwareScrollView>
	)
	// }
}

export default RegistrationScreen

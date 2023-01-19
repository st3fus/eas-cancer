import { Box, Input } from "native-base"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CustomButton from "../components/CustomButton"
import CustomLabel from "../components/CustomLabel"
import Logo from "../icons/Logo"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { loadingIndicator } from "../utils/functions"

const ForgotPasswordScreen = ({ navigation }) => {
	const { handleSubmit, control } = useForm()

	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [success, setSuccess] = useState(false)
	const [message, setMessage] = useState(null)

	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName
	// useEffect(() => {
	// 	if(success) {
	// 		navigation.navigate("Success")
	// 		console.log(success, "effect")
	// 	}
	// }, [success])

	const hook = useUser()

	useEffect(() => {
		if (hook.message) {
			setMessage(hook.message)
		}
	}, [hook.message])

	const submit = (data) => {
		setButtonDisabled(true)
		hook.resetPassword({ email: data.email }).then((res) => {
			if (res !== undefined && res.status === 200) {
				setSuccess(true)
			} else {
				setButtonDisabled(false)
			}
		})
	}

	const handleRegisterRedirection = () => {
		setMessage(null)
		hook.cleanToast()
		navigation.navigate("Registration")
	}

	const handleLoginRedirection = () => {
		setMessage(null)
		hook.cleanToast()
		navigation.navigate("Login")
	}

	const styles = StyleSheet.create({
		image: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
			justifyContent: "center",
		},
		wrapper: { padding: 20, alignItems: "center" },
		passWrapper: {
			flexDirection: "row",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.medium,
			borderRadius: 10,
			width: "100%",
		},
		passInputWrapper: {
			paddingHorizontal: 10,
			width: "100%",
			marginRight: 130,
		},
		submitBtn: {
			height: 47,
			width: 60,
			borderRadius: 5,
			backgroundColor: colors.medium,
			alignItems: "center",
			justifyContent: "center",
			marginLeft: "auto",
		},
		passInput: {
			flex: 1,
			fontFamily: `${companyFontName}-Regular`,
		},
		title: {
			textTransform: "uppercase",
			fontSize: 20,
			letterSpacing: 7,
			paddingVertical: 20,
			color: colors.dark,
			fontFamily: `${companyFontName}-Regular`,
			textAlign: "center",
		},
		TextLineWrapper: {
			marginTop: 12,
			marginBottom: 6,
			flexDirection: "row",
		},
		firstPartText: {
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
		},
		linkedText: {
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
			textDecorationLine: "underline",
		},
	})

	if (hook.loading) {
		return loadingIndicator(colors)
	} else {
		return (
			<SafeAreaView>
				<ImageBackground source={config.background} style={styles.image}>
					<KeyboardAwareScrollView>
						<View style={styles.wrapper}>
							<Logo width={100} height={100} />
							<Text style={styles.title}>reset password</Text>
							{message && <CustomLabel text={message.text} type={message.type} />}
							<Box w="100%" shadow={2} bg={colors.bg} borderRadius="lg" p={0}>
								<Controller
									control={control}
									render={({ onChange, onBlur, value }) => (
										<Input
											onChangeText={(value) => onChange(value)}
											value={value}
											placeholder="E-MAIL ADDRESS"
											bg={colors.bg}
											h="45px"
											borderColor={"gray.100"}
											borderRadius="lg"
											_focus={{ borderColor: colors.dark }}
											fontSize={14}
											// style={styles.passInput}
											InputRightElement={
												<CustomButton
													icon="arrow"
													h="full"
													w="80px"
													bg={colors.medium}
													borderRadius="lg"
													onPress={handleSubmit(submit)}
													disabled={buttonDisabled}
												/>
											}
										/>
									)}
									name="email"
									rules={{ required: true }}
									defaultValue={null}
								/>
							</Box>
							<View style={styles.TextLineWrapper}>
								<Text style={styles.firstPartText}>No account? </Text>
								<Text style={styles.linkedText} onPress={() => handleRegisterRedirection()}>
									Click here
								</Text>
							</View>
							<View style={styles.TextLineWrapper}>
								<Text style={styles.firstPartText}>Back to </Text>
								<Text style={styles.linkedText} onPress={() => handleLoginRedirection()}>
									login page
								</Text>
							</View>
						</View>
					</KeyboardAwareScrollView>
				</ImageBackground>
			</SafeAreaView>
		)
	}
}

export default ForgotPasswordScreen

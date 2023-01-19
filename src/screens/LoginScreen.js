import AsyncStorage from "@react-native-async-storage/async-storage"
import { default as i18n } from "i18n-js"
import { Box, Input, Stack } from "native-base"
import { useEffect, useState } from "react"
import { BackHandler, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import CustomLabel from "../components/CustomLabel"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { clearStorage } from "../utils/functions"

const LoginScreen = ({ navigation, route }) => {
	const hook = useUser()
	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName
	const [message, setMessage] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => true)
		return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
	}, [])

	useEffect(() => {
		if (route.params) {
			if (route.params.deleteAccount) {
				AsyncStorage.getItem("access").then((res) => {
					if (res) {
						hook.deleteAccount().then((res) => {
							if (res !== undefined && res.status === 200) {
								clearStorage()
								setMessage({ text: "You have succesfully deleted your account!", type: "success" })
							}
						})
					}
				})
			} else if (route.params.logout && hook.token) {
				hook.signout().then((res) => {
					// if (res) {
					clearStorage()
					// }
				})
			}
		}
	}, [route])

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		if (hook.token) {
	// 			hook.signout().then((res) => {
	// 				if (res) {
	// 					clearStorage()
	// 				}
	// 			})
	// 		}
	// 	}, [])
	// )

	useEffect(() => {
		if (hook.message) {
			setMessage(hook.message)
		}
	}, [hook.message])

	const handleRegisterRedirection = () => {
		setMessage(null)
		hook.cleanToast()
		navigation.navigate("Registration")
	}

	const handleForgotPassRedirect = () => {
		setMessage(null)
		hook.cleanToast()
		navigation.navigate("Password")
	}

	const submit = () => {
		hook.signin({ username: username, password: password }).then((res) => {
			if (res !== undefined && res.status === 200) {
				navigation.navigate(`TabScreens`)
			}
		})
	}

	const styles = StyleSheet.create({
		image: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
			justifyContent: "center",
		},
		wrapper: { padding: 20, alignItems: "center" },

		title: {
			fontSize: 20,
			letterSpacing: 7,
			paddingVertical: 20,
			color: colors.dark,
			fontFamily: `${companyFontName}-Regular`,
		},
		firstTextLineWrapper: {
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

	return (
		<SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
			<ImageBackground source={config.background} style={styles.image}>
				<KeyboardAwareScrollView>
					<View style={styles.wrapper}>
						{config.styledLogo}
						<Text style={styles.title}>{i18n.t("signIn")}</Text>
						{message && <CustomLabel text={message.text} type={message.type} />}
						<Stack space={4} w="100%" mt={8}>
							<CustomInput
								onChangeText={(value) => setUsername(value)}
								value={username}
								placeholder={i18n.t("username")}
								h="45px"
							/>

							<Box shadow={2} bg={colors.bg} borderRadius="lg">
								<Input
									h="45px"
									bg={colors.bg}
									type="password"
									borderColor={"gray.100"}
									borderRadius="lg"
									_focus={{ borderColor: colors.dark, backgroundColor: "_bg" }}
									placeholder={i18n.t("password")}
									fontSize={14}
									onChangeText={(value) => setPassword(value)}
									InputRightElement={
										<CustomButton
											icon="arrow"
											h="full"
											w="80px"
											bg={colors.medium}
											borderRadius="lg"
											onPress={() => submit()}
										/>
									}
								/>
							</Box>
						</Stack>

						{config.appId !== 2 && (
							<>
								<View style={styles.firstTextLineWrapper}>
									<Text style={styles.firstPartText}>
										{i18n.t("noAccount")} {""}
									</Text>
									<Text style={styles.linkedText} onPress={() => handleRegisterRedirection()}>
										{i18n.t("clickHere")}
									</Text>
								</View>
								<Text style={styles.linkedText} onPress={() => handleForgotPassRedirect()}>
									{i18n.t("forgotPassword")}
								</Text>
							</>
						)}
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

export default LoginScreen

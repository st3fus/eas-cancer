import I18n from "i18n-js"
import React from "react"
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Logo from "../icons/Logo"
import useConfig from "../utils/config"

const SuccessScreen = ({ navigation }) => {
	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

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

	return (
		<SafeAreaView style={{ marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
			<ImageBackground source={config.background} style={styles.image}>
				<KeyboardAwareScrollView>
					<View style={styles.wrapper}>
						<Logo width={100} height={100} />
						<Text style={styles.title}>{I18n.t("checkEmailMessage")}</Text>
						<View style={styles.TextLineWrapper}>
							<Text style={styles.firstPartText}>{`${I18n.t("backTo")} `}</Text>
							<Text style={styles.linkedText} onPress={() => navigation.navigate("Login")}>
								{I18n.t("loginPage")}
							</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>
		</SafeAreaView>
	)
}

export default SuccessScreen

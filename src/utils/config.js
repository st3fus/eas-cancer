import { extendTheme } from "native-base"
import React from "react"
import { Image, Text } from "react-native"
import DoctornetLogo from "../icons/DoctornetLogo"
import Logo from "../icons/Logo"
import SmartedLogo from "../icons/SmartedLogo"
// import useUser from "../redux/hooks/useUser"
import store from "../redux/store"
import { appName, doctornet, IMAGE_PREFIX, pharmanet, smarted } from "./constants"
import { transformFontName } from "./functions"

export default function useConfig() {
	const hookUser = store.getState().user

	const pharmaConfig = () => {
		const mcBlack = "#012c31"
		const mcBg = "#f5feff"
		const mcMedium = "#24b4bc"
		const mcDark = "#00707c"
		const mcError = "#ed7474"
		const mcLight = "#cbf2f4"
		const mcGreen = "#00ff00"

		const rootColors = {
			black: mcBlack,
			bg: mcBg,
			light: mcLight,
			medium: mcMedium,
			dark: mcDark,
			red: mcError,
			green: mcGreen,
		}

		const colors = rootColors

		const nativeBaseColors = {
			_black: mcBlack,
			_bg: mcBg,
			_light: mcLight,
			_medium: mcMedium,
			_dark: mcDark,
			_red: mcError,
			_green: mcGreen,
		}

		const companyFontName = "JosefinSans"

		const nativeBaseTheme = extendTheme({
			colors: nativeBaseColors,
			fontConfig: {
				JosefinSans_400Regular: {
					200: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					300: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					400: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					500: {
						normal: `${companyFontName}-Medium`,
						italic: `${companyFontName}-Medium`,
					},
					600: {
						normal: `${companyFontName}-SemiBold`,
						italic: `${companyFontName}-SemiBold`,
					},
					700: {
						normal: `${companyFontName}-Bold`,
					},
					800: {
						normal: `${companyFontName}-Regular`,
					},
					900: {
						normal: `${companyFontName}-Regular`,
					},
				},
			},
			fonts: {
				heading: `${companyFontName}-Regular`,
				body: `${companyFontName}-Regular`,
				mono: `${companyFontName}-Regular`,
			},
		})

		const theme = nativeBaseTheme

		const appId = 1
		const background = require("../assets/pharmanet-background.jpg")
		const logo = <Logo />
		const styledLogo = <Logo width={100} height={100} />

		//policy
		const companyName = "PHARMA SOLUTIONS"
		const website = "https://pharmasolutions.rs/"
		const support = "office@pharmasolutions.rs"
		const companyInfo = "MB: 21585769, PIB: 111981535"
		const policyAppName = "Pharma Net"

		const title = (titleString) => {
			return (
				<Text
					style={{
						textTransform: "uppercase",
						color: colors.medium,
						fontWeight: "600",
						fontFamily: `${companyFontName}-Regular`,
					}}
				>
					{titleString}
				</Text>
			)
		}

		return {
			appId,
			title,
			background,
			logo,
			styledLogo,
			companyName,
			website,
			support,
			companyInfo,
			policyAppName,
			colors,
			theme,
			companyFontName,
		}
	}

	const smartedConfig = () => {
		const mcBlack = "#041829"
		const mcBg = "#f5feff"
		const mcMedium = "#4292dc"
		const mcDark = "#082d4f"
		const mcError = "#ed7474"
		const mcLight = "#cbdfed"
		const mcGreen = "#00ff00"

		const rootColors = {
			black: mcBlack,
			bg: mcBg,
			light: mcLight,
			medium: mcMedium,
			dark: mcDark,
			red: mcError,
			green: mcGreen,
		}

		const colors = rootColors

		const nativeBaseColors = {
			_black: mcBlack,
			_bg: mcBg,
			_light: mcLight,
			_medium: mcMedium,
			_dark: mcDark,
			_red: mcError,
			_green: mcGreen,
		}

		// const extractedFonts =
		const companyFontName = "Inter"

		const nativeBaseTheme = extendTheme({
			colors: nativeBaseColors,
			fontConfig: {
				Inter_400Regular: {
					200: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					300: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					400: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					500: {
						medium: `${companyFontName}-Medium`,
						italic: `${companyFontName}-Medium`,
					},
					600: {
						semibold: `${companyFontName}-SemiBold`,
						italic: `${companyFontName}-SemiBold`,
					},
					700: {
						bold: `${companyFontName}-Bold`,
					},
					800: {
						normal: `${companyFontName}-Regular`,
					},
					900: {
						normal: `${companyFontName}-Regular`,
					},
				},
			},
			fonts: {
				heading: `${companyFontName}-Regular`,
				body: `${companyFontName}-Regular`,
				mono: `${companyFontName}-Regular`,
			},
		})

		const theme = nativeBaseTheme

		const appId = 2
		const background = require("../assets/smarted-background.jpg")
		const logo = <SmartedLogo />
		const styledLogo = <SmartedLogo width={100} height={100} />

		//policy
		const companyName = "PARTNER CONSULTING"
		const website = "https://smart-ed.rs/"
		const support = "podrska@smart-ed.rs"
		const companyInfo = "MB: 21714496, PIB: 112655570"
		const policyAppName = "Smart-ed"

		const title = (titleString, company) => {
			if (company && company.company_image) {
				return (
					<Image
						style={{
							width: 120,
							height: 40,

							resizeMode: "contain",
							alignSelf: "center",
						}}
						source={{
							uri: `${IMAGE_PREFIX}${company.company_image}`,
						}}
						// source={require("../assets/playground.png")}
					/>
				)
			} else {
				return (
					<Text
						style={{
							textTransform: "uppercase",
							color: colors.medium,
							fontWeight: "600",
							fontFamily: `${companyFontName}-Regular`,
							alignSelf: "center",
						}}
					>
						{titleString}
					</Text>
				)
			}
		}

		return {
			appId,
			title,
			background,
			logo,
			styledLogo,
			companyName,
			website,
			support,
			companyInfo,
			policyAppName,
			colors,
			theme,
			companyFontName,
		}
	}

	const doctorConfig = () => {
		const mcBlack = "#181818"
		const mcBg = "#effffc"
		const mcMedium = "#06ab8f"
		const mcDark = "#065547"
		const mcError = "#ed7474"
		const mcLight = "#b8ddd6"
		const mcGreen = "#00ff00"

		const rootColors = {
			black: mcBlack,
			bg: mcBg,
			light: mcLight,
			medium: mcMedium,
			dark: mcDark,
			red: mcError,
			green: mcGreen,
		}

		const colors = rootColors

		const nativeBaseColors = {
			_black: mcBlack,
			_bg: mcBg,
			_light: mcLight,
			_medium: mcMedium,
			_dark: mcDark,
			_red: mcError,
			_green: mcGreen,
		}

		const companyFontName = "JosefinSans"

		const nativeBaseTheme = extendTheme({
			colors: nativeBaseColors,
			fontConfig: {
				JosefinSans_400Regular: {
					200: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					300: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					400: {
						normal: `${companyFontName}-Regular`,
						italic: `${companyFontName}-Regular`,
					},
					500: {
						normal: `${companyFontName}-Medium`,
						italic: `${companyFontName}-Medium`,
					},
					600: {
						normal: `${companyFontName}-SemiBold`,
						italic: `${companyFontName}-SemiBold`,
					},
					700: {
						normal: `${companyFontName}-Bold`,
					},
					800: {
						normal: `${companyFontName}-Regular`,
					},
					900: {
						normal: `${companyFontName}-Regular`,
					},
				},
			},
			fonts: {
				heading: `${companyFontName}-Regular`,
				body: `${companyFontName}-Regular`,
				mono: `${companyFontName}-Regular`,
			},
		})

		const theme = nativeBaseTheme

		const appId = 3
		const background = require("../assets/doctornet-background.jpg")
		const logo = <DoctornetLogo />
		const styledLogo = <DoctornetLogo width={100} height={100} />

		//policy
		const companyName = "PHARMA SOLUTIONS"
		const website = "https://pharmasolutions.rs/"
		const support = "office@pharmasolutions.rs"
		const companyInfo = "MB: 21585769, PIB: 111981535"
		const policyAppName = "Doctornet"

		const title = (titleString) => {
			return (
				<Text
					style={{
						textTransform: "uppercase",
						color: colors.medium,
						fontWeight: "600",
						fontFamily: `${companyFontName}-Regular`,
					}}
				>
					{titleString}
				</Text>
			)
		}

		return {
			appId,
			title,
			background,
			logo,
			styledLogo,
			companyName,
			website,
			support,
			companyInfo,
			policyAppName,
			colors,
			theme,
			companyFontName,
		}
	}

	const customConfig = (company) => {
		const mcBlack = company.master_color_black
		const mcBg = company.master_color_background
		const mcMedium = company.master_color_normal
		const mcDark = company.master_color_dark
		const mcError = company.master_color_error
		const mcLight = company.master_color_light
		const mcGreen = "#00ff00"

		const companyFontName = transformFontName(company.font)

		const rootColors = {
			black: mcBlack,
			bg: mcBg,
			light: mcLight,
			medium: mcMedium,
			dark: mcDark,
			red: mcError,
			green: mcGreen,
		}

		const colors = rootColors

		const nativeBaseColors = {
			_black: mcBlack,
			_bg: mcBg,
			_light: mcLight,
			_medium: mcMedium,
			_dark: mcDark,
			_red: mcError,
			_green: mcGreen,
		}

		const nativeBaseFontConfig = {}
		nativeBaseFontConfig[`${companyFontName}-Regular`] = {
			200: {
				regular: `${companyFontName}-Regular`,
				medium: `${companyFontName}-Regular`,
				semibold: `${companyFontName}-Regular`,
				italic: `${companyFontName}-Regular`,
			},
			300: {
				regular: `${companyFontName}-Regular`,
				medium: `${companyFontName}-Regular`,
				semibold: `${companyFontName}-Regular`,
				italic: `${companyFontName}-Regular`,
			},
			400: {
				regular: `${companyFontName}-Regular`,
				medium: `${companyFontName}-Regular`,
				semibold: `${companyFontName}-Regular`,
				italic: `${companyFontName}-Regular`,
			},
			500: {
				regular: `${companyFontName}-Regular`,
				medium: `${companyFontName}-Regular`,
				semibold: `${companyFontName}-Regular`,
				italic: `${companyFontName}-Regular`,
			},
			600: {
				regular: `${companyFontName}-Regular`,
				semibold: `${companyFontName}-Regular`,
				italic: `${companyFontName}-Regular`,
			},
			700: {
				regular: `${companyFontName}-Regular`,
			},
			800: {
				regular: `${companyFontName}-Regular`,
			},
			900: {
				regular: `${companyFontName}-Regular`,
			},
		}

		const nativeBaseFonts = {
			heading: `${companyFontName}-Regular`,
			body: `${companyFontName}-Regular`,
			mono: `${companyFontName}-Regular`,
		}

		const nativeBaseTheme = extendTheme({
			colors: nativeBaseColors,
			fontConfig: nativeBaseFontConfig,
			fonts: nativeBaseFonts,
		})

		const theme = nativeBaseTheme

		let defaultApp = null
		if (appName === pharmanet) {
			defaultApp = pharmaConfig()
		} else if (appName === smarted) {
			defaultApp = smartedConfig()
		} else if (appName === doctornet) {
			defaultApp = doctorConfig()
		}

		const appId = defaultApp.appId
		const background = defaultApp.background
		const logo = defaultApp.logo
		const styledLogo = defaultApp.styledLogo

		//policy
		const companyName = defaultApp.companyName
		const website = defaultApp.website
		const support = defaultApp.support
		const companyInfo = defaultApp.companyInfo
		const policyAppName = defaultApp.policyAppName

		const title = (titleString) => {
			if (company.company_image) {
				return (
					<Image
						style={{
							width: 120,
							height: 40,
							resizeMode: "contain",
							alignSelf: "center",
						}}
						source={{
							uri: `${IMAGE_PREFIX}${company.company_image}`,
						}}
					/>
				)
			} else {
				return (
					<Text
						style={{
							textTransform: "uppercase",
							color: colors.medium,
							fontWeight: "600",
							fontFamily: `${companyFontName}-Regular`,
							alignSelf: "center",
						}}
					>
						{titleString}
					</Text>
				)
			}
		}

		return {
			appId,
			title,
			background,
			logo,
			styledLogo,
			companyName,
			website,
			support,
			companyInfo,
			policyAppName,
			colors,
			theme,
			companyFontName,
		}
	}

	if (hookUser.company && hookUser.company.use_custom_theme) {
		return customConfig(hookUser.company)
	} else if (appName === smarted) {
		return smartedConfig()
	} else if (appName === pharmanet) {
		return pharmaConfig()
	} else if (appName === doctornet) {
		return doctorConfig()
	}
}

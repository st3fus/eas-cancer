import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter"
import {
	JosefinSans_400Regular,
	JosefinSans_500Medium,
	JosefinSans_600SemiBold,
	JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans"
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat"
import { Mulish_400Regular, Mulish_500Medium, Mulish_600SemiBold, Mulish_700Bold } from "@expo-google-fonts/mulish"
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito"
import { OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold, OpenSans_700Bold } from "@expo-google-fonts/open-sans"
import { Oswald_400Regular, Oswald_500Medium, Oswald_600SemiBold, Oswald_700Bold } from "@expo-google-fonts/oswald"
import { Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold } from "@expo-google-fonts/raleway"
import { RobotoSlab_400Regular, RobotoSlab_500Medium, RobotoSlab_600SemiBold, RobotoSlab_700Bold } from "@expo-google-fonts/roboto-slab"
import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from "@expo-google-fonts/rubik"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Notifications from "expo-notifications"
import { default as I18n, default as i18n } from "i18n-js"
import React, { useCallback } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import { articleReactions, articleViews, educationViews, loginCount, passedTests } from "./constants"
//date formatting
Date.prototype.setTimezoneOffset = function (minutes) {
	//eslint-disable-line
	var _minutes
	if (this.timezoneOffset === _minutes) {
		_minutes = this.getTimezoneOffset()
	} else {
		_minutes = this.timezoneOffset
	}
	if (arguments.length) {
		this.timezoneOffset = minutes
	} else {
		this.timezoneOffset = minutes = this.getTimezoneOffset()
	}
	return this.setTime(this.getTime() + (_minutes - minutes) * 6e4)
}

export const formatDateForCell = (date) => {
	let d = new Date(date)
	d.setTimezoneOffset(0)
	return d.toLocaleString("en-GB", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}

export const formatDateWithoutTime = (date) => {
	let d = new Date(date)
	d.setTimezoneOffset(0)
	return d.toLocaleDateString("en-GB")
}
export const getTimeRemaining = (endtime) => {
	const total = Date.parse(endtime) - Date.parse(new Date())
	const seconds = Math.floor((total / 1000) % 60)
	const minutes = Math.floor((total / 1000 / 60) % 60)
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
	const days = Math.floor(total / (1000 * 60 * 60 * 24))

	return {
		total,
		days,
		hours,
		minutes,
		seconds,
	}
}

//dropdownOptions

export const makeDropdownOptions = (array, setData) => {
	if (array.length > 0) {
		const arrayDrop = []
		array.map((element, i) => arrayDrop.push(element.name))
		setData(arrayDrop)
	}
}

export const makeDropdownOptionsSearch = (array, setData, label, value, modalForms) => {
	if (modalForms && label && value && array.length > 0) {
		const arrayDrop = []
		array.map((element, i) => arrayDrop.push({ value: element[value], label: I18n.t(element["code"]) }))
		setData(arrayDrop)
	} else if (label && value && array.length > 0) {
		const arrayDrop = []
		array.map((element, i) => arrayDrop.push({ value: element[value], label: element[label] }))
		setData(arrayDrop)
	} else if (array.length > 0) {
		const arrayDrop = []
		array.map((element, i) => arrayDrop.push({ id: element.id, name: element.name }))
		setData(arrayDrop)
	}
}

export const setDefaultValue = (defaultValue, setValue) => {
	if (defaultValue && typeof defaultValue === "object") {
		setValue(defaultValue.name)
	} else if (defaultValue) {
		setValue(defaultValue)
	}
}

export const saveData = async (name, token) => {
	try {
		const res = await AsyncStorage.setItem(name, token)
		//   alert('Data successfully saved')
		if (res) return true
	} catch (e) {
		//   alert('Failed to save the data to the storage')
	}
}

export const readData = async (setToken) => {
	try {
		const token = await AsyncStorage.getItem("token")

		if (token !== null) {
			setToken(token)
		}
	} catch (e) {
		// alert('Failed to fetch the data from storage')
	}
}

export const clearStorage = async () => {
	try {
		await AsyncStorage.removeItem("access")
		// console.log("Storage successfully cleared!")
	} catch (e) {
		//   alert('Failed to clear the async storage.')
	}
}

export const loadingIndicator = (colors) => {
	return <LoadingIndicator colors={colors} />
}

export const checkLabel = (label) => {
	if (label === loginCount) {
		return i18n.t("loginCount")
	} else if (label === articleViews) {
		return i18n.t("articleViews")
	} else if (label === articleReactions) {
		return i18n.t("articleReactions")
	} else if (label === educationViews) {
		return i18n.t("educationViews")
	} else if (label === passedTests) {
		return i18n.t("passedTests")
	}
}

export const registerForPushNotificationsAsync = async () => {
	try {
		const token = await AsyncStorage.getItem("push_token")

		if (token) {
			return token
		} else {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== "granted") {
				// console.log("Failed to get push token for push notification!")
				return
			}
			const pushToken = (await Notifications.getExpoPushTokenAsync()).data

			if (Platform.OS === "android") {
				Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: "#FF231F7C",
				})
			}

			saveData("push_token", pushToken)

			return pushToken
		}
	} catch (e) {
		// alert('Failed to fetch the data from storage')
	}
}

export const useYupValidationResolver = (validationSchema) =>
	useCallback(
		async (data) => {
			try {
				const values = await validationSchema.validate(data, {
					abortEarly: false,
				})

				return {
					values,
					errors: {},
				}
			} catch (errors) {
				return {
					values: {},
					errors: errors.inner.reduce(
						(allErrors, currentError) => ({
							...allErrors,
							[currentError.path]: {
								type: currentError.type ?? "validation",
								message: currentError.message,
							},
						}),
						{}
					),
				}
			}
		},
		[validationSchema]
	)

export const transformFontName = (companyFont) => {
	if (companyFont === "inter") {
		return "Inter"
	} else if (companyFont === "josefin sans") {
		return "JosefinSans"
	} else if (companyFont === "oswald") {
		return "Oswald"
	} else if (companyFont === "montserrat") {
		return "Montserrat"
	} else if (companyFont === "Raleway") {
		return "Raleway"
	} else if (companyFont === "open sans") {
		return "OpenSans"
	} else if (companyFont === "nunito") {
		return "Nunito"
	} else if (companyFont === "mulish") {
		return "Mulish"
	} else if (companyFont === "roboto slab") {
		return "RobotoSlab"
	} else if (companyFont === "rubik") {
		return "Rubik"
	}
}

export const fonts = {
	"Inter-Regular": Inter_400Regular,
	"Inter-Medium": Inter_500Medium,
	"Inter-SemiBold": Inter_600SemiBold,
	"Inter-Bold": Inter_700Bold,
	"Oswald-Regular": Oswald_400Regular,
	"Oswald-Medium": Oswald_500Medium,
	"Oswald-SemiBold": Oswald_600SemiBold,
	"Oswald-Bold": Oswald_700Bold,
	"JosefinSans-Regular": JosefinSans_400Regular,
	"JosefinSans-Medium": JosefinSans_500Medium,
	"JosefinSans-SemiBold": JosefinSans_600SemiBold,
	"JosefinSans-Bold": JosefinSans_700Bold,
	"Montserrat-Regular": Montserrat_400Regular,
	"Montserrat-Medium": Montserrat_500Medium,
	"Montserrat-SemiBold": Montserrat_600SemiBold,
	"Montserrat-Bold": Montserrat_700Bold,
	"Raleway-Regular": Raleway_400Regular,
	"Raleway-Medium": Raleway_500Medium,
	"Raleway-SemiBold": Raleway_600SemiBold,
	"Raleway-Bold": Raleway_700Bold,
	"RobotoSlab-Regular": RobotoSlab_400Regular,
	"RobotoSlab-Medium": RobotoSlab_500Medium,
	"RobotoSlab-SemiBold": RobotoSlab_600SemiBold,
	"RobotoSlab-Bold": RobotoSlab_700Bold,
	"Rubik-Regular": Rubik_400Regular,
	"Rubik-Medium": Rubik_500Medium,
	"Rubik-SemiBold": Rubik_600SemiBold,
	"Rubik-Bold": Rubik_700Bold,
	"Mulish-Regular": Mulish_400Regular,
	"Mulish-Medium": Mulish_500Medium,
	"Mulish-SemiBold": Mulish_600SemiBold,
	"Mulish-Bold": Mulish_700Bold,
	"Nunito-Regular": Nunito_400Regular,
	"Nunito-Medium": Nunito_500Medium,
	"Nunito-SemiBold": Nunito_600SemiBold,
	"Nunito-Bold": Nunito_700Bold,
	"OpenSans-Regular": OpenSans_400Regular,
	"OpenSans-Medium": OpenSans_500Medium,
	"OpenSans-SemiBold": OpenSans_600SemiBold,
	"OpenSans-Bold": OpenSans_700Bold,
}

export const defaultUserActivities = [
	{
		title: "UA_LOGIN_ACTIVITY",
		resultNumber: "0/0",
		color: "#EC5C5C",
		resultPercent: 0,
	},
	{
		title: "UA_NEWS_VIEWS",
		resultNumber: "0/0",
		color: "#EC5C5C",
		resultPercent: 0,
	},
	{
		title: "UA_NEWS_REACTIONS",
		resultNumber: "0/0",
		color: "#EC5C5C",
		resultPercent: 0,
	},
	{
		title: "UA_EDUCATION_VIEWS",
		resultNumber: "0/0",
		color: "#EC5C5C",
		resultPercent: 0,
	},
	{
		title: "UA_TESTS",
		resultNumber: "0/0",
		color: "#EC5C5C",
		resultPercent: 0,
	},
]

// export const getFonts = (companyFontName) => {
// 	if (companyFontName === "Inter") {
// 		return {
// 			Inter_400Regular,
// 			Inter_500Medium,
// 			Inter_600SemiBold,
// 			Inter_700Bold,
// 		}
// 	} else if (companyFontName === "Oswald") {
// 		return {
// 			Oswald_400Regular,
// 			Oswald_500Medium,
// 			Oswald_600SemiBold,
// 			Oswald_700Bold,
// 		}
// 	} else if (companyFontName === "JosefinSans") {
// 		return {
// 			JosefinSans_400Regular,
// 			JosefinSans_500Medium,
// 			JosefinSans_600SemiBold,
// 			JosefinSans_700Bold,
// 		}
// 	} else if (companyFontName === "Montserrat") {
// 		return {
// 			Montserrat_400Regular,
// 			Montserrat_500Medium,
// 			Montserrat_600SemiBold,
// 			Montserrat_700Bold,
// 		}
// 	} else if (companyFontName === "Montserrat") {
// 		return {
// 			Montserrat_400Regular,
// 			Montserrat_500Medium,
// 			Montserrat_600SemiBold,
// 			Montserrat_700Bold,
// 		}
// 	} else if (companyFontName === "Raleway") {
// 		return {
// 			Raleway_400Regular,
// 			Raleway_500Medium,
// 			Raleway_600SemiBold,
// 			Raleway_700Bold,
// 		}
// 	} else if (companyFontName === "RobotoSlab") {
// 		return {
// 			RobotoSlab_400Regular,
// 			RobotoSlab_500Medium,
// 			RobotoSlab_600SemiBold,
// 			RobotoSlab_700Bold,
// 		}
// 	} else if (companyFontName === "Rubik") {
// 		return {
// 			Rubik_400Regular,
// 			Rubik_500Medium,
// 			Rubik_600SemiBold,
// 			Rubik_700Bold,
// 		}
// 	} else if (companyFontName === "Mulish") {
// 		return {
// 			Mulish_400Regular,
// 			Mulish_500Medium,
// 			Mulish_600SemiBold,
// 			Mulish_700Bold,
// 		}
// 	} else if (companyFontName === "Nunito") {
// 		return {
// 			Nunito_400Regular,
// 			Nunito_500Medium,
// 			Nunito_600SemiBold,
// 			Nunito_700Bold,
// 		}
// 	} else if (companyFontName === "OpenSans") {
// 		return {
// 			OpenSans_400Regular,
// 			OpenSans_500Medium,
// 			OpenSans_600SemiBold,
// 			OpenSans_700Bold,
// 		}
// 	}
// }

import React from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../assets/theme/colors"
import CheckIcon from "../icons/CheckIcon"
import InfoIcon from "../icons/InfoIcon"
import WarningIcon from "../icons/WarningIcon"
import useConfig from "../utils/config"

const CustomLabel = ({ text, type }) => {
	//dati mu boju na osnovu type (error, success, info)
	//labela da ima bg te boje

	const config = useConfig()

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
			marginVertical: 4,
		},
		wrapper: {
			minHeight: 50,
			width: 270,
			flexDirection: "row",
			marginHorizontal: "auto",
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 18,
			paddingVertical: 4,
		},
		message: {
			fontFamily: `${config.companyFontName}-Regular`,
			fontSize: 14,
			textAlign: "center",
			color: "#fff",
			paddingHorizontal: 8,
		},
	})

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.wrapper,
					{
						backgroundColor:
							type === "error" ? colors.red : type === "success" ? "#24b4bc" : type === "info" ? "#3a82ce" : null,
					},
				]}
			>
				{type === "error" && <WarningIcon width={20} height={20} fill={"#af072e"} />}
				{type === "success" && <CheckIcon width={20} height={20} fill={colors.dark} />}
				{type === "info" && <InfoIcon width={20} height={20} fill={"#fff"} />}
				<Text style={[styles.message, {}]}>{text}</Text>
			</View>
		</View>
	)
}

export default CustomLabel

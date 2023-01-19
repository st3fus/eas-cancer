import { Box } from "native-base"
// import colors from "../assets/theme/colors"
import React, { useEffect, useState } from "react"
import { Keyboard, StyleSheet, Text, View } from "react-native"
import SearchableDropdown from "react-native-searchable-dropdown"
import useConfig from "../utils/config"

const DropdownSearch = ({ options, selectedItems, setSelectedItems, label, labelColor, placeholder, error, setError }) => {
	const colors = useConfig().colors
	const companyFontName = useConfig().companyFontName
	const [focused, setFocused] = React.useState(false)

	const [isKeyboardVisible, setKeyboardVisible] = useState(false)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true)
		})
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false)
		})

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	const getBorderColor = () => {
		if (error) {
			return colors.red
		}

		if (focused) {
			return colors.dark
		} else {
			return colors.medium
		}
	}

	const styles = StyleSheet.create({
		labelStyle: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 12,
			marginBottom: 4,
		},
		inputContainer: {
			// paddingVertical: 10,
			width: "100%",
		},
		wrapper: {
			height: 47,
			borderWidth: 0.5,
			shadowOffset: {
				width: 1,
				height: 1,
			},
			shadowOpacity: 0.12,
			shadowRadius: 2,
			elevation: 2,
			borderRadius: 10,
			// backgroundColor: colors.bg,
			marginTop: 4,
		},
		error: {
			// color: colors.red,
			paddingTop: 4,
			fontSize: 12,
			fontFamily: `${companyFontName}-Regular`,
		},
	})

	return (
		<View style={styles.inputContainer} keyboardShouldPersistTaps="always">
			{label && <Text style={[styles.labelStyle, { color: labelColor }]}>{label}</Text>}

			<Box w="100%" pr={2.2}>
				<SearchableDropdown
					selectedItems={selectedItems}
					onItemSelect={(item) => {
						if (setError) {
							setError(null)
						}
						// setSelectedItems([])
						setSelectedItems(item)
					}}
					containerStyle={{ zIndex: 10 }}
					itemStyle={{
						padding: 10,
						border: 0,
						borderColor: colors.bg,
						borderWidth: 1,
					}}
					itemTextStyle={{ color: colors.bg }}
					itemsContainerStyle={{
						maxHeight: 186,
						display: isKeyboardVisible ? "flex" : "none",
						backgroundColor: colors.medium,
						borderRadius: 8,
						marginTop: 2,
					}}
					items={options}
					// defaultIndex={2}
					resetValue={false}
					textInputProps={{
						placeholder: placeholder,
						underlineColorAndroid: "transparent",
						placeholderTextColor: colors.black,
						style: {
							paddingLeft: 12,
							height: 40,
							borderWidth: 0.5,
							borderColor: "#f4f4f5",
							shadowColor: "#bab0b0",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.17,
							shadowRadius: 2.54,
							elevation: 3,
							borderRadius: 10,
							backgroundColor: colors.bg,
							color: colors.black,
							fontSize: 14,
							fontFamily: `${companyFontName}-Regular`,
						},
					}}
					listProps={{
						nestedScrollEnabled: true,
					}}
					textInputStyle={{ borderColor: colors.red, backgroundColor: "yellow" }}
				/>
			</Box>

			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}

export default DropdownSearch

import { Box, ChevronDownIcon, ChevronUpIcon, Flex } from "native-base"
// import colors from "../assets/theme/colors"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import ModalDropdown from "react-native-modal-dropdown"
import useConfig from "../utils/config"

const Select = ({ options, style, defaultValue, label, labelColor, onSelect, error }) => {
	const colors = useConfig().colors
	const [focused, setFocused] = React.useState(false)
	const companyFontName = useConfig().companyFontName

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
			// marginBottom: -4,
		},
		inputContainer: {
			paddingHorizontal: 2,
		},
		wrapper: {
			height: 40,
			borderWidth: 0.5,
			borderRadius: 6,
			marginTop: 4,
		},
		error: {
			paddingTop: 4,
			fontSize: 12,
			fontFamily: `${companyFontName}-Regular`,
		},
	})

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={[styles.labelStyle, { color: labelColor }]}>{label}</Text>}

			<Flex
				h="40px"
				bg={colors.bg}
				shadow="1"
				shadowOpacity={0.4}
				shadowOffset={0.5}
				borderRadius="lg"
				direction="row"
				borderWidth={focused ? 0.8 : 0}
				borderColor={getBorderColor()}
			>
				<Box w="100%" pr={2.2}>
					<ModalDropdown
						options={options}
						defaultValue={defaultValue}
						isFullWidth
						onSelect={onSelect}
						style={style}
						onDropdownWillShow={() => {
							setFocused(true)
						}}
						onDropdownWillHide={() => {
							setFocused(false)
						}}
						textStyle={{
							color: colors.black,
							fontSize: 14,
							fontFamily: `${companyFontName}-Regular`,
							// textTransform: "uppercase",
						}}
						dropdownTextStyle={{
							fontSize: 14,
							fontFamily: `${companyFontName}-Regular`,
							color: colors.bg,
							// textTransform: "uppercase",
							backgroundColor: colors.dark,
						}}
						dropdownStyle={{
							backgroundColor: colors.dark,
							borderRadius: 8,
							paddingLeft: 10,
						}}
						// containerStyle={{ padding: 5 }}
					/>
				</Box>
				<Box position="absolute" right={2} top={2.5} zIndex={-1}>
					{focused ? <ChevronUpIcon size="5" color="muted.400" /> : <ChevronDownIcon size="5" color="muted.400" />}
				</Box>
			</Flex>
			{error && <Text style={[styles.error, { color: colors.red }]}>{error.message}</Text>}
		</View>
	)
}

export default Select

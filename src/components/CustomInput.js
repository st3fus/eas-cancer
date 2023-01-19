import { FormControl, Input, TextArea } from "native-base"
import React from "react"
// import colors from "../assets/theme/colors"
import useConfig from "../utils/config"

const CustomInput = ({
	onChangeText,
	iconPosition,
	editable,
	icon,
	style,
	value,
	defaultValue,
	label,
	labelColor,
	error,
	textArea,
	subquestionAnswer,
	placeholder,
	totalLines,
	...props
}) => {
	const colors = useConfig().colors
	const [focused, setFocused] = React.useState(false)

	return (
		<FormControl w="100%" maxW="400px">
			<FormControl.Label mb="0.5" _text={{ color: labelColor, fontSize: 12 }}>
				{label}
			</FormControl.Label>
			{textArea ? (
				<TextArea
					minH="100px"
					maxH="300px"
					editable={editable}
					textAlignVertical="top"
					paddingTop={0}
					paddingBottom={0}
					bg={colors.bg}
					shadow={1}
					borderColor={"gray.100"}
					_focus={{ borderColor: colors.dark, backgroundColor: "_bg" }}
					borderRadius="lg"
					placeholder={placeholder}
					totalLines={totalLines}
					value={value}
					onChangeText={onChangeText}
					p={1}
					{...props}
				/>
			) : (
				<Input
					editable={editable}
					h="40px"
					bg={colors.bg}
					borderColor={"gray.100"}
					borderRadius="lg"
					shadow={2}
					_focus={{ borderColor: colors.dark, backgroundColor: "_bg" }}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					fontSize={14}
					pl={2.5}
					{...props}
				/>
			)}
		</FormControl>
	)
}

export default CustomInput

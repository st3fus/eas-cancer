import { CheckIcon, Select } from "native-base"
import React from "react"

const NewSelect = ({ placeholder, colors, setSelectedItem, options, selectedItem, defaultValue, ...rest }) => {
	return (
		<Select
			{...rest}
			flexGrow={1}
			borderColor="gray.400"
			selectedValue={defaultValue ? defaultValue : selectedItem}
			accessibilityLabel={placeholder}
			placeholder={placeholder}
			borderRadius="lg"
			m={0}
			bg={colors.bg}
			textTransform="uppercase"
			fontSize={14}
			color="_black"
			h={"40px"}
			_selectedItem={{
				bg: "_dark",
				endIcon: <CheckIcon size="5" color={"_bg"} />,
				_text: {
					color: "_bg",
				},
			}}
			_focus={{
				borderColor: colors.dark,
			}}
			onValueChange={(itemValue) => setSelectedItem(itemValue)}
		>
			{options.map((item, i) => {
				return <Select.Item key={i + 1000} label={item.label} value={item.value} />
			})}
		</Select>
	)
}

export default NewSelect

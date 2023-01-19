import I18n from "i18n-js"
import { CheckIcon, Flex, HStack, Select } from "native-base"
import CustomButton from "./CustomButton"
import CustomInput from "./CustomInput"

const FilterHeader = ({ searchInput, setSearchInput, selectedCategory, setSelectedCategory, options, handleSearch, colors }) => {
	return (
		<Flex justify="center" align="center" w="100%" p={2} minW="290px" maxW="500px">
			<CustomInput
				iconPosition="right"
				placeholder={I18n.t("searchPlaceholder")}
				value={searchInput}
				onChangeText={(val) => setSearchInput(val)}
				borderColor="gray.400"
				shadow={0}
			/>
			<HStack space={3} mt={2} w="100%">
				<Select
					flexGrow={1}
					borderColor="gray.400"
					selectedValue={selectedCategory}
					accessibilityLabel={I18n.t("category").toUpperCase()}
					placeholder={I18n.t("category").toUpperCase()}
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
					onValueChange={(itemValue) => setSelectedCategory(itemValue)}
				>
					<Select.Item label={I18n.t("allCategories")} value={""} />
					{options.map((item, i) => {
						return <Select.Item key={i} label={item.name} value={item.id} />
					})}
				</Select>
				{/* </Box> */}

				<CustomButton bg={colors.dark} w={"92px"} h={"40px"} onPress={() => handleSearch()} icon={"searchIcon"} />
			</HStack>
		</Flex>
	)
}
export default FilterHeader

import * as ScreenOrientation from "expo-screen-orientation"
import { default as i18n, default as I18n } from "i18n-js"
import { CheckIcon, Flex, HStack, Select } from "native-base"
import React, { useCallback, useEffect, useState } from "react"
import { Alert, BackHandler, Dimensions, FlatList, RefreshControl } from "react-native"
import ArticleItem from "../components/ArticleItem"
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import useArticle from "../redux/hooks/useArticle"
import useDropdownData from "../redux/hooks/useDropdownData"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { articleCategory } from "../utils/constants"
import { loadingIndicator, makeDropdownOptionsSearch } from "../utils/functions"

const { width, height } = Dimensions.get("window")

const ArticlesScreen = ({ navigation, route }) => {
	const hook = useUser()
	const hookArticle = useArticle()
	const hookDd = useDropdownData()
	const [refreshing, setRefreshing] = useState(false)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [categories, setCategories] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [focused, setFocused] = React.useState(false)
	const colors = useConfig().colors

	// const { unread } = route.params

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		console.log(route)
	// 		if (route.params) {
	// 			if (route.params.unread) {

	// 			}
	// 		}
	// 	}, [])
	// )

	useEffect(() => {
		if (route.params) {
			if (route.params.unread) {
				hookArticle.cleanData()
				hookArticle.fetchArticles(hookArticle.defaultSize, 1, { unread: true }, true)
			}
		}
	}, [route])

	useEffect(() => {
		if (hook.language) {
			i18n.locale = hook.language.code.toLowerCase()
		}
	}, [hook.language])

	useEffect(() => {
		if (hookDd.articleCategories.length > 0) {
			makeDropdownOptionsSearch(hookDd.articleCategories, setCategories)
		}
	}, [hookDd.articleCategories])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		setScrollPosition(0)
		hookArticle.cleanData()
		hookArticle.fetchArticles(hookArticle.defaultSize, 1, null, true).then(() => setRefreshing(false))
	}, [])

	const backAction = () => {
		Alert.alert("", i18n.t("areYouSureExitMessage"), [
			{
				text: i18n.t("no"),
				onPress: () => null,
				style: "cancel",
			},
			{ text: i18n.t("yes"), onPress: () => BackHandler.exitApp() },
		])
		return true
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

		hookDd.fetchG(articleCategory)
		hookArticle.cleanData()
		hookArticle.fetchArticles(hookArticle.defaultSize, 1, null, true)
		hook.sendPushToken()

		return () => backHandler.remove()
	}, [])

	const handleScroll = (e) => {
		// console.log(e.nativeEvent)
		setScrollPosition(e.nativeEvent.contentOffset.y)
	}

	const handleSearch = (categoryId) => {
		const filterData = {}
		if (searchInput) {
			filterData["title"] = searchInput
		}

		if (selectedCategory) {
			filterData["category"] = selectedCategory
		}

		if (categoryId) {
			filterData["category"] = categoryId
		}

		const handleClean = () => {
			setRefreshing(false)
			// setSelectedCategory(null)
			// setSearchInput("")
		}

		setRefreshing(true)
		hookArticle.cleanData()
		hookArticle.fetchArticles(hookArticle.defaultSize, 1, filterData, true).then(() => handleClean())
	}

	const handleLoadMore = () => {
		const filterData = {}
		if (searchInput) {
			filterData["title"] = searchInput
		}

		if (selectedCategory) {
			filterData["category"] = selectedCategory.id
		}

		if (!hookArticle.secondLoading && !hookArticle.stopFetching) {
			hookArticle.fetchArticles(hookArticle.defaultSize, parseInt(hookArticle.pagination.current_page) + 1, filterData, false, true)
		}
	}

	const handleIndicator = () => {
		if (hookArticle.secondLoading && !hookArticle.stopFetching) {
			return loadingIndicator(colors)
		} else {
			return <></>
		}
	}

	const handleCategoryChange = (data) => {
		setSelectedCategory(data)
		handleSearch(data.id)
	}

	const listHeaderComponent = (searchInput, setSearchInput) => {
		return (
			<Flex justify="center" align="center" w="100%" p={2} minW="290px" maxW="500px">
				<CustomInput
					iconPosition="right"
					placeholder={I18n.t("searchPlaceholder")}
					// value={searchInput}
					value={searchInput}
					onChangeText={(val) => setSearchInput(val)}
					borderColor="gray.400"
					shadow={0}
					// defaultValue={searchInput}
				/>
				{/* <Input
					placeholder={I18n.t("searchPlaceholder")}
					// value={searchInput}
					// onEndEditing={(val) => setSearchInput(val)}
					// onEndEditing={(v) => console.log(v)}
					onEndEditing={(e) => setSearchInput(e.target.value)}
					// onEndEditing={(val) => setSearchInput(val)}
					borderColor="gray.400"
					shadow={0}
				/> */}

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
						onOpen={() => setFocused(true)}
						onClose={() => setFocused(false)}
					>
						<Select.Item label={I18n.t("allCategories")} value={""} />
						{categories.map((item, i) => {
							return <Select.Item key={i} label={item.name} value={item.id} />
						})}
					</Select>
					{/* </Box> */}

					<CustomButton bg={colors.dark} w={"92px"} h={"40px"} onPress={() => handleSearch()} icon={"searchIcon"} />
				</HStack>
			</Flex>
		)
	}

	const keyExtractor = (item) => item.id.toString()

	if (hookArticle.loading) {
		return loadingIndicator(colors)
	} else {
		return (
			// <KeyboardAvoidingView>
			<Flex background={colors.bg} w="100%" align="center">
				<FlatList
					data={hookArticle.data}
					renderItem={(itemData) => <ArticleItem item={itemData.item} width={width} colors={colors} navigation={navigation} />}
					keyExtractor={keyExtractor}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					onScroll={handleScroll}
					ListHeaderComponent={listHeaderComponent(searchInput, setSearchInput)}
					ListFooterComponent={handleIndicator}
					keyboardShouldPersistTaps={"handled"}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					initialNumToRender={hookArticle.data.length}
					removeClippedSubviews={true}
					getItemLayout={(data, index) => ({ length: 400, offset: 400 * index, index })}
				/>
			</Flex>
			// </KeyboardAvoidingView>
		)
	}
}

export default ArticlesScreen

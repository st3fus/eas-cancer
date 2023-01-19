import { Box } from "native-base"
import { useCallback, useEffect, useState } from "react"
import { BackHandler, Dimensions, FlatList, RefreshControl, SafeAreaView } from "react-native"
import EduItem from "../components/EduItem"
import FilterHeader from "../components/FilterHeader"
import useDropdownData from "../redux/hooks/useDropdownData"
import useEducation from "../redux/hooks/useEducation"
import useUser from "../redux/hooks/useUser"
// import Created from "../icons/Created"
// import Hourglass from "../icons/Hourglass"
import useConfig from "../utils/config"
import { educationCategory } from "../utils/constants"
import { loadingIndicator, makeDropdownOptionsSearch } from "../utils/functions"

const EducationsScreen = ({ navigation, route }) => {
	const hookEdu = useEducation()
	const hookUser = useUser()
	const hookDd = useDropdownData()
	const [searchInput, setSearchInput] = useState("")
	const [refreshing, setRefreshing] = useState(false)
	const [fullEduData, setFullEduData] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [categories, setCategories] = useState([])

	const colors = useConfig().colors

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => true)
		return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
	}, [])

	useEffect(() => {
		hookDd.fetchG(educationCategory)
		if (hookUser.newEmployee) {
			hookEdu.fetchNewEmp()
		}
		if (route.params) {
			if (route.params.notCompleted) {
				const filterData = {
					notCompleted: true,
				}
				hookEdu.cleanData()
				hookEdu.searchPage(hookEdu.defaultSize, 1, filterData)
			} else if (route.params.finishedTest) {
				hookEdu.cleanData()
				hookEdu.fetchPage(hookEdu.defaultSize, 1, true)
			}
		} else {
			hookEdu.cleanData()
			hookEdu.fetchPage(hookEdu.defaultSize, 1, true)
		}
	}, [route])

	useEffect(() => {
		if (hookDd.educationCategories.length > 0) {
			makeDropdownOptionsSearch(hookDd.educationCategories, setCategories)
		}
	}, [hookDd.educationCategories])

	useEffect(() => {
		if (hookEdu.data.length > 0) {
			let edus = [...hookEdu.newEmployeeData]
			let currentData = [...hookEdu.data]
			currentData.map((item, i) => {
				let newItem = Object.assign({}, item)
				if (hookUser.newEmployee && hookEdu.newEmployeeData.filter((edu, i) => !edu.completed).length > 0) {
					newItem["locked"] = true
				}
				edus.push(newItem)
			})
			setFullEduData(edus)
		}
	}, [hookEdu.data])

	// const handleSearch = () => {
	// 	if (searchInput) {
	// 		// React.useCallback(() => {
	// 		setRefreshing(true)
	// 		const filterData = {
	// 			name: searchInput,
	// 		}
	// 		hookEdu.cleanData()
	// 		hookEdu.searchPage(hookEdu.defaultSize, 1, filterData).then(() => setRefreshing(false))
	// 		// }, [])
	// 	}
	// }

	const handleSearch = (categoryId) => {
		const filterData = {}
		if (searchInput) {
			filterData["name"] = searchInput
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
		hookEdu.cleanData()
		hookEdu.searchPage(hookEdu.defaultSize, 1, filterData).then(() => handleClean())
	}

	const listHeaderComponent = (searchInput, setSearchInput) => {
		return (
			<FilterHeader
				colors={colors}
				handleSearch={handleSearch}
				options={categories}
				searchInput={searchInput}
				selectedCategory={selectedCategory}
				setSearchInput={setSearchInput}
				setSelectedCategory={setSelectedCategory}
			/>
		)
	}

	const windowHeight = Dimensions.get("window").height - 50

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		setSelectedCategory(null)
		setSearchInput("")
		hookEdu.cleanData()
		hookEdu.fetchPage(hookEdu.defaultSize, 1, true).then(() => setRefreshing(false))
	}, [])

	const keyExtractor = (item) => item.id.toString()

	const handleLoadMore = () => {
		if (!hookEdu.secondLoading && !hookEdu.stopFetching && hookEdu.pagination) {
			hookEdu.fetchPage(hookEdu.defaultSize, parseInt(hookEdu.pagination.current_page) + 1, false, true)
		}
	}

	const handleIndicator = () => {
		if (hookEdu.secondLoading && !hookEdu.stopFetching) {
			return loadingIndicator(colors)
		} else {
			return <></>
		}
	}

	if (hookEdu.loading) {
		return loadingIndicator(colors)
	} else if (fullEduData.length > 0) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
				<Box minH={windowHeight} bg={colors.bg} pb={30}>
					<FlatList
						data={fullEduData}
						renderItem={(itemData) => <EduItem item={itemData.item} colors={colors} navigation={navigation} />}
						ListHeaderComponent={listHeaderComponent(searchInput, setSearchInput)}
						contentContainerStyle={{ paddingBottom: 40 }}
						keyExtractor={keyExtractor}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						ListFooterComponent={handleIndicator}
						keyboardShouldPersistTaps={"handled"}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0.5}
						initialNumToRender={fullEduData.length}
						removeClippedSubviews={Platform.OS === "ios" ? false : true}
						getItemLayout={(data, index) => ({ length: 400, offset: 400 * index, index })}
					/>
				</Box>
			</SafeAreaView>
		)
	} else {
		return <></>
	}
}

export default EducationsScreen

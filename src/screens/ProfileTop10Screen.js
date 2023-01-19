import { Box, CheckIcon, Heading, HStack, Pressable, Select, StatusBar } from "native-base"
import React, { useEffect, useState } from "react"
import { Animated, Dimensions } from "react-native"
import { SceneMap, TabView } from "react-native-tab-view"
import Top10List from "../components/profile/Top10List"
import useDashboard from "../redux/hooks/useDashboard"
import useDropdownData from "../redux/hooks/useDropdownData"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import { education, top10Education, top10Month, top10Year } from "../utils/constants"
import { makeDropdownOptionsSearch } from "../utils/functions"
const colors = useConfig().colors

const FirstRoute = () => {
	const hookD = useDashboard()
	const data = hookD.topListMonth

	return <Top10List list={data} loading={hookD.loadingTop10Month} />
}

const SecondRoute = () => {
	const hookD = useDashboard()
	const data = hookD.topListYear

	return <Top10List list={data} loading={hookD.loadingTop10Year} />
}

const ThirdRoute = () => {
	const hookD = useDashboard()
	const hookDd = useDropdownData()
	const data = hookD.topListEducation

	const [selectedEdu, setSelectedEdu] = useState(null)

	const [educations, setEducations] = useState([])

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		// hookD.cleanTop10()
	// 		setSelectedEdu(null)
	// 	}, [])
	// )

	useEffect(() => {
		if (hookDd.educations.length > 0) {
			makeDropdownOptionsSearch(hookDd.educations, setEducations)
		}
	}, [hookDd.educations])

	const handleFetch = (val) => {
		setSelectedEdu(val)
		hookD.fetchUserComponent(top10Education, val)
	}

	return (
		<>
			<Box px={2} pt={2}>
				<Select
					// overflow="hidden"
					h="40px"
					placeholder="Choose"
					// borderColor="gray.400"
					textTransform="uppercase"
					fontSize={14}
					color="_black"
					_selectedItem={{
						bg: "_dark",
						endIcon: <CheckIcon size="5" color={"_bg"} />,
						_text: {
							color: "_bg",
						},
					}}
					_focus={{
						borderColor: "_dark",
					}}
					onValueChange={(value) => handleFetch(value)}
					selectedValue={selectedEdu}
				>
					{educations.map((item, index) => {
						return <Select.Item key={index} label={item.name} value={item.id} />
					})}
				</Select>
			</Box>
			<Top10List list={data} edu={true} loading={hookD.loadingTop10Edu} />
		</>
	)
}

const initialLayout = {
	width: Dimensions.get("window").width,
}

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
	third: ThirdRoute,
})

const ProfileTop10Screen = () => {
	const hookUser = useUser()
	const hookD = useDashboard()
	const hookDd = useDropdownData()
	const config = useConfig()
	const [index, setIndex] = useState(0)

	// 	useFocusEffect(
	// 	React.useCallback(() => {
	// 		// hookD.cleanTop10()
	// 		setSelectedEdu(null)
	// 	}, [])
	// )

	useEffect(() => {
		hookDd.fetchG(education, true)
	}, [])

	useEffect(() => {
		// console.log(index, "index")
		if (index === 0) {
			if (!hookD.loadingTop10Month) {
				hookD.fetchUserComponent(top10Month)
			}
		} else if (index === 1) {
			if (!hookD.loadingTop10Year) {
				hookD.fetchUserComponent(top10Year)
			}
		} 
		// hookD.fetchUserComponent(top10Month)
	}, [index])

	const handleIndexChange = (index) => {
		setIndex(index)
	}

	const [routes] = useState([
		{
			key: "first",
			title: "Mesec",
		},
		{
			key: "second",
			title: "Godina",
		},
		{
			key: "third",
			title: "Edukacija",
		},
	])

	const renderTabBar = (props) => {
		const inputRange = props.navigationState.routes.map((x, i) => i)
		return (
			<HStack space={1} px={2} mt={4} alignItems="center">
				{hookUser.company && hookUser.company.use_custom_theme && (
					<Heading color="_dark" mr={1} fontSize="20px">
						Top 10
					</Heading>
				)}
				{props.navigationState.routes.map((route, i) => {
					const opacity = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5)),
					})

					const background = index === i ? "_dark" : "_bg"

					return (
						<Box rounded="lg" bg={background} color={"red.300"} shadow={2} flex={1} alignItems="center" p="2">
							<Pressable
								onPress={() => {
									setIndex(i)
								}}
							>
								<Animated.Text
									style={{
										color: index === i ? colors.bg : colors.dark,
									}}
								>
									{route.title}
								</Animated.Text>
							</Pressable>
						</Box>
					)
				})}
			</HStack>
		)
	}

	// if (hookD.loading) return <LoadingIndicator colors={config.colors} />

	return (
		<Box flex={1} bg="_bg">
			<TabView
				navigationState={{
					index,
					routes,
				}}
				renderScene={renderScene}
				renderTabBar={renderTabBar}
				onIndexChange={handleIndexChange}
				initialLayout={initialLayout}
				style={{
					marginTop: StatusBar.currentHeight,
				}}
			/>
		</Box>
	)
}

export default ProfileTop10Screen

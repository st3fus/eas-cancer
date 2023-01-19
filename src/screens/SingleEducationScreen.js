import { Video } from "expo-av"
import * as ScreenOrientation from "expo-screen-orientation"
import I18n from "i18n-js"
import { Box, Button, Flex, Image, ScrollView, Stack, Text } from "native-base"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { BackHandler, Dimensions, Platform, StatusBar, StyleSheet, useWindowDimensions, View } from "react-native"
import CustomButton from "../components/CustomButton"
import CustomEduCarousel from "../components/CustomEduCarousel"
import CustomWebView from "../components/CustomWebView"
import useEducation from "../redux/hooks/useEducation"
import useTest from "../redux/hooks/useTest"
import useConfig from "../utils/config"
import { IMAGE_PREFIX } from "../utils/constants"
import { loadingIndicator } from "../utils/functions"

const { width, height } = Dimensions.get("window")

const SingleEducationScreen = ({ route, navigation }) => {
	const window = useWindowDimensions()
	const hookEdu = useEducation()
	const hookTest = useTest()

	const [carouselItems, setCarouselItems] = useState([])
	const [orientation, setOrientation] = useState(true)
	const [isPortrait, setIsPortrait] = useState(true)
	const [imgUri, setImgUri] = useState("")
	const [imageHeight, setImageHeight] = useState(0)

	const colors = useConfig().colors

	const screenWidth = width

	const video = React.useRef(null)

	useEffect(() => {
		ScreenOrientation.unlockAsync()
		// ScreenOrientation.getPlatformOrientationLockAsync().then(res => console.log(res))
		// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
		hookEdu.cleanDetail()
		hookEdu.fetchOne(route.params.id)
		hookTest.cleanAnswers()
		hookTest.cleanDetail().then(() => hookTest.fetchOne(route.params.id))
	}, [])

	useEffect(() => {
		// set initial orientation
		ScreenOrientation.getOrientationAsync().then((info) => {
			setOrientation(info.orientation)
		})

		// subscribe to future changes
		const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
			setOrientation(evt.orientationInfo.orientation)
		})

		// return a clean up function to unsubscribe from notifications
		return () => {
			ScreenOrientation.removeOrientationChangeListener(subscription)
		}
	}, [])

	useLayoutEffect(() => {
		if (!isPortrait) {
			navigation.setOptions({ headerShown: false })
			navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
			StatusBar.setHidden(true)
		} else {
			navigation.setOptions({ headerShown: true })
			navigation.dangerouslyGetParent().setOptions({ tabBarVisible: true })
			StatusBar.setHidden(false)
		}
	}, [isPortrait])

	useEffect(() => {
		if (orientation === 4 || orientation === 3) {
			setIsPortrait(false)
		} else if (orientation === 1 || orientation === 2 || orientation === undefined) {
			setIsPortrait(true)
		}
	}, [orientation])

	const handleStart = () => {
		hookTest
			.start({
				test: hookTest.detail.test.id,
				serial_num: hookTest.detail.test.user_test_attempts,
				education: hookEdu.detail.education.id,
			})
			.then((res) => {
				if (res !== undefined && res.status === 200) {
					navigation.navigate("Test")
				}
			})
	}

	useEffect(() => {
		if (hookEdu.detail) {
			const data = []
			hookEdu.detail.slides.map((slide, i) => data.push({ text: slide.text, image: slide.image }))
			setCarouselItems(data)
		}
	}, [hookEdu.detail])

	function handleBackButtonClick() {
		navigation.goBack()
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
		}
	}, [])

	useEffect(() => {
		if (hookEdu.detail && hookEdu.detail.education && hookEdu.detail.education.content_image) {
			setImgUri(`${IMAGE_PREFIX}${hookEdu.detail.education.content_image}`)
		}
	}, [hookEdu.detail])

	useEffect(() => {
		if (imgUri) {
			Image.getSize(imgUri, (width, height) => {
				// console.log(width, height)
				setImageHeight(Math.round((screenWidth - 40) / (width / height)))
				setImageWidth(width)
				//misticne stvari
				// if (screenWidth > 600) {
				// 	// console.log("here")
				// 	setImageHeight(Math.round(((screenWidth * 4) / 5 - 40) * (width / height)))
				// } else {
				// 	// console.log("here")
				// 	setImageHeight(Math.round((screenWidth - 40) / (width / height)))
				// }
			})
		}
	}, [imgUri])

	const styles = StyleSheet.create({
		goToTestBtn: {
			height: 46,
			width: 190,
			backgroundColor: colors.medium,
			borderRadius: 16,
			marginLeft: 4,
		},
		videoContainer: {
			flex: 1,
			justifyContent: "center",
			// backgroundColor: "#ecf0f1",
		},
		video: {
			alignSelf: "center",
			width: width,
			height: 200,
		},
	})

	const renderEdu = () => {
		const detail = hookEdu.detail

		const renderCarousel = () => {
			return (
				<CustomEduCarousel
					carouselItems={carouselItems}
					colors={colors}
					currentEdu={detail}
					currentTest={hookTest.detail}
					handleStart={handleStart}
					isPortrait={isPortrait}
					window={window}
					width={width}
					height={height}
				/>
			)
		}

		const renderTestButton = () => {
			const currentTest = hookTest.detail

			return (
				<>
					{currentTest && !currentTest.test.user_allowed_test ? (
						<Box flexDir="row" alignItems="center" justifyContent="center" w={300} mb={1} bg="red.100" rounded={4}>
							<WarningIcon width={20} height={20} fill={colors.red} />
							<Text
								textAlign="center"
								ml={2}
								color={colors.red}
								fontWeight="bold"
								textTransform="uppercase"
								fontSize={13}
								maxW={240}
							>
								{I18n.t("maxTimes")}
							</Text>
						</Box>
					) : currentTest && currentTest.test.user_allowed_test ? (
						<CustomButton
							width={190}
							icon="arrow"
							bg={colors.medium}
							text={I18n.t("startTest")}
							onPress={() => handleStart()}
						/>
					) : (
						<Text fontSize={16} textAlign="center">
							{I18n.t("noTest")}
						</Text>
					)}
				</>
			)
		}

		if (detail) {
			if (detail.education.content_type === 4 && Platform.OS === "ios") {
				return (
					<ScrollView>
						<CustomWebView
							colors={colors}
							totalWidth={width - 25}
							currentWidth={width}
							content={`${IMAGE_PREFIX}${detail.education.content_pdf}`}
							pdf={true}
						/>
						{detail.slides.length > 0 ? renderCarousel() : renderTestButton()}
					</ScrollView>
				)
			} else if (detail.education.content_type === 4 && Platform.OS === "android") {
				return (
					<Flex align="center">
						<Button
							bg="_dark"
							my={3}
							borderRadius="lg"
							w="170px"
							_text={{
								color: "_bg",
								fontSize: "11px",
								textTransform: "uppercase",
							}}
							onPress={() => {
								downloadDocument()
							}}
						>
							{`${I18n.t("download")} PDF`}
						</Button>
						{detail.slides.length > 0 ? renderCarousel() : renderTestButton()}
					</Flex>
				)
			} else if (detail.education.content_type === 1) {
				return (
					<CustomEduCarousel
						carouselItems={carouselItems}
						colors={colors}
						currentEdu={detail}
						currentTest={hookTest.detail}
						handleStart={handleStart}
						isPortrait={isPortrait}
						window={window}
						width={width}
						height={height}
					/>
				)
			} else if (detail.education.content_type === 3) {
				return (
					<Stack mb={2} space={3} w={width} alignItems="center">
						<Image
							source={{
								uri: `${IMAGE_PREFIX}${detail.education.content_image}`,
							}}
							alt="alt"
							w={"100%"}
							h={imageHeight}
						/>
						{detail.slides.length > 0 ? renderCarousel() : renderTestButton()}
					</Stack>
				)
			} else if (detail.education.content_type === 2) {
				return (
					<Stack mb={2} space={3} w={width} alignItems="center" h={300}>
						<View style={styles.videoContainer}>
							<Video
								ref={video}
								style={styles.video}
								source={{
									uri: `${IMAGE_PREFIX}${detail.education.content_video}`,
								}}
								useNativeControls
								isLooping
								shouldPlay={false}
								resizeMode="contain"
							/>
						</View>
						{detail.slides.length > 0 ? renderCarousel() : renderTestButton()}
					</Stack>
				)
			} else {
				return <></>
			}
		} else {
			return <></>
		}
	}

	if (hookEdu.loading) {
		return loadingIndicator(colors)
	} else {
		return (
			<Box bg={colors.bg} alignItems="center" justifyContent="center" width="100%" flex={1}>
				{/* <Box mt={1} alignItems="center"> */}
				{renderEdu()}
				{/* </Box> */}
			</Box>
		)
	}
}

export default SingleEducationScreen

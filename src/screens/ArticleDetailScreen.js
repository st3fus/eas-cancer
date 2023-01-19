import { Video } from "expo-av"
// import { downloadToFolder } from "expo-file-dl"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import * as ScreenOrientation from "expo-screen-orientation"
import I18n from "i18n-js"
import { Box, Button, Image } from "native-base"
import React, { useEffect, useRef, useState } from "react"
import { BackHandler, Dimensions, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useScrollIntoView, wrapScrollView } from "react-native-scroll-into-view"
import Comments from "../components/Comments"
import CustomWebView from "../components/CustomWebView"
import SubmitReport from "../components/SubmitReport"
import Survey from "../components/Survey"
import Comment from "../icons/Comment"
import Like from "../icons/Like"
import useArticle from "../redux/hooks/useArticle"
import useConfig from "../utils/config"
import { IMAGE_PREFIX, like } from "../utils/constants"
import { formatDateWithoutTime, loadingIndicator } from "../utils/functions"

const { width, height } = Dimensions.get("window")
const CustomScrollView = wrapScrollView(ScrollView)

export default function ArticleDetailScreen({ route, navigation }) {
	return (
		<CustomScrollView>
			<ArticleDetailContent route={route} navigation={navigation} />
		</CustomScrollView>
	)
}

function ArticleDetailContent({ route, navigation }) {
	const scrollIntoView = useScrollIntoView()
	const viewRef = useRef()
	const hookArticle = useArticle()
	const video = React.useRef(null)

	const [likeDisable, setLikeDisable] = useState(false)
	const [imageWidth, setImageWidth] = useState(0)
	const [imageHeight, setImageHeight] = useState(0)
	const [imgUri, setImgUri] = useState("")

	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

	const screenWidth = width

	useEffect(() => {
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
		hookArticle.cleanDetail()
		hookArticle.fetchOne(route.params.id, true)
	}, [])

	function handleBackButtonClick() {
		navigation.goBack()
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
		return () => {
			BackHandler.removeEventListener("hardwWareBackPress", handleBackButtonClick)
		}
	}, [])

	const handleLike = () => {
		setLikeDisable(true)
		hookArticle.postReaction(like, hookArticle.detail.id).then((res) => {
			if (res !== undefined && res.status === 200) {
				hookArticle.fetchOne(hookArticle.detail.unique_url).then((res2) => {
					setLikeDisable(false)
				})
			}
		})
	}

	useEffect(() => {
		if (hookArticle.detail) {
			setImgUri(`${IMAGE_PREFIX}${hookArticle.detail.image}`)
		}
	}, [hookArticle.detail])

	useEffect(() => {
		if (imgUri) {
			Image.getSize(imgUri, (width, height) => {
				setImageWidth(width)
				if (screenWidth > 600) {
					setImageHeight(Math.round(((screenWidth * 4) / 5 - 40) * (width / height)))
				} else {
					setImageHeight(Math.round((screenWidth - 40) / (width / height)))
				}
			})
		}
	}, [imgUri])

	const styles = StyleSheet.create({
		container: {
			marginHorizontal: 8,
			paddingBottom: 20,
			padding: 12,
			minHeight: height,
			flex: 1,
			backgroundColor: colors.bg,
			shadowColor: colors.medium,
			borderWidth: 0.5,
			borderRadius: 10,
			borderColor: "rgba(0, 0, 0, 0.1)",
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 0.22,
			elevation: 3,
		},

		cardBottom: {
			width: "100%",
			height: 59,
			backgroundColor: colors.light,
			borderBottomLeftRadius: 10,
			borderBottomRightRadius: 10,
			borderTopWidth: 0.5,
			borderTopColor: colors.dark,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingHorizontal: 10,
			marginTop: -1,
		},
		like: {
			height: 37,
			width: 37,
			backgroundColor: colors.medium,
			borderRadius: 12,
			marginHorizontal: 3,
			justifyContent: "center",
			alignItems: "center",
		},
		counterWrapper: {
			position: "absolute",
			width: 20,
			height: 20,
			borderRadius: 30,
			top: -8,
			right: -8,
			backgroundColor: colors.dark,
			justifyContent: "center",
			alignItems: "center",
		},
		counter: {
			color: colors.bg,
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 8,
		},
		cardBottomLeft: { flexDirection: "row" },
		cardBottomRight: { flexDirection: "row" },
		comment: {
			height: 37,
			width: 37,
			backgroundColor: colors.medium,
			borderRadius: 12,
			marginHorizontal: 3,
			marginLeft: 10,
			justifyContent: "center",
			alignItems: "center",
		},
		dateWrapper: {
			marginHorizontal: 3,
			justifyContent: "flex-end",
			alignItems: "center",
			marginRight: 10,
		},

		report: {
			height: 37,
			width: 37,
			backgroundColor: colors.red,
			borderRadius: 12,
			marginHorizontal: 3,
			justifyContent: "center",
			alignItems: "center",
		},
		categoryAndDateWrapper: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginBottom: 6,
		},
		categoryTag: {
			backgroundColor: colors.medium,
			marginTop: 6,
			paddingVertical: 2,
			paddingHorizontal: 4,
			borderRadius: 6,
		},
		categoryText: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 8,
			color: colors.bg,
			textTransform: "uppercase",
		},
		dateText: {
			fontSize: width > 400 ? 14 : 12,
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
			marginTop: 4,
		},
		title: {
			fontSize: 22,
			fontFamily: `${companyFontName}-Regular`,
			color: colors.dark,
		},
		content: {
			fontFamily: `${companyFontName}-Regular`,
		},
		videoContainer: {
			flex: 1,
			justifyContent: "center",
			backgroundColor: "#ecf0f1",
		},
		video: {
			alignSelf: "center",
			width: 320,
			height: 200,
		},
	})

	// const downloadDocument = () => {
	// 	ImagePicker.requestMediaLibraryPermissionsAsync().then((res) => {
	// 		if (res["granted"]) {
	// 			const title = `${hookArticle.detail.unique_url}.pdf`

	// 			downloadToFolder(`${IMAGE_PREFIX}${hookArticle.detail.content_pdf}`, title, "Downloads")
	// 		}
	// 	})
	// }

	const downloadDocument = async () => {
		const granted = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (granted) {
			const title = `${hookArticle.detail.unique_url}.pdf`
			const uri = `${IMAGE_PREFIX}${hookArticle.detail.content_pdf}`
			const downloadsFolder = `${FileSystem.documentDirectory}Downloads`
			const fileUri = `${downloadsFolder}/${title}`

			const isExist = await FileSystem.getInfoAsync(downloadsFolder)
			if (!isExist.exists) {
				await FileSystem.makeDirectoryAsync(downloadsFolder)
			}
			await FileSystem.downloadAsync(uri, fileUri)
		}
	}

	if (hookArticle.loading) {
		return loadingIndicator(colors)
	} else {
		return (
			hookArticle.detail && (
				<KeyboardAwareScrollView style={styles.container}>
					<ImageBackground
						source={{
							uri: imgUri,
						}}
						style={{
							width: "100%",
							height: imageHeight,
							justifyContent: "flex-end",
						}}
						imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
						resizeMode="contain"
					/>
					<View style={styles.cardBottom}>
						<View style={styles.cardBottomLeft}>
							<TouchableOpacity activeOpacity={0.5} onPress={handleLike} disabled={likeDisable}>
								<View style={styles.like}>
									<Like height={18} width={18} fill={hookArticle.detail.reacted ? colors.black : colors.bg} />
									<View style={styles.counterWrapper}>
										<Text style={styles.counter}>{hookArticle.detail.reactions_count}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.5} onPress={() => scrollIntoView(viewRef.current)}>
								<View style={styles.comment}>
									<Comment height={18} width={18} fill={colors.bg} />
								</View>
								<View style={styles.counterWrapper}>
									<Text style={styles.counter}>{hookArticle.detail.comments_count}</Text>
								</View>
							</TouchableOpacity>
						</View>

						{config.appId === 2 && (
							<View style={styles.cardBottomRight}>
								<SubmitReport colors={colors} />
							</View>
						)}
					</View>
					<View style={styles.categoryAndDateWrapper}>
						<View style={styles.categoryTag}>
							<Text style={styles.categoryText}>{hookArticle.detail.category_name}</Text>
						</View>
						<Text style={styles.dateText}>{formatDateWithoutTime(hookArticle.detail.date_created)}</Text>
					</View>

					<Text style={styles.title}>{hookArticle.detail.title}</Text>
					{/* <HTML
                        style={styles.content}
                        source={{ html: hookArticle.detail.content }}
                        contentWidth={100}
                    /> */}

					{hookArticle.detail.content_type === 4 && Platform.OS === "ios" ? (
						<CustomWebView
							colors={colors}
							totalWidth={width - 25}
							currentWidth={width}
							content={`${IMAGE_PREFIX}${hookArticle.detail.content_pdf}`}
							pdf={true}
						/>
					) : hookArticle.detail.content_type === 4 && Platform.OS === "android" ? (
						<Button
							bg="_dark"
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
					) : hookArticle.detail.content_type === 1 ? (
						<Box>
							<CustomWebView
								colors={colors}
								totalWidth={width - 25}
								currentWidth={width}
								content={hookArticle.detail.content}
							/>
						</Box>
					) : hookArticle.detail.content_type === 3 ? (
						<Image
							source={{
								uri: `${IMAGE_PREFIX}${hookArticle.detail.content_image}`,
							}}
							alt="alt"
							w={"100%"}
							h={imageHeight}
						/>
					) : hookArticle.detail.content_type === 2 ? (
						<View style={styles.videoContainer}>
							<Video
								ref={video}
								style={styles.video}
								source={{
									uri: `${IMAGE_PREFIX}${hookArticle.detail.content_video}`,
								}}
								useNativeControls
								isLooping
								shouldPlay={false}
								resizeMode="contain"
							/>
						</View>
					) : (
						<></>
					)}

					{hookArticle.detail.survey_questions && !hookArticle.detail.answered_survey && (
						<Survey
							surveyName={hookArticle.detail.survey_name}
							surveyQuestions={hookArticle.detail.survey_questions}
							colors={colors}
						/>
					)}
					<View ref={viewRef}>
						<Comments comments={hookArticle.detail.comments} colors={colors} />
					</View>
				</KeyboardAwareScrollView>
			)
		)
	}
}

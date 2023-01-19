import i18n from "i18n-js"
import { AspectRatio, Box, Flex, HStack, Image, Modal, Stack } from "native-base"
import { useEffect, useState } from "react"
import { Alert, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput"
import CustomWebView from "../components/CustomWebView"
import { CorrectIndicator, WrongIndicator } from "../components/Indicators"
import TestAnswer from "../components/TestAnswer"
import useEducation from "../redux/hooks/useEducation"
import useTest from "../redux/hooks/useTest"
import useConfig from "../utils/config"
import { IMAGE_PREFIX } from "../utils/constants"

const { width, height } = Dimensions.get("window")

const TestScreen = ({ navigation }) => {
	const [currentId, setCurrentId] = useState(0)
	const [resetedTest, setResetedTest] = useState(true)
	const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [modalText, setModalText] = useState("")
	const [modalImage, setModalImage] = useState("")
	const window = useWindowDimensions()

	const hook = useTest()
	const hookEdu = useEducation()
	const test = hook.detail

	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

	const handleAnswerClick = (payload) => {
		hook.handleUserAnswer(payload)
	}

	useEffect(() => {
		hook.cleanAnswers()
		if (test && test.answers) {
			test.answers.map((answer, i) => {
				const payload = {
					serial_num: answer.serial_num,
					text: answer.question,
					testResult: answer.answers,
					userResult: {},
					finalResult: false,
					id: answer.id,
					subquestion: "",
					confirmed: false,
				}
				hook.addTestAnswer(payload)
			})
		} else {
			navigate("/educations")
		}
	}, [])

	const handleEnd = () => {
		let payload = {
			test: test.test.id,
			serial_num: test.test.user_test_attempts,
			education: hookEdu.detail.education.id,
		}

		let answers = {}
		let answers_result = {}
		let sub_questions_result = {}
		hook.testAnswers.map((answer, i) => {
			answers[`${answer.id}`] = answer.finalResult
			sub_questions_result[`${answer.id}`] = answer.subquestion
			answers_result[`${answer.id}`] = answer.userResult
		})
		// setNumberOfCorrectAnswers()

		payload["answers"] = answers
		payload["answers_result"] = answers_result
		payload["sub_question_result"] = sub_questions_result

		hook.end(payload)
		setResetedTest(false)
	}

	useEffect(() => {
		if (test.answers && test.answers.length === currentId && resetedTest) {
			handleEnd()
		}
	}, [test, currentId])

	const handleReset = () => {
		hook.cleanAnswers()
		hook.fetchOne(test.test.education).then((res) => {
			if (res !== undefined && res.data.test.user_allowed_test) {
				const test = res.data.test
				hook.start({
					test: test.id,
					serial_num: test.user_test_attempts,
					education: hookEdu.detail.education.id,
				})
				res.data.answers.map((answer, i) => {
					const payload = {
						serial_num: answer.serial_num,
						text: answer.question,
						testResult: answer.answers,
						userResult: {},
						finalResult: false,
						id: answer.id,
						subquestion: "",
						confirmed: false,
					}
					hook.addTestAnswer(payload)
				})
				setCurrentId(0)
			} else {
				Alert.alert(null, i18n.t("maxTestMessage"))
			}
		})
	}

	const handleModalClose = () => {
		setModalVisible(false)
		setModalText("")
		setModalImage("")
	}

	const handleModalOpen = (image, text) => {
		setShowModal(true)
		setModalImage(image)
		setModalText(text)
	}

	const handleHTML = (html) =>
		`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=${
			window.width - 50
		}, user-scalable=no" initial-scale=0.2", ></head><body>${html}</body></html>`

	const styles = StyleSheet.create({
		// overlay: {
		//     // flex: 1,
		//     position: "absolute",
		//     left: 0,
		//     top: 0,
		//     opacity: 0.5,
		//     backgroundColor: "black",
		//     alignItems: "center",
		//     justifyContent: "center",
		// },
		// modal: {
		//     marginTop: 20,
		//     alignItems: "center",
		//     alignSelf: "center",
		//     justifyContent: "center",
		//     backgroundColor: colors.bg,
		//     opacity: 0.9,
		//     borderRadius: 12,
		//     paddingHorizontal: 2,
		// },

		questionWrapper: {
			backgroundColor: colors.dark,
			marginTop: 8,
			marginHorizontal: 4,
			marginBottom: 10,
			paddingHorizontal: 4,
			borderRadius: 12,
			minHeight: 60,
			position: "relative",
		},
		question: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 18,
			color: colors.bg,
			margin: 4,
		},

		subquestionWrapper: {
			maxHeight: 140,
			marginHorizontal: 4,
			paddingHorizontal: 4,
			// marginBottom: 10,
		},
		subquestion: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 14,
			color: colors.dark,
			margin: 4,
		},
		subquestionTextarea: {
			textAlignVertical: "top",
			justifyContent: "flex-start",
		},

		numeration: {
			color: colors.bg,
			position: "absolute",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			paddingTop: 2,
			right: -4,
			top: -5,
			width: 30,
			height: 30,
			backgroundColor: colors.medium,
			borderRadius: 100,
		},
		testImage: {
			// width: "100%",
			// height: 206,
			// marginTop: 8,
			// marginHorizontal: 8,
			// resizeMode: "contain",
			// borderRadius: 12,
			// alignSelf: "center",
		},
		indicatorsWrapper: {
			flexDirection: "row",
			marginHorizontal: 4,
			marginVertical: 12,
			height: 40,
			justifyContent: "center",
		},

		answerWrapper: {
			justifyContent: "space-between",
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 4,
			borderRadius: 12,
			borderWidth: 2,
			borderColor: colors.medium,
			marginBottom: 20,
			minHeight: 60,
		},

		answer: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 14,
			color: colors.dark,
			marginHorizontal: 2,
			width: 260,
		},
		// buttonCorrect: {
		//     height: 35,
		//     width: 35,
		//     borderRadius: 7,
		//     justifyContent: "center",
		//     alignItems: "center",
		//     backgroundColor: colors.dark,
		//     paddingRight: 8,
		//     marginHorizontal: 4,
		// },
		// buttonWrong: {
		//     height: 35,
		//     width: 35,
		//     borderRadius: 7,
		//     justifyContent: "center",
		//     alignItems: "center",
		//     backgroundColor: colors.red,
		//     paddingRight: 10,
		//     marginHorizontal: 4,
		// },

		nextBtnWrapper: {
			height: 42,
			marginBottom: 10,
		},
		nextBtn: {
			width: 80,
			height: 42,
			borderRadius: 12,
			paddingRight: 8,
			backgroundColor: colors.medium,
			marginRight: 4,
			marginLeft: "auto",
		},

		endBtn: {
			height: 57,
			width: 196,
			backgroundColor: colors.medium,
			borderRadius: 16,
			marginLeft: 4,
		},
		endReloadBtn: {
			height: 57,
			width: 84,
			backgroundColor: colors.medium,
			borderRadius: 16,
			paddingRight: 8,
			marginRight: 4,
		},
		backgroundImage: {
			width: width,
			height: height - 60,
			resizeMode: "cover",
			alignItems: "center",
		},
		endWindow: {
			height: 204,
			width: width - 20,
			backgroundColor: colors.bg,
			borderWidth: 0.5,
			borderColor: colors.medium,
			shadowOffset: {
				width: 1,
				height: 1,
			},
			shadowOpacity: 0.12,
			shadowRadius: 2,
			elevation: 2,
			borderRadius: 10,
			marginTop: 50,
			marginBottom: 20,
			justifyContent: "center",
			alignItems: "center",
		},
		scoreNumbers: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 14,
		},
		endMessage: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 20,
			textAlign: "center",
			textTransform: "uppercase",
		},
		bottomWrapper: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			paddingBottom: 4,
			marginBottom: 8,
		},
		companyWrapper: {
			justifyContent: "center",
			alignItems: "center",
			width: 150,
			height: 112,
			borderWidth: Platform.OS === "android" ? 0 : 0.5,
			borderColor: colors.medium,
			borderRadius: 15,
			shadowOffset: {
				width: 1,
				height: 1,
			},
			shadowOpacity: 0.12,
			shadowRadius: 2,
			elevation: 2,
			marginHorizontal: 4,
		},
		companyText: {
			fontFamily: `${companyFontName}-Regular`,
			textAlign: "center",
			marginBottom: 4,
			fontSize: 12,
		},
		companyImage: {
			width: 90,
			height: 62,
			resizeMode: "contain",
			borderRadius: 4,
		},
		slideLinkWrapper: {
			justifyContent: "center",
			alignItems: "center",
		},
		slideLinkBtn: {
			width: "100%",
			backgroundColor: colors.dark,
			opacity: 0.9,
			borderRadius: 6,
			zIndex: 10,
			paddingRight: 10,
			paddingVertical: 6,
			marginBottom: 2,
			borderWidth: 1,
			borderColor: colors.red,
		},
		slideImage: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
			borderRadius: 12,
			justifyContent: "center",
			alignItems: "center",
			overflow: "hidden",
		},
		img: {
			width: "100%",
			height: "60%",
			resizeMode: "cover",
			borderRadius: 12,
			marginBottom: 4,
		},
		modalImg: {
			width: width - 44,
			height: "100%",
			maxHeight: width - 60,
			top: 10,
			resizeMode: "contain",
			borderRadius: 12,
		},
		modalText: {
			fontFamily: `${companyFontName}-Regular`,
			minHeight: 120,
			backgroundColor: "red",
		},
		// modalTextWrapper: {
		//     position: "absolute",
		//     top: "48%",
		//     width: "90%",
		//     height: "40%",
		// },
		modalBtnWrapper: {
			alignItems: "flex-end",
			width: "100%",

			position: "absolute",
			height: "15%",
			maxHeight: 45,
			top: 8,
		},
		closeModalBtn: {
			backgroundColor: colors.red,
			width: 30,
			paddingRight: 11,
			marginHorizontal: 2,
			height: 30,
			borderRadius: 100,
		},
		eduText: {
			fontFamily: `${companyFontName}-Regular`,
			minHeight: 140,
			width: width,
			padding: 4,
			backgroundColor: colors.bg,
		},
	})

	const checkEduPointer = () => {
		if (hook.testAnswers.length > 0) {
			const answer = hook.testAnswers.find((answer, i) => i === currentId)
			if (answer !== undefined && answer.confirmed && !answer.finalResult) {
				const test = hook.detail.answers.find((element, i) => element.id === answer.id)
				if (test.education_slide_image !== undefined) {
					return (
						<>
							<View style={[styles.companyWrapper, styles.slideLinkWrapper]}>
								<ImageBackground style={styles.slideImage} source={{ uri: `${IMAGE_PREFIX}${test.education_slide_image}` }}>
									<CustomButton
										icon="searchIcon"
										bg={colors.medium}
										style={styles.slideLinkBtn}
										text={i18n.t("seeExplanation")}
										onPress={() => handleModalOpen(test.education_slide_image, test.education_slide_text)}
									/>
								</ImageBackground>
							</View>
						</>
					)
				} else {
					return <></>
				}
			} else {
				return <></>
			}
		} else {
			return <></>
		}
	}

	const handleEduRedirect = () => {
		navigation.navigate("EduStack", { screen: i18n.t("educationsNoUp"), params: { finishedTest: true } })
	}

	const checkAnswered = (id, key) => {
		let current = hook.testAnswers.find((answer) => answer.id === id)
		if (current && current.userResult[key]) {
			return true
		} else {
			return false
		}
	}

	const handleConfirm = (id) => {
		let currentQuestion = hook.testAnswers.find((answer) => answer.id === id)
		let testCorrectAnswers = {}
		Object.keys(currentQuestion.testResult).map((key, i) => {
			if (currentQuestion.testResult[key]) {
				return (testCorrectAnswers[key] = true)
			}
		})
		hook.confirmUserAnswer({
			id: id,
			finalResult: JSON.stringify(testCorrectAnswers) === JSON.stringify(currentQuestion.userResult) ? true : false,
		})
	}

	// console.log(hook.testAnswers[currentId])

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: colors.bg }}

			// style={{
			// 	flex: 1,
			// 	width: window.width,
			// 	marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
			// }}
			// behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
				<Modal.Content pb={2} maxH={window.height - 20} maxW={window.width - 8}>
					<Modal.CloseButton top={1} />
					<Modal.Header py={4} borderBottomWidth="0" />
					<Modal.Body flex={1} minH={height / 2} bg="_bg">
						<Stack>
							<AspectRatio ratio={4 / 3} mb={1} maxH="280px">
								<Image
									resizeMode="contain"
									rounded={8}
									size="lg"
									source={{
										uri: `${IMAGE_PREFIX}${modalImage}`,
									}}
									alt="img"
									width="100%"
									height="100%"
								/>
							</AspectRatio>
							{modalText ? (
								<Box minH="260px">
									<CustomWebView
										pdf={false}
										colors={colors}
										totalWidth={width - 30}
										currentWidth={width}
										content={modalText}
									/>
								</Box>
							) : (
								<></>
							)}
						</Stack>
					</Modal.Body>
				</Modal.Content>
			</Modal>

			{test.answers.map((question, i) => (
				<Stack display={currentId === i ? "flex" : "none"} space={2} key={i}>
					<Image
						style={styles.testImage}
						source={{ uri: `${IMAGE_PREFIX}${question.image}` }}
						alt="img"
						width={window.width - 8}
						mt={4}
						resizeMode="contain"
						height={210}
						borderRadius={12}
						alignSelf="center"
					/>

					<View style={styles.indicatorsWrapper} key={i + 1}>
						{hook.testAnswers.map((answer, i) => {
							if (answer.confirmed) {
								if (answer.finalResult) {
									return <CorrectIndicator key={i} />
								} else {
									return <WrongIndicator key={i} />
								}
							} else {
								return <></>
							}
						})}
					</View>
					<View style={styles.questionWrapper}>
						<View numerationWrapper>
							<Text style={styles.numeration}>{i + 1}</Text>
						</View>
						<Text style={styles.question} key={i}>
							{question.question}
						</Text>
					</View>

					<Flex marginX="4px" key={i + 2}>
						{test ? (
							hook.testAnswers.map((question, i) =>
								question.serial_num === currentId + 1
									? Object.keys(question.testResult).map((key, i) => (
											<TestAnswer
												text={key}
												key={i}
												confirmed={question.confirmed}
												testResult={question.testResult}
												userResult={question.userResult}
												handleClick={() =>
													handleAnswerClick({
														key: key,
														value: true,
														id: question.id,
														type: checkAnswered(question.id, key) ? "remove" : "add",
													})
												}
												answered={checkAnswered(question.id, key)}
												colors={colors}
												companyFontName={config.companyFontName}
											/>
									  ))
									: null
							)
						) : (
							<></>
						)}
					</Flex>
					{question.subquestion &&
					hook.testAnswers[currentId] !== undefined &&
					hook.testAnswers[currentId].serial_num === currentId + 1 &&
					hook.testAnswers[currentId].confirmed ? (
						<Stack space={2} minH="140px" mx="4px" pb={4}>
							<Text style={styles.subquestion} key={i}>
								{question.subquestion}
							</Text>
							<CustomInput
								style={styles.subquestionTextarea}
								labelColor={colors.bg}
								color={colors.dark}
								multiline={true}
								numberOfLines={6}
								maxLength={300}
								onChangeText={(val) => hook.updateSubquestion(i, val)}
								textArea
								subquestionAnswer
								placeholder={i18n.t("answerPlaceholder")}
							/>
						</Stack>
					) : (
						<></>
					)}

					<Flex align="flex-end" bg="_bg">
						{hook.testAnswers.map((question, i) =>
							question.serial_num === currentId + 1 && !question.confirmed ? (
								<CustomButton
									mr={"8px"}
									minW={90}
									bg={colors.medium}
									text={i18n.t("confirm")}
									onPress={() => handleConfirm(question.id)}
								/>
							) : question.serial_num === currentId + 1 && question.confirmed ? (
								<CustomButton
									mr={"8px"}
									w={90}
									bg={colors.medium}
									icon="arrow"
									style={styles.nextBtn}
									onPress={() => setCurrentId(currentId + 1)}
								/>
							) : (
								<></>
							)
						)}
					</Flex>
					<View style={styles.bottomWrapper}>
						{hook.detail && hook.detail.test.company ? (
							<View style={styles.companyWrapper}>
								{hook.detail.test.company_name && (
									<Text style={styles.companyText}>
										{i18n.t("testByCompany")} {hook.detail.test.company_name}
									</Text>
								)}
								{hook.detail.test.company_image && (
									<Image
										style={styles.companyImage}
										source={{
											uri: `${IMAGE_PREFIX}${hook.detail.test.company_image}`,
										}}
										alt="img"
										width={window.width - 8}
										mt={4}
										resizeMode="contain"
										height={210}
										alignSelf="center"
										borderRadius={12}
									/>
								)}
							</View>
						) : (
							<></>
						)}

						{checkEduPointer()}
					</View>
				</Stack>
			))}
			{
				//last test screen
				test.answers.length === currentId && (
					<ImageBackground source={config.background} style={styles.backgroundImage}>
						<View style={styles.endWindow}>
							<Text style={styles.scoreNumbers}>
								{hook.testAnswers.filter((answer) => answer.finalResult === true).length}/{test.answers.length}
							</Text>
							<View style={styles.indicatorsWrapper}>
								{hook.testAnswers.map((answer, i) => {
									if (answer.confirmed) {
										if (answer.finalResult) {
											return <CorrectIndicator key={i} />
										} else {
											return <WrongIndicator key={i} />
										}
									} else {
										return <></>
									}
								})}
							</View>
							<Text style={styles.endMessage}>
								{numberOfCorrectAnswers === test.answers.length ? i18n.t("successfulTest") : i18n.t("repeatTest")}
							</Text>
						</View>

						<HStack space={3}>
							<CustomButton
								bg={colors.medium}
								py={4}
								px={6}
								style={styles.endReloadBtn}
								icon="reloadIcon"
								onPress={() => handleReset()}
							/>
							<CustomButton
								bg={colors.medium}
								p={4}
								style={styles.endBtn}
								onPress={() => handleEduRedirect()}
								icon="arrow"
								text={i18n.t("endTest")}
							/>
						</HStack>
					</ImageBackground>
				)
			}
		</ScrollView>
	)
}

export default TestScreen

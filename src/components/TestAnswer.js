import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import CustomButton from "./CustomButton"

const TestAnswer = ({ colors, companyFontName, confirmed, testResult, userResult, text, handleClick, answered, key }) => {
	const checkColorAndIcon = () => {
		if (confirmed) {
			if (userResult[text]) {
				if (JSON.stringify(testResult[text]) === JSON.stringify(userResult[text])) {
					return { color: colors.dark, icon: "checkIcon" }
				} else {
					return { color: colors.red, icon: "xIcon" }
				}
			} else {
				return { color: colors.dark, icon: "checkIcon" }
			}
		} else {
			return { color: colors.dark, icon: "checkIcon" }
		}
	}

	const checkCorrectOrWrong = () => {
		const getCorrectOrWrong = () => {
			if (userResult[text]) {
				if (JSON.stringify(testResult[text]) === JSON.stringify(userResult[text])) {
					return styles.buttonCorrect
				} else {
					return styles.buttonWrong
				}
			} else if (testResult[text]) {
				return styles.buttonCorrect
			}
		}

		if (answered || testResult[text]) {
			return (
				<View>
					<CustomButton
						bg={checkColorAndIcon().color}
						w={35}
						h={35}
						borderRadius={7}
						icon={checkColorAndIcon().icon}
						style={getCorrectOrWrong()}
					/>
				</View>
			)
		} else {
			return <></>
		}
	}

	const styles = StyleSheet.create({
		answerWrapper: {
			justifyContent: "space-between",
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 4,
			borderRadius: 12,
			borderWidth: 2,
			minHeight: 60,
			marginBottom: 6,
		},
		answerWrapperWithoutBorder: {
			justifyContent: "space-between",
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 4,
			borderRadius: 12,
			borderWidth: 3,
			borderColor: colors.medium,
			marginBottom: 6,
			minHeight: 60,
		},
		answer: {
			fontFamily: `${companyFontName}-Regular`,
			fontSize: 14,
			color: colors.dark,
			marginHorizontal: 2,
			flex: 1,
			marginRight: 22,
		},
		buttonCorrect: {
			height: 35,
			width: 35,
			borderRadius: 7,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.dark,
			paddingRight: 8,
			marginHorizontal: 4,
		},
		buttonWrong: {
			height: 35,
			width: 35,
			borderRadius: 7,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.red,
			paddingRight: 10,
			marginHorizontal: 4,
		},
	})

	return (
		<TouchableOpacity activeOpacity={0.7} key={key} onPress={() => !confirmed && handleClick()}>
			<View style={answered ? styles.answerWrapperWithoutBorder : styles.answerWrapper} key={key}>
				<Text style={styles.answer}>{text}</Text>
				{confirmed && checkCorrectOrWrong()}
			</View>
		</TouchableOpacity>
	)
}

export default TestAnswer

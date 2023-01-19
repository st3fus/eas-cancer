import i18n from "i18n-js"
import React, { useEffect, useState } from "react"
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomInput from "../components/CustomInput"
import ReportIcon from "../icons/ReportIcon"
import XIcon from "../icons/XIcon"
import useArticle from "../redux/hooks/useArticle"
import useConfig from "../utils/config"
import CustomButton from "./CustomButton"
import FilePicker from "./FilePicker"

const { width, height } = Dimensions.get("window")

const SubmitReport = ({ colors }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [file, setFile] = useState(null)
	const [note, setNote] = useState("")
	const [message, setMessage] = useState(null)
	const [mimeType, setMimeType] = useState("")

	const hook = useArticle()
	const companyFontName = useConfig().companyFontName

	useEffect(() => {
		hook.cleanToast()
		setMessage(null)
	}, [])

	useEffect(() => {
		if (hook.message) {
			setMessage(hook.message)
		}
	}, [hook.message])

	const submit = () => {
		if (!file) {
			return
		} else {
			// const extension = file.uri.split(".")
			// `file.${extension[extension.length - 1]}`

			let formData = new FormData()

			formData.append("file", {
				name: file.name,
				type: mimeType,
				uri: file.uri,
			})

			if (note) {
				formData.append("note", note)
			}

			formData.append("article", hook.detail.id)

			hook.postArticleReport(formData).then((res) => {
				if (res !== undefined && res.status === 200) {
					setNote("")
					setFile(null)
					hook.cleanToast()
				} else {
					hook.cleanToast()
				}
			})
		}
	}

	const handleFileSelect = (chosenFile, fieldName, mime) => {
		setFile(chosenFile)
		setMimeType(mime)
	}

	const handleClose = () => {
		hook.cleanToast()
		setFile(null)
		setNote("")
		setMessage(null)
		setModalVisible(!modalVisible)
	}

	const styles = StyleSheet.create({
		overlay: {
			flex: 1,
			position: "absolute",
			left: 0,
			top: 0,
			opacity: 0.5,
			backgroundColor: "black",
			width: width,
			alignItems: "center",
			justifyContent: "center",
		},
		modal: {
			marginTop: 60,
			alignItems: "center",
			justifyContent: "space-between",
			alignSelf: "center",
			width: width - 40,
			height: 420,
			backgroundColor: colors.bg,
			borderRadius: 12,
			paddingVertical: 16,
			paddingHorizontal: 8,
			position: "relative",
		},
		closeBtn: {
			position: "absolute",
			top: 4,
			right: 5,
			height: 37,
			width: 37,
			backgroundColor: colors.red,
			borderRadius: 12,
			marginHorizontal: 3,
			justifyContent: "center",
			alignItems: "center",
		},
		title: {
			letterSpacing: 2,
			fontFamily: `${companyFontName}-Regular`,
			color: colors.dark,
			fontSize: 13,
			marginTop: 20,
		},
		input: {
			flex: 1,
			textAlignVertical: "top",
			justifyContent: "flex-start",
		},

		button: {
			height: 60,
			width: 190,
			backgroundColor: colors.medium,
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

		error: {
			color: colors.red,
			paddingTop: 4,
			fontSize: 12,
			fontFamily: `${companyFontName}-Bold`,
		},

		success: {
			color: colors.green,
			paddingTop: 4,
			fontSize: 14,
			fontFamily: `${companyFontName}-Bold`,
		},
	})

	return (
		<>
			<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => handleClose()}>
				<Pressable onPress={() => setModalVisible(false)} style={[styles.overlay, { height: height }]} />
				<View style={styles.modal}>
					<Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
						<XIcon width={20} height={20} fill={colors.bg} />
					</Pressable>
					<Text style={styles.title}>{i18n.t("submitReport")}</Text>
					{message && <Text style={message.type === "success" ? styles.success : styles.error}>{message.text}</Text>}
					<CustomInput
						style={styles.input}
						onChangeText={(value) => setNote(value)}
						value={note}
						placeholder={i18n.t("notePlaceholder")}
						labelColor={colors.bg}
						color={colors.dark}
						multiline={true}
						numberOfLines={6}
						maxLength={300}
						textArea
					/>
					{/* <filePickerComponent handleUpload={handleUpload} fileSelected={file} /> */}
					<FilePicker handleFileSelect={handleFileSelect} fileSelected={file} />

					<CustomButton
						style={styles.button}
						text={i18n.t("confirm")}
						bg={colors.medium}
						icon={"arrow"}
						onPress={() => submit()}
					/>
				</View>
			</Modal>
			<TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
				<View style={styles.report}>
					<ReportIcon height={18} width={18} fill={colors.bg} />
				</View>
			</TouchableOpacity>
		</>
	)
}

export default SubmitReport

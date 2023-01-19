import * as DocumentPicker from "expo-document-picker"
import i18n from "i18n-js"
import { Button, Icon, Text } from "native-base"
import { StyleSheet } from "react-native"
import Export from "../icons/Export"
import useConfig from "../utils/config"
import CustomButton from "./CustomButton"

const FilePicker = ({ fileSelected, handleFileSelect, cv, fieldName }) => {
	const colors = useConfig().colors

	const styles = StyleSheet.create({
		btn: {
			backgroundColor: colors.dark,
			width: 190,
			height: 38,
			borderRadius: 12,
			marginVertical: 8,
		},
	})

	const pickFile = async () => {
		DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false }).then((res) => {
			// console.log(res, "res")
			if (res.type !== "cancel") {
				handleFileSelect(res, fieldName, res.mimeType)
			}
		})
	}

	if (cv) {
		return (
			<Button
				bg={colors.medium}
				mt={0.5}
				w={230}
				size="sm"
				rounded="xl"
				endIcon={<Icon as={<Export width={20} height={20} fill={colors.bg} />} name="upload" />}
				onPress={pickFile}
			>
				<Text textTransform="uppercase" color={colors.bg}>
					{fileSelected ? i18n.t("yourCVIsUploaded") : i18n.t("uploadYourCV")}
				</Text>
			</Button>
		)
	} else {
		return (
			<CustomButton
				style={styles.btn}
				bg={colors.medium}
				text={fileSelected ? i18n.t("fileSelected") : i18n.t("chooseFile")}
				onPress={pickFile}
			/>
		)
	}
}

export default FilePicker

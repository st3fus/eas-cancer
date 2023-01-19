import i18n from "i18n-js"
import { Button } from "native-base"
import React, { useState } from "react"
import { Dimensions, Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import useConfig from "../../utils/config"
import CustomButton from "../CustomButton"
import PrivacyPolicyInEnglish from "./PrivacyPolicyInEnglish"
import PrivacyPolicyText from "./PrivacyPolicyText"
var { width, height } = Dimensions.get("window")

const PrivacyPolicy = ({ link }) => {
	const [modalVisible, setModalVisible] = useState(false)

	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName

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
			marginTop: 30,
			alignItems: "center",
			justifyContent: "center",
			alignSelf: "center",
			width: width - 30,
			height: height - 70,
			backgroundColor: colors.bg,
			opacity: 0.9,
			borderRadius: 12,
		},
		btnWrapper: {
			alignItems: "flex-end",
			justifyContent: "flex-end",
			width: "100%",
			marginRight: 8,
			marginBottom: 6,
		},
		btn: {
			backgroundColor: colors.red,
			width: 190,
			height: 38,
			borderRadius: 12,
			marginBottom: 4,
		},
		title: {
			paddingHorizontal: 10,
			paddingTop: 10,
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
		},
		contentWrapper: {
			height: "100%",
			width: "100%",
			marginVertical: 20,
		},
		linkedText: {
			fontFamily: `${companyFontName}-Regular`,
			color: colors.medium,
			textDecorationLine: "underline",
			paddingTop: 8,
			paddingBottom: 8,
		},
	})

	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={[styles.overlay, { height: height }]} />
				<View style={styles.modal}>
					<Text style={styles.title}>
						{i18n.t("privacyPolicy")} {"\n"}
						{"\n"}
						{`${config.companyName} DOO`} Kraljevo
					</Text>
					<ScrollView style={styles.contentWrapper}>
						{i18n.currentLocale() === "rs" ? <PrivacyPolicyText config={config} /> : <PrivacyPolicyInEnglish config={config} />}
					</ScrollView>
					<View style={styles.btnWrapper}>
						<CustomButton
							style={[styles.btn, { maxWidth: 140, marginHorizontal: 14 }]}
							bg={colors.red}
							text={i18n.t("close")}
							onPress={() => setModalVisible(false)}
						/>
					</View>
				</View>
			</Modal>
			{link ? (
				<Text style={styles.linkedText} onPress={() => setModalVisible(true)}>
					{i18n.t("privacyPolicy")}
				</Text>
			) : (
				<Button
					// w={190}
					bg="_bg"
					shadow={2}
					rounded="lg"
					maxW="105px"
					py={1}
					_text={{
						color: "_dark",
						fontWeight: "bold",
						fontSize: 10,
						textAlign: "center",
					}}
					onPress={() => setModalVisible(true)}
					// style={[styles.btn, { backgroundColor: colors.medium }]}
				>
					{i18n.t("privacyPolicy")}
				</Button>
			)}
		</>
	)
}

export default PrivacyPolicy

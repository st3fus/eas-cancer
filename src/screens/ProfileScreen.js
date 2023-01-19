import { useFocusEffect } from "@react-navigation/native"
import * as FileSystem from "expo-file-system"
import { StorageAccessFramework } from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import * as Sharing from "expo-sharing"
import i18n from "i18n-js"
import mime from "mime"
import { Avatar, Box, Button, Container, Flex, Heading, HStack, Icon, Modal, ScrollView, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import NewSelect from "../components/NewSelect"
import PrivacyPolicy from "../components/privacyPolicy/PrivacyPolicy"
import CategoryButton from "../components/profile/CategoryButton"
import ModalForms from "../components/profile/ModalForms"
import VisualMainBox from "../components/profile/VisualMainBox"
import ProfileAchievementsIcon from "../icons/ProfileAchievementsIcon"
import ProfileDocsIcon from "../icons/ProfileDocsIcon"
import ProfileEduIcon from "../icons/ProfileEduIcon"
import ProfileFormsIcon from "../icons/ProfileFormsIcon"
import ProfileNewsIcon from "../icons/ProfileNewsIcon"
import ProfileTop10Icon from "../icons/ProfileTop10Icon"
import useArticle from "../redux/hooks/useArticle"
import useDashboard from "../redux/hooks/useDashboard"
import useDropdownData from "../redux/hooks/useDropdownData"
import useEducation from "../redux/hooks/useEducation"
import useUser from "../redux/hooks/useUser"
import useConfig from "../utils/config"
import {
	achievementsCount,
	currentRankTop10Month,
	form,
	IMAGE_PREFIX,
	language,
	sector,
	unfinishedEducationCount,
	unreadArticleCount,
	userActivityComponent,
} from "../utils/constants"
import { defaultUserActivities, makeDropdownOptionsSearch, setDefaultValue } from "../utils/functions"
const { width, height } = Dimensions.get("window")

const ProfileScreen = ({ navigation }) => {
	const hook = useUser()
	const hookD = useDashboard()
	const config = useConfig()
	const hookDd = useDropdownData()
	const hookEdu = useEducation()
	const hookArticle = useArticle()
	const colors = config.colors

	const [showDocsModal, setShowDocsModal] = useState(false)
	const [showFormsModal, setShowFormsModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedDoc, setSelectedDoc] = useState(null)
	const [defaultCountry, setDefaultCountry] = useState(null)
	const [defaultCity, setDefaultCity] = useState(null)
	const [defaultTitle, setDefaultTitle] = useState(null)
	const [defaultLanguage, setDefaultLanguage] = useState(null)
	const [defaultPosition, setDefaultPosition] = useState(null)
	const [defaultPicture, setDefaultPicture] = useState("")
	const [defaultSector, setDefaultSector] = useState(null)
	const [userActivities, setUserActivities] = useState(defaultUserActivities)
	const [documents, setDocuments] = useState([])
	const [selectedForm, setSelectedForm] = useState(null)
	const [forms, setForms] = useState([])
	const [sectors, setSectors] = useState([])

	useEffect(() => {
		setDefaultValue(hook.country, setDefaultCountry)
		setDefaultValue(hook.title, setDefaultTitle)
		setDefaultValue(hook.language, setDefaultLanguage)
		setDefaultValue(hook.position, setDefaultPosition)
		setDefaultValue(hook.city, setDefaultCity)
	}, [hook.country, hook.title, hook.language, hook.position, hook.city])

	useEffect(() => {
		makeDropdownOptionsSearch(hookDd.documents, setDocuments, "title", "doc")
		makeDropdownOptionsSearch(hookDd.forms, setForms, "name", "id", true)
		makeDropdownOptionsSearch(hookDd.sectors, setSectors, "name", "id")
		if (hookDd.sectors.length > 0) {
			setDefaultSector(sectors.find((sector) => sector.value === hook.sector))
		}
	}, [hookDd.documents, hookDd.forms, hookDd.sectors])

	useEffect(() => {
		if (hook.profilePicture) {
			setDefaultPicture(hook.profilePicture)
		}
	}, [hook.profilePicture])

	useEffect(() => {
		if (hook.language) {
			i18n.locale = hook.language.code.toLowerCase()
		}
	}, [hook.language])

	useFocusEffect(
		React.useCallback(() => {
			hookD.cleanTop10()

			hookD.fetchUserComponent(userActivityComponent)
			hookD.fetchUserComponent(unreadArticleCount)
			hookD.fetchUserComponent(unfinishedEducationCount)
			hookD.fetchUserComponent(currentRankTop10Month)
			hookD.fetchUserComponent(achievementsCount)
			hookDd.fetchMd(language)
			if (config.appId === 2) {
				hookDd.fetchG(form)
				hookDd.fetchDocumentsDropdown()
				hookDd.fetchG(sector)
			}

			// }
			// })
		}, [])
	)

	const handleLogout = () => {
		hook.signout().then((res) => {
			hookArticle.cleanData()
			navigation.navigate("Login", { screen: "Login", params: { logout: true } })
		})
	}

	const handleUpload = (data) => {
		let formData = new FormData()
		formData.append("username", hook.username)

		formData.append("image", {
			name: "profilePic",
			type: mime.getType(data.uri),
			uri: data.uri,
		})

		// hook.refreshAccess()
		hook.updatePicture(formData).then((res) => {
			if (res !== undefined && res.status === 200) {
				hook.refreshAccess()
			}
		})
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.cancelled) {
			handleUpload(result)
		}
	}

	const downloadDocument = async () => {
		let permissions = null
		if (Platform.OS === "android") {
			permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()
			if (!permissions.granted) {
				return
			}
		}

		const split = selectedDoc.split(".")
		const extension = split[split.length - 1]
		const title = hookDd.documents.find((item) => item.doc === selectedDoc).title

		const fileName = title

		const callback = (downloadProgress) => {
			const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
		}
		const downloadResumable = FileSystem.createDownloadResumable(
			`${IMAGE_PREFIX}${selectedDoc}`,
			FileSystem.documentDirectory + `${fileName}.${extension}`,
			{},
			callback
		)

		try {
			const { uri } = await downloadResumable.downloadAsync()

			if (Platform.OS === "android") {
				const types = {
					doc: "application/msword",
					docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					xls: "application/vnd.ms-excel",
					xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					pdf: "application/pdf",
				}
				await StorageAccessFramework.createFileAsync(permissions.directoryUri, `${fileName}.${extension}`, types[extension])
					.then(async (r) => {
						const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

						await FileSystem.writeAsStringAsync(r, base64, { encoding: FileSystem.EncodingType.Base64 })
					})
					.catch((e) => {
						console.log(e, "E")
					})
			} else {
				await Sharing.shareAsync(uri)
			}
		} catch (e) {
			console.error(e)
		}
	}

	const handleArticleRedirect = () => {
		navigation.navigate("ArticlesStack", { screen: i18n.t("articlesNoUp"), params: { unread: true } })
	}

	const handleEducationRedirect = () => {
		navigation.navigate("EduStack", { screen: i18n.t("educationsNoUp"), params: { notCompleted: true } })
	}

	useEffect(() => {
		if (hookD.userActivity.length > 0) {
			let currentActivities = [...userActivities]
			currentActivities.map((item, i) =>
				hookD.userActivity.map((ele, index) => {
					if (item.title === ele.title) {
						item["color"] = ele.color
						item["resultNumber"] = ele.resultNumber
						item["resultPercent"] = ele.resultPercent
					}
				})
			)
			setUserActivities(currentActivities)
		}
	}, [hookD.userActivity])

	const selectData = {
		sectors: sectors,
	}

	const defaultValues = {
		username: hook.username,
		firstName: hook.firstName,
		lastName: hook.lastName,
		defaultCountry: defaultCountry ? defaultCountry.label : "",
		defaultCity: defaultCity ? defaultCity.label : "",
		defaultTitle: defaultTitle ? defaultTitle : "",
		defaultLanguage: hook.language ? hook.language.id : "",
		defaultPosition: defaultPosition ? defaultPosition : "",
		defaultSector: defaultSector ? defaultSector.label : "",
		bio: hook.bio,
		phoneNumber: hook.phoneNumber,
		licence: hook.licenseNumber,
	}

	const defaultValuesForms = {
		first_name: hook.firstName,
		last_name: hook.lastName,
		email: hook.email,
		mpo: defaultSector ? defaultSector.label : "",
		phone_number: hook.phoneNumber,
	}

	// console.log(defaultValuesForms, "def")
	// console.log(defaultPicture)

	return (
		<Box flex={1} bg="_bg">
			<ScrollView>
				<Container maxW="480px" alignSelf="center" width={width} p={1}>
					<HStack space={2} mb={3}>
						<TouchableOpacity onPress={() => pickImage()}>
							<Avatar
								key={`${IMAGE_PREFIX}${defaultPicture}`}
								alignSelf="center"
								size="xl"
								source={{
									uri: `${IMAGE_PREFIX}${defaultPicture}`,
								}}
							>
								{hook.firstName && hook.lastName ? `${hook.firstName.charAt(0)}${hook.lastName.charAt(0)}` : "AA"}
							</Avatar>
						</TouchableOpacity>
						<VStack space={0} alignItems="flex-start" w={width - 114}>
							<Heading fontSize="lg" color="_dark">
								{`${hook.firstName} ${hook.lastName}`}
							</Heading>
							<Button
								bg={colors.bg}
								p={0}
								variant="ghost"
								_text={{
									color: "_medium",
									fontWeight: "bold",
								}}
								defaultValues={defaultValues}
								onPress={() => navigation.navigate("UpdateProfile", { data: defaultValues })}
							>
								{i18n.t("updateData")}
							</Button>

							<HStack w="100%" space={4} justifyContent="space-between">
								<Button
									px={0}
									variant="ghost"
									_text={{
										color: "_red",
										fontWeight: "bold",
									}}
									bgOnPress={colors.red}
									onPress={handleLogout}
								>
									{i18n.t("signOut")}
								</Button>
								<Flex align="flex-end">
									<PrivacyPolicy />
								</Flex>
							</HStack>
						</VStack>
					</HStack>

					<VStack space={3} w="100%" pb="70px">
						{/* {hookD.userButtonData && (
								<> */}

						<HStack space={2}>
							<CategoryButton
								icon={ProfileNewsIcon}
								title={i18n.t("UA_NEWS_VIEWS")}
								infoText={hookD.unreadArticleCount === 0 ? i18n.t("readAllNews") : i18n.t("numberOfUnread")}
								number={hookD.unreadArticleCount === 0 ? "" : hookD.unreadArticleCount}
								onPress={() => hookD.unreadArticleCount > 0 && handleArticleRedirect()}
							/>
							<CategoryButton
								icon={ProfileTop10Icon}
								title={"Top 10"}
								infoText={i18n.t("currentRank")}
								number={hookD.currentRankTop10MonthCount}
								onPress={() => navigation.navigate("Top10")}
							/>
						</HStack>
						<HStack space={2}>
							<CategoryButton
								icon={ProfileEduIcon}
								title={i18n.t("UA_EDUCATION_VIEWS")}
								onPress={() => hookD.unfinishedEducationCount > 0 && handleEducationRedirect()}
								infoText={hookD.unfinishedEducationCount === 0 ? i18n.t("completedAllEdu") : i18n.t("numberOfNotCompleted")}
								number={hookD.unfinishedEducationCount === 0 ? "" : hookD.unfinishedEducationCount}
							/>
							<CategoryButton
								icon={ProfileAchievementsIcon}
								title={i18n.t("achievements")}
								infoText={i18n.t("numberOfAchievements")}
								number={hookD.achievementsCount}
								onPress={() => navigation.navigate("Achievements")}
							/>
						</HStack>
						{/* </>
							)} */}

						<HStack
							// space={2} for both buttons
							pb={4}
							//delete line below when put back both btns
							justifyContent="flex-end"
							w="100%"
						>
							{config.appId === 2 && (
								<Button
									w="49%"
									rounded="lg"
									bg="_medium"
									_pressed={{
										bg: "_dark",
									}}
									leftIcon={<Icon as={ProfileFormsIcon} name="form" size="sm" />}
									_text={{ fontWeight: "semibold", color: "_bg" }}
									onPress={() => setShowFormsModal(true)}
									isLoading={hookDd.loading}
								>
									{i18n.t("forms")}
								</Button>
							)}

							<Button
								ml={2}
								w="49%"
								rounded="lg"
								bg="_dark"
								_pressed={{
									bg: "_medium",
								}}
								leftIcon={<Icon as={ProfileDocsIcon} name="docs" size="sm" />}
								_text={{ fontWeight: "semibold", color: "_bg" }}
								onPress={() => setShowDocsModal(true)}
								isLoading={hookDd.loading}
							>
								{i18n.t("documents")}
							</Button>
							<ModalForms
								colors={colors}
								options={forms}
								setShowModal={setShowFormsModal}
								showModal={showFormsModal}
								key="test1"
								defaultValues={defaultValuesForms}
								selectData={selectData}
								defaultSector={defaultSector}
							/>
							<Modal
								size={"lg"}
								isOpen={showDocsModal}
								onClose={() => setShowDocsModal(false)}
								_backdrop={{
									bg: "_black",
									opacity: 0.7,
								}}
								key={"test2"}
							>
								<Modal.Content maxWidth="400px" bg="_bg">
									<Modal.CloseButton />
									<Modal.Header bg="_bg">{i18n.t("documents")}</Modal.Header>
									<Modal.Body py={8}>
										<NewSelect
											colors={colors}
											options={documents}
											placeholder={i18n.t("chooseFile")}
											selectedItem={selectedDoc}
											setSelectedItem={setSelectedDoc}
										/>
									</Modal.Body>
									<Modal.Footer w="100%" justifyContent={"flex-start"} bg="_bg">
										<Flex flexDirection="row" w="100%" justifyContent="space-between">
											<Button
												variant="red"
												bg="_red"
												_text={{
													color: "_bg",
													fontSize: "11px",
													textTransform: "uppercase",
												}}
												// colorScheme="blueGray"
												onPress={() => {
													setShowDocsModal(false)
												}}
											>
												{i18n.t("close")}
											</Button>
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
												{i18n.t("download")}
											</Button>
										</Flex>
									</Modal.Footer>
								</Modal.Content>
							</Modal>
						</HStack>
						{userActivities.map((item, index) => (
							<VisualMainBox
								key={index}
								title={i18n.t(item.title)}
								resultNumber={item.resultNumber}
								resultPercent={item.resultPercent}
								color={item.color.toLowerCase()}
								// color="green.500"
								// tooltipTitle={i18n.t(`${item.title}_TP`)}
							/>
						))}
					</VStack>
				</Container>
			</ScrollView>
		</Box>
	)
}

export default ProfileScreen

import { FontAwesome, Ionicons } from "@expo/vector-icons"
import I18n from "i18n-js"
import { AlertDialog, Box, Button, Flex, HStack, Stack, Text } from "native-base"
import { memo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Locker from "../icons/Locker"
import { formatDateWithoutTime, getTimeRemaining } from "../utils/functions"
import CustomButton from "./CustomButton"

const EduItem = (props) => {
	const { item, colors, navigation } = props
	const [isOpen, setIsOpen] = useState(false)
	const cancelRef = useRef(null)

	const onCloseLockAlert = () => setIsOpen(false)
	const handleToggleAlert = () => {
		setIsOpen(!isOpen)
	}

	const timeRemaining = getTimeRemaining(item.expiration_date)

	return (
		<>
			<Box px={2.5}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() =>
						item.locked
							? handleToggleAlert()
							: navigation.navigate("SingleEducation", {
									id: item.id,
							  })
					}
				>
					<Flex
						direction="row"
						justifyContent="space-between"
						minH="95px"
						p="7px"
						// borderColor={itemData.item.completed ? colors.dark : "none"}
						borderWidth={item.completed ? 2 : 0}
						shadow={2}
						bg={item.locked ? "#ececec" : "_bg"}
						borderRadius={"10px"}
						mt="10px"
						mx={0.5}
						mb={0.5}
					>
						<Stack w="85%" space={1}>
							<Flex align="flex-start">
								<Flex maxW="220px" bg={item.locked ? "#959595" : colors.medium} borderRadius="6px" px="4px" py={0.5}>
									<Text fontSize="10px" color={colors.bg}>
										{item.category_name}
									</Text>
								</Flex>
							</Flex>

							<HStack space={4} align="center">
								<Flex direction="row" align="center">
									<Flex justify="center">
										<Ionicons name="create-outline" size={18} color={colors.dark} />
									</Flex>
									<Text fontSize={"10px"} ml={1}>
										{formatDateWithoutTime(item.date_created)}
									</Text>
								</Flex>

								{item.expiration_date && (
									<Flex direction="row" align="center">
										<FontAwesome name="hourglass-o" size={14} color={colors.dark} />

										<Text fontSize={"10px"} ml={2}>
											{I18n.t("days")}:{" "}
											<Text fontWeight="bold" fontSize={"10px"}>
												{timeRemaining.days}
											</Text>
											{"  "}
											{I18n.t("hours")}:{" "}
											<Text fontWeight="bold" fontSize={"10px"}>
												{timeRemaining.hours}
											</Text>
										</Text>
									</Flex>
								)}
							</HStack>

							<Text textTransform="uppercase" fontSize="12px" fontWeight="bold">
								{item.name}
							</Text>
						</Stack>
						<Flex
							align="center"
							w="15%"
							minW="70px"
							justify={item.locked ? "center" : item.completed ? "flex-start" : "center"}
						>
							{item.locked ? (
								<CustomButton bg={"#ececec"} w={35} h={35} icon={"lockerIcon"} />
							) : item.completed ? (
								<CustomButton bg={colors.dark} w={35} h={35} borderRadius={7} icon={"checkIcon"} />
							) : (
								<CustomButton bg={colors.bg} w={35} h={35} icon={"arrowDark"} />
							)}
						</Flex>
					</Flex>
				</TouchableOpacity>
			</Box>
			<AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onCloseLockAlert}>
				<AlertDialog.Content>
					{/* <AlertDialog.CloseButton /> */}
					<AlertDialog.Header borderBottomWidth={0} bg="_bg">
						<Flex w="100%" align="center">
							<Locker width={24} height={24} fill={"#525252"} />
						</Flex>
					</AlertDialog.Header>
					<AlertDialog.Body px={3} bg="_bg">
						<Text textAlign="center">{I18n.t("lockedEduMessage")}</Text>
					</AlertDialog.Body>
					<AlertDialog.Footer justifyContent="center" borderTopWidth={0} bg="_bg">
						<Button bg="_medium" color="_bg" w="76px" onPress={onCloseLockAlert} ref={cancelRef}>
							OK
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</>
	)
}

function arePropsEqual(prevProps, nextProps) {
	return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item)
}

// Wrap component using `React.memo()`
export default memo(EduItem, arePropsEqual)

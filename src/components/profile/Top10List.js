import { Avatar, Box, FlatList, Flex, HStack, Spacer, Text, VStack } from "native-base"
import React from "react"
import { Dimensions, Platform } from "react-native"
import useUser from "../../redux/hooks/useUser"
import useConfig from "../../utils/config"
import { IMAGE_PREFIX } from "../../utils/constants"
import LoadingIndicator from "../LoadingIndicator"
const { width, height } = Dimensions.get("window")

const FooterUser = ({ user }) => {
	return (
		<Box bg="_medium" pl="3" pr="2" py="2" minH="110px">
			<HStack flex={1} space={3} justifyContent="space-between">
				<Avatar
					size="md"
					source={{
						uri: `${IMAGE_PREFIX}${user.image}`,
					}}
				>
					{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
				</Avatar>
				<VStack flex={1} space={0}>
					<Flex flexDirection="row" justify="space-between">
						<Text color="_bg" fontWeight="semibold">
							# {user.rank}
						</Text>
						<Text
							alignSelf="flex-start"
							color="_medium"
							fontSize="xs"
							fontWeight="semibold"
							textAlign="center"
							bg="_bg"
							rounded="md"
							overflow="hidden"
							p="2px"
							minW="40px"
						>
							{user.points}
						</Text>
					</Flex>
					<Text color="_bg" fontSize="12px">
						{`${user.username}`}
					</Text>
					<Text color="_bg" fontSize="12px">
						{`${user.first_name} ${user.last_name}`}
					</Text>
					<Spacer />
				</VStack>
			</HStack>
		</Box>
	)
}

export default function Top10List({ list, edu, loading }) {
	const username = useUser().username
	const config = useConfig()

	if (loading && list.length === 0) return <LoadingIndicator colors={config.colors} />

	return (
		<Flex
			pt={4}
			justify="space-between"
			pb="86px"
			h={edu ? (Platform.OS === "android" ? height - 100 : height - 140) : Platform.OS === "android" ? height - 24 : height - 76}
		>
			<FlatList
				data={list}
				// ListFooterComponent={FooterUser}
				renderItem={({ item, index }) => {
					if (index !== 10) {
						return (
							<Box shadow={1} rounded="lg" bg="transparent" mx={2} py="1px" px="1px" mb={1.5} key={username}>
								<Box
									rounded="lg"
									bg={index === 0 ? "_dark" : username === item.username ? "_medium" : "_bg"}
									overflow="hidden"
									pl="3"
									pr="4"
									py="2"
								>
									<HStack space={3}>
										<Avatar
											size="lg"
											source={{
												uri: `${IMAGE_PREFIX}${item.image}`,
											}}
										>
											{`${item.first_name.charAt(0)}${item.last_name.charAt(0)}`}
										</Avatar>
										<VStack flex={1} space={0}>
											<Flex flexDirection="row" justify="space-between" flex={1}>
												<Text color={index === 0 ? "_medium" : username === item.username ? "_bg" : "_red"} bold>
													{index + 1}
												</Text>

												<Text
													fontSize="xs"
													color={index === 0 ? "_dark" : "_bg"}
													alignSelf="flex-start"
													textAlign="center"
													bg={index === 0 ? "_bg" : "_dark"}
													rounded="md"
													overflow="hidden"
													p="2px"
													minW="40px"
													fontWeight={index === 0 ? "bold" : "normal"}
												>
													{item.points}
												</Text>
											</Flex>

											<Text
												color={index === 0 ? "_bg" : username === item.username ? "_bg" : "_dark"}
												fontWeight="semibold"
												fontSize="12px"
												// pb="12px"
											>
												{item.username}
											</Text>

											<Text
												color={index === 0 ? "_bg" : username === item.username ? "_bg" : "_dark"}
												fontWeight="semibold"
												fontSize="12px"
												h="20px"
											>
												{item.first_name} {item.last_name}
											</Text>
										</VStack>
										{/* <Spacer bg="red.200" /> */}
									</HStack>
								</Box>
							</Box>
						)
					}
				}}
				keyExtractor={(item) => item.username}
			/>
			{list && list.length > 10 && <FooterUser user={list[10]} />}
		</Flex>
	)
}

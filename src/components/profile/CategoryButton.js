import { Box, Flex, Heading, HStack, Icon, Pressable, Text, VStack } from "native-base"
import React from "react"
import useDashboard from "../../redux/hooks/useDashboard"

const CategoryButton = ({ icon, title, infoText, number, onPress }) => {
	const hookD = useDashboard()

	return (
		<Pressable minW="140px" w="49%" onPress={onPress}>
			{({ isPressed }) => {
				return (
					<Box
						style={{
							transform: [
								{
									scale: isPressed ? 0.96 : 1,
								},
							],
						}}
					>
						<HStack
							as="button"
							space={1}
							h="72px"
							bg={isPressed ? "_light" : "_bg"}
							rounded="lg"
							alignItems="center"
							p={1}
							shadow={3}
							minW="140px"
							w="100%"
						>
							<Flex justify="center">
								<Icon as={icon} alignSelf="center" />
							</Flex>

							<VStack space={1} alignItems="center" flex={1}>
								<Heading fontSize="18px" fontWeight="medium" lineHeight="18px">
									{title}
								</Heading>
								<Text fontSize="12px" lineHeight="12px" textAlign="center">
									{infoText}{" "}
									<Text color="_red" fontWeight="semibold" fontSize="12px" lineHeight="14px">
										{number}
									</Text>
								</Text>
							</VStack>
						</HStack>
					</Box>
				)
			}}
		</Pressable>
	)
}

export default CategoryButton

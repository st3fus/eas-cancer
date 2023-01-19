import { Box, Flex, Progress, Stack, Text } from "native-base"
import React from "react"
import { Dimensions } from "react-native"
import { SvgFromUri } from "react-native-svg"
const { width, height } = Dimensions.get("window")

const AchieveSmallBox = ({ title, result, maxPoints, iconUrl, color }) => {
	return (
		<Box shadow={1} rounded="lg" bg="transparent" py="1px" px="1px" w={width / 2 - 12}>
			<Stack space={2} rounded="lg" overflow="hidden" p="1" bg="_bg" alignItems="center">
				<Text textAlign="center" lineHeight="14px" fontSize="11px" fontWeight={500} h="40px">
					{title}
				</Text>
				<SvgFromUri uri={iconUrl} />
				<Box w="100%" position="relative">
					<Flex w="100%" alignItems="center">
						<Text fontSize="11px" lineHeight="12px" fontWeight="bold" color="_dark">
							{`${result}/${maxPoints}`}
						</Text>
					</Flex>
					<Progress
						h="20px"
						value={(result / maxPoints) * 100}
						rounded="lg"
						bg="_bg"
						borderColor="gray.200"
						borderWidth="1px"
						_filledTrack={{
							bg: `${color}`,
						}}
					/>
				</Box>
			</Stack>
		</Box>
	)
}

export default AchieveSmallBox

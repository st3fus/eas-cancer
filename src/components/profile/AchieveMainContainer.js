import { Box, Flex, Heading, Icon, Progress, Stack, Text } from "native-base"
import React from "react"
import ProfileAchievementsBigIcon from "../../icons/ProfileAchievementsBigIcon"

const AchieveMainContainer = ({ title, resultNumber, resultPercent, color }) => {
	return (
		<Box shadow={1} rounded="lg" p="1px" bg="transparent" w="100%">
			<Stack overflow="hidden" rounded="lg" bg="_bg" p={1} alignItems="center">
				<Box py={2}>
					<Icon as={ProfileAchievementsBigIcon} />
				</Box>

				<Flex flexDirection="row" justifyContent="space-between" alignItems="center" w="100%">
					<Heading fontSize="16px" fontWeight={500}>
						{title}
					</Heading>
					<Text fontSize="12px" fontWeight="bold">
						{resultNumber}
					</Text>
				</Flex>
				<Box w="100%" position="relative">
					<Flex w="100%" alignItems="center">
						<Text fontSize="12px" lineHeight="12px" fontWeight="bold" color="_dark">
							{resultPercent} %
						</Text>
					</Flex>
					<Progress
						h="20px"
						value={resultPercent}
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

export default AchieveMainContainer

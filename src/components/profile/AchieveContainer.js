import { Box, Flex, Heading, Progress, Stack, Text } from "native-base"
import React from "react"

const AchieveContainer = () => {
	return (
		<Stack>
			<Flex flexDirection="row" justifyContent="space-between" alignItems="center">
				<Heading fontSize="16px">Aktivnost</Heading>
				<Text>2/4</Text>
			</Flex>
			<Box w="100%" position="relative">
				<Flex w="100%" alignItems="center">
					<Text fontSize="12px" lineHeight="12px" fontWeight="bold" color="_dark">
						{/* {resultPercent}% */}
						50%
					</Text>
				</Flex>
				<Progress
					h="20px"
					// value={resultPercent}
					value={50}
					rounded="lg"
					bg="_bg"
					borderColor="gray.200"
					borderWidth="1px"
					_filledTrack={{
						// bg: `${color}`,
						bg: "#00d1b2",
					}}
				/>
			</Box>
		</Stack>
	)
}

export default AchieveContainer

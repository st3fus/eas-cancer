import { Flex, Heading, Stack, Text } from "native-base"
import React from "react"

const AchieveSmallBoxContainer = ({ title, resultNumber, children }) => {
	return (
		<Stack space={2} minH="190px">
			<Flex flexDirection="row" justifyContent="space-between" alignItems="center">
				<Heading fontSize="16px">{title}</Heading>
				<Text fontSize="12px" fontWeight="bold">
					{resultNumber}
				</Text>
			</Flex>
			{children}
		</Stack>
	)
}

export default AchieveSmallBoxContainer

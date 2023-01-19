import { Box, Button, Flex, HStack, Popover, Progress, Text, VStack } from "native-base"
import React from "react"

const TooltipBtn = ({ tooltipTitle }) => {
	return (
		<Popover
			placement="top left"
			trigger={(triggerProps) => {
				return (
					<Button
						bg="_dark"
						h="22px"
						py="1px"
						px="8px"
						rounded="full"
						position="relative"
						_text={{ color: "_bg", fontSize: "11px" }}
						{...triggerProps}
					>
						?
					</Button>
				)
			}}
		>
			<Popover.Content maxW="320px" accessibilityLabel="hello world" borderRadius={"xl"}>
				<Popover.Arrow bg="_dark" ml={2} />
				<Popover.CloseButton />
				{/* <Popover.Header>Info</Popover.Header> */}
				<Popover.Body bg="_dark" _text={{ color: "_bg" }}>
					{tooltipTitle}
				</Popover.Body>
			</Popover.Content>
		</Popover>
	)
}

const VisualMainBox = ({ title, resultNumber, color, resultPercent, tooltipTitle }) => {
	// const toast = useToast()
	// const id = "toastId-toPreventDuplicate"
	return (
		<VStack w="100%" shadow={3} bg="_bg" h="86px" rounded="lg" p="6px" space={1} justifyContent="center">
			<Flex direction="row" w="100%" justifyContent="space-between">
				<HStack space={3} alignItems="center">
					<Text color="_dark" fontWeight="semibold" lineHeight="14px">
						{title}
					</Text>

					{/* <TooltipBtn tooltipTitle={tooltipTitle} /> */}
				</HStack>

				<Text color="_dark" fontSize="12px" lineHeight="12px" fontWeight="bold">
					{resultNumber}
				</Text>
			</Flex>
			<Box w="100%" position="relative">
				<Flex w="100%" alignItems="center">
					<Text fontSize="12px" lineHeight="12px" fontWeight="bold" color="_dark">
						{resultPercent}%
					</Text>
				</Flex>
				<Progress
					h="24px"
					value={resultPercent}
					rounded="lg"
					bg="_bg"
					borderColor="gray.200"
					borderWidth="1px"
					_filledTrack={{
						bg: `${color}`,
					}}
				></Progress>
			</Box>
		</VStack>
	)
}

export default VisualMainBox

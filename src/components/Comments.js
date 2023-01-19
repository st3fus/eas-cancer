import i18n from "i18n-js"
import { Box, Flex, Stack, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import CustomInput from "../components/CustomInput"
import useArticle from "../redux/hooks/useArticle"
import { formatDateForCell } from "../utils/functions"
import CustomButton from "./CustomButton"

const Comments = ({ comments, colors }) => {
	const { handleSubmit, control, reset } = useForm()

	const [disabledButton, setDisabledButton] = useState(false)
	const [reqMessage, setReqMessage] = useState(null)

	const hook = useArticle()

	useEffect(() => {
		if (hook.message) {
			setReqMessage(hook.message)
		} else {
			setReqMessage(null)
		}
	}, [hook.message])

	const submit = (data) => {
		setDisabledButton(true)

		hook.postComment(hook.detail.id, data.comment).then((res) => {
			if (res !== undefined && res.status === 200) {
				hook.fetchOne(hook.detail.unique_url)
				reset()
				setDisabledButton(false)
			}
		})
	}

	return (
		<Box mt="20px" pb="60px">
			{comments && (
				<>
					<Text textAlign="center" fontSize="14px" color={colors.dark} letterSpacing={0.5} my={1.5}>
						{i18n.t("comments")}
					</Text>

					{comments.map((comment, index) => {
						return (
							<Box key={index}>
								<Text fontSize="10px" letterSpacing={0.5} color={colors.dark} textAlign="right" mt="10px" mr="8px" mb={0.5}>
									{formatDateForCell(comment.date_created)}
								</Text>
								<Box w="100%" bg={colors.dark} borderRadius="19px" py="10px" px="5px">
									<Text fontSize="14px" color={colors.bg} letterSpacing={0.5} mb="8px">
										{comment.username}
									</Text>
									<Flex direction="row">
										<Box width={0.25} borderRadius={0.25} minH={5} h="60%" bg={colors.bg} ml={2.5}></Box>
										<Text color={colors.bg} ml="10px" fontSize="11px" pr="14px">
											{comment.comment}
										</Text>
									</Flex>
								</Box>
							</Box>
						)
					})}
				</>
			)}
			<Stack space={2}>
				<Text letterSpacing={0.5} color={colors.dark} fontSize="13px" mt="20px" mb={0.5}>
					{i18n.t("leaveComment")}
				</Text>
				<Controller
					control={control}
					render={({ onChange, value }) => (
						<CustomInput
							onChangeText={(value) => onChange(value)}
							value={value}
							placeholder={i18n.t("commentPlaceholder")}
							labelColor={colors.bg}
							color={colors.dark}
							multiline={true}
							totalLines={6}
							maxLength={300}
							textArea
						/>
					)}
					name={"comment"}
					rules={{ required: true }}
					defaultValue={null}
				/>
				{reqMessage && (
					<Text
						letterSpacing={0.5}
						color={reqMessage.type === "success" ? colors.dark : colors.red}
						fontSize="13px"
						mt="20px"
						mb={0.5}
					>
						{reqMessage.text}
					</Text>
				)}
				<Flex align="flex-end" mt="30px">
					<CustomButton
						bg={colors.medium}
						text={i18n.t("confirm")}
						icon={"arrow"}
						onPress={handleSubmit(submit)}
						disabled={disabledButton}
					/>
				</Flex>
			</Stack>
		</Box>
	)
}

export default Comments

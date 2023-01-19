import { Box, Flex, Image, Text } from "native-base"
import { memo } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Comment from "../icons/Comment"
import Like from "../icons/Like"
import { IMAGE_PREFIX } from "../utils/constants"

function ArticleItem(props) {
	const { item, width, colors, navigation } = props
	// const width = props.width
	// const colors = props.color

	return (
		<Box px={3}>
			<Box
				maxW={{
					base: "100%",
					md: "50%",
				}}
				w={width}
				p={2}
				shadow={3}
				borderRadius={4}
				background={colors.bg}
				my={2}
				// mx={4}
			>
				<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("ArticleDetail", { id: item.unique_url })}>
					<Flex align="center">
						<Image
							source={{
								uri: `${IMAGE_PREFIX}${item.image}`,
							}}
							alt="alt"
							w="100%"
							resizeMode="contain"
							height={width > 600 ? width / 1.75 : width / 1.75}
						/>
					</Flex>
					<Text textAlign="left" my={2} color={colors.dark} fontSize={"md"} numberOfLines={2} lineHeight="xs">
						{item.title}
					</Text>
					<Box h={60}>
						<Text color={colors.dark} numberOfLines={2} lineHeight="xs">
							{item.summary_text}
						</Text>
					</Box>
				</TouchableOpacity>
				<Flex direction="row" h={37} justify="space-between">
					<Flex direction="row">
						<Flex h={37} width={37} background={colors.medium} borderRadius={12} mx={3} justify="center" align="center">
							<Like height={18} width={18} fill={item.reacted ? colors.black : colors.bg} />
							<Flex
								position="absolute"
								minW={"20px"}
								maxW={"30px"}
								h={"20px"}
								borderRadius="full"
								top={-8}
								right={-8}
								background={colors.dark}
								justifyContent="center"
								align="center"
							>
								<Text color={colors.bg} fontSize={8} px={0.25}>
									{item.reactions_count}
								</Text>
							</Flex>
						</Flex>
						<Flex h={37} width={37} background={colors.medium} borderRadius={12} mx={3} justify="center" align="center">
							<Comment height={18} width={18} fill={colors.bg} />

							<Flex
								position="absolute"
								w={"20px"}
								h={"20px"}
								borderRadius="full"
								top={-8}
								right={-8}
								background={colors.dark}
								justifyContent="center"
								align="center"
							>
								<Text color={colors.bg} fontSize={8}>
									{item.comments_count}
								</Text>
							</Flex>
						</Flex>
					</Flex>
					<Flex justify="space-between">
						{item.category_name && (
							<Text
								color={colors.bg}
								bg={colors.medium}
								maxW={190}
								isTruncated
								borderRadius={4}
								px={1}
								py={0.25}
								fontSize={9}
							>
								{item.category_name}
							</Text>
						)}

						<Text color={colors.medium} fontSize={9} textAlign="right">
							{new Date(item.date_created).toLocaleDateString("en-GB")}
						</Text>
					</Flex>
				</Flex>
			</Box>
		</Box>
	)
}

function arePropsEqual(prevProps, nextProps) {
	return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item)
}

// Wrap component using `React.memo()`
export default memo(ArticleItem, arePropsEqual)

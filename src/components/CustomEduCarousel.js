import I18n from "i18n-js"
import { AspectRatio, Box, Text, WarningIcon } from "native-base"
import { useCallback, useRef, useState } from "react"
import { Image, StyleSheet } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { IMAGE_PREFIX } from "../utils/constants"
import CustomButton from "./CustomButton"
import CustomWebView from "./CustomWebView"

const CustomEduCarousel = ({ isPortrait, colors, carouselItems, window, currentTest, currentEdu, handleStart, height }) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const carouselRef = useRef(null)

	const renderItem = useCallback(
		({ item, index }) => (
			<Box flex={1}>
				<AspectRatio ratio={16 / 9}>
					<Image
						rounded={4}
						width="100%"
						source={{ uri: `${IMAGE_PREFIX}${item.image}` }}
						alt="image"
						resizeMode={"contain"}
						mt={0.5}
					/>
				</AspectRatio>

				<CustomWebView colors={colors} content={item.text} width="100%" />
			</Box>
		),
		[]
	)

	const checkIsLastIndex = () => {
		return activeIndex === carouselItems.length - 1
	}

	const styles = StyleSheet.create({
		goToTestBtn: {
			height: 46,
			width: 190,
			backgroundColor: colors.medium,
			borderRadius: 16,
			marginLeft: 4,
		},
	})

	return (
		<>
			<Carousel
				layout="stack"
				// onLayout={onLayout}
				// layoutCardOffset={0}
				// activeSlideOffset={0}
				activeIndex={activeIndex}
				animatedDuration={250}
				animatedTension={250}
				extraData={!isPortrait}
				ref={carouselRef}
				data={carouselItems}
				slideStyle={{
					height: isPortrait ? window.height - 300 : window.height - 120,
					width: isPortrait ? window.width - 12 : height * 0.9,
					borderWidth: 1.5,
					borderColor: colors.medium,
					backgroundColor: colors.bg,
					borderRadius: 8,
					padding: 2,
				}}
				sliderWidth={isPortrait ? window.width - 12 : height * 0.9}
				sliderHeight={isPortrait ? window.height - 300 : 200}
				itemWidth={isPortrait ? window.width - 12 : height * 0.9}
				renderItem={renderItem}
				onSnapToItem={(index) => setActiveIndex(index)}
			/>

			<Pagination
				dotsLength={carouselItems.length}
				activeDotIndex={activeIndex}
				carouselRef={carouselRef}
				animatedDuration={200}
				tappableDots={!!carouselRef}
				animatedTension={10}
				containerStyle={{
					backgroundColor: colors.bg,
					paddingHorizontal: 4,
					marginTop: 0,
					flexWrap: "wrap",
					paddingBottom: 8,
					paddingTop: 14,
					display: isPortrait ? "flex" : "none",
					marginBottom: 20,
				}}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					marginHorizontal: 6,
					marginVertical: 8,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: colors.dark,
				}}
				inactiveDotStyle={{
					borderColor: colors.medium,
					// Define styles for inactive dots here
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.7}
			/>
			{checkIsLastIndex() ? (
				<Box mb={2}>
					{currentTest && !currentTest.test.user_allowed_test ? (
						<Box flexDir="row" alignItems="center" justifyContent="center" w={300} mb={1} bg="red.100" rounded={4}>
							<WarningIcon width={20} height={20} fill={colors.red} />
							<Text
								textAlign="center"
								ml={2}
								color={colors.red}
								fontWeight="bold"
								textTransform="uppercase"
								fontSize={13}
								maxW={240}
							>
								{I18n.t("maxTimes")}
							</Text>
						</Box>
					) : currentTest && currentTest.test.user_allowed_test ? (
						<CustomButton
							icon="arrow"
							bg={colors.medium}
							text={I18n.t("startTest")}
							style={styles.goToTestBtn}
							onPress={() => handleStart()}
						/>
					) : (
						<Text fontSize={16} textAlign="center">
							{I18n.t("noTest")}
						</Text>
					)}
				</Box>
			) : (
				<Box alignItems="center" mb={2}>
					{currentEdu && currentEdu.education.company && (
						<Box
							justifyContent="center"
							alignItems="center"
							w={155}
							// h={100}
							// borderWidth={Platform.OS === "android" ? 0 : 0.5}
							borderWidth={0.5}
							borderColor={colors.medium}
							borderRadius={15}
							shadow={5}
							marginBottom={2}
						>
							{currentEdu.education.company_name && (
								<Text textAlign="center" mb={4} fontSize={12}>
									{`${I18n.t("educationByCompany")} ${currentEdu.education.company_name}`}
								</Text>
							)}
							{currentEdu.education.company_image && (
								<Image
									width={90}
									h={58}
									resizeMode="contain"
									rounded={4}
									source={{
										uri: `${IMAGE_PREFIX}${currentEdu.education.company_image}`,
									}}
								/>
							)}
						</Box>
					)}
				</Box>
			)}
		</>
	)
}

export default CustomEduCarousel

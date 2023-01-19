import i18n from "i18n-js"
import { HStack, ScrollView, Stack } from "native-base"
import React, { useEffect } from "react"
import LoadingIndicator from "../components/LoadingIndicator"
import AchieveMainContainer from "../components/profile/AchieveMainContainer"
import AchieveSmallBox from "../components/profile/AchieveSmallBox"
import AchieveSmallBoxContainer from "../components/profile/AchieveSmallBoxContainer"
import useDashboard from "../redux/hooks/useDashboard"
import useConfig from "../utils/config"
import { IMAGE_PREFIX, userAchievements } from "../utils/constants"

export default function ProfileAchievementsScreen() {
	const hookD = useDashboard()
	const config = useConfig()
	const achievements = hookD.userAchievements

	useEffect(() => {
		hookD.fetchUserComponent(userAchievements)
	}, [])

	if (!achievements) return <LoadingIndicator colors={config.colors} />

	return (
		<ScrollView>
			<Stack space={6} flex={1} bg="_bg" px={2} pt={4} pb="60px">
				<Stack alignItems="center" space={2}>
					<AchieveMainContainer
						title={i18n.t("numberOfAchievements")}
						resultNumber={`${achievements["total_completed"]}/${achievements["total_count"]}`}
						resultPercent={achievements["percent_completed"]}
						color="green.500"
					/>
				</Stack>
				{achievements.achievements_data.map((item, i) => {
					return (
						<AchieveSmallBoxContainer title={i18n.t(`${item.category_code}`)} resultNumber={`${item.completed}/${item.total}`}>
							<HStack w="100%" space={2}>
								{item.data.map((child, index) => {
									return (
										<AchieveSmallBox
											key={`${child.group_code}${index}`}
											title={`${child.max_points} ${i18n.t(`${child.group_code}`)}`}
											iconUrl={IMAGE_PREFIX + child.image}
											result={child.result}
											maxPoints={child.max_points}
											color="green.500"
										/>
									)
								})}
							</HStack>
						</AchieveSmallBoxContainer>
					)
				})}
			</Stack>
		</ScrollView>
	)
}

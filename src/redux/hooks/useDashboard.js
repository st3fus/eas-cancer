import { useDispatch, useSelector } from "react-redux"
import { cleanTop10Lists, fetchUserComponentData } from "../reducers/dashboardReducer"

export default function useDashboard() {
	const dispatch = useDispatch()
	const message = useSelector((state) => state.dashboard.message)
	const loading = useSelector((state) => state.dashboard.loading)
	const loadingTop10Month = useSelector((state) => state.dashboard.loadingTop10Month)
	const loadingTop10Year = useSelector((state) => state.dashboard.loadingTop10Year)
	const loadingTop10Edu = useSelector((state) => state.dashboard.loadingTop10Edu)
	const userActivity = useSelector((state) => state.dashboard.userActivity)
	const unreadArticleCount = useSelector((state) => state.dashboard.unreadArticleCount)
	const unfinishedEducationCount = useSelector((state) => state.dashboard.unfinishedEducationCount)
	const currentRankTop10MonthCount = useSelector((state) => state.dashboard.currentRankTop10MonthCount)
	const achievementsCount = useSelector((state) => state.dashboard.achievementsCount)
	const userAchievements = useSelector((state) => state.dashboard.userAchievements)
	const topListMonth = useSelector((state) => state.dashboard.topListMonth)
	const topListYear = useSelector((state) => state.dashboard.topListYear)
	const topListEducation = useSelector((state) => state.dashboard.topListEducation)

	const fetchUserComponent = async (type, edu) => {
		return dispatch(fetchUserComponentData(type, edu))
	}

	const cleanTop10 = async () => {
		return dispatch(cleanTop10Lists())
	}

	return {
		loading,
		message,
		userActivity,
		unreadArticleCount,
		unfinishedEducationCount,
		currentRankTop10MonthCount,
		achievementsCount,
		userAchievements,
		topListMonth,
		topListYear,
		topListEducation,
		loadingTop10Month,
		loadingTop10Year,
		loadingTop10Edu,
		fetchUserComponent,
		cleanTop10,
	}
}

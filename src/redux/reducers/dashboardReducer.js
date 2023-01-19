import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import {
	achievementsCount,
	currentRankTop10Month,
	top10Education,
	top10Month,
	top10Year,
	unfinishedEducationCount,
	unreadArticleCount,
	userAchievements,
	userActivityComponent,
} from "../../utils/constants"
import { reportsComponentUrl } from "../api_urls"

const START_REQUEST = createAction("DASHBOARD/START_REQUEST")
const FETCH_USER_COMPONENT = createAction("DASHBOARD/FETCH_USER_COMPONENT")
const REQUEST_FAIL = createAction("DASHBOARD/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("DASHBOARD/CLEAN_MESSAGE")
const CLEAN_TOP10 = createAction("DASHBOARD/CLEAN_TOP10")

export const fetchUserComponentData = (type, education) => async (dispatch) => {
	dispatch(START_REQUEST(type))

	let url = reportsComponentUrl(type)
	if (education) {
		url = url + `&education_id=${education}`
	}

	return axios.get(url).then((res) => handleResponse(res, dispatch, FETCH_USER_COMPONENT, REQUEST_FAIL, type))
}

export const cleanTop10Lists = () => async (dispatch) => {
	dispatch(CLEAN_TOP10())
}

const handleResponse = (res, dispatch, success, fail, type) => {
	if (res !== undefined) {
		if (res.status >= 200 && res.status <= 299) {
			dispatch(success({ data: res.data, type: type }))
			return res
		} else if (res.response !== undefined) {
			if (res.response.status === 400) {
				dispatch(fail(res.response.data.message))
				dispatch(CLEAN_MESSAGE())
			} else {
				dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
				dispatch(CLEAN_MESSAGE())
			}
			return res.response
		} else {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
			dispatch(CLEAN_MESSAGE())
		}
	} else {
		dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		dispatch(CLEAN_MESSAGE())
	}
}

const initState = {
	userActivity: [],
	unreadArticleCount: "",
	unfinishedEducationCount: "",
	currentRankTop10MonthCount: "",
	achievementsCount: "",
	userAchievements: null,
	topListMonth: [],
	topListYear: [],
	topListEducation: [],
	message: null,
	loading: false,
	loadingTop10Month: false,
	loadingTop10Year: false,
	loadingTop10Edu: false,
}

export const dashboardReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			if (action.payload === top10Month) {
				state.loadingTop10Month = true
			} else if (action.payload === top10Year) {
				state.loadingTop10Year = true
			} else if (action.payload === top10Education) {
				state.loadingTop10Edu = true
			} else {
				state.loading = true
			}
			state.message = null
		})
		.addCase(FETCH_USER_COMPONENT, (state, action) => {
			if (action.payload.type === top10Month) {
				state.loadingTop10Month = false
			} else if (action.payload.type === top10Year) {
				state.loadingTop10Year = false
			} else if (action.payload.type === top10Education) {
				state.loadingTop10Edu = false
			} else {
				state.loading = false
			}

			if (action.payload.type === userActivityComponent) {
				state.userActivity = action.payload.data
			} else if (action.payload.type === userAchievements) {
				state.userAchievements = action.payload.data
			} else if (action.payload.type === top10Month) {
				state.topListMonth = action.payload.data
			} else if (action.payload.type === top10Year) {
				state.topListYear = action.payload.data
			} else if (action.payload.type === top10Education) {
				state.topListEducation = action.payload.data
			} else if (action.payload.type === unreadArticleCount) {
				state.unreadArticleCount = action.payload.data.unread_article_count
			} else if (action.payload.type === unfinishedEducationCount) {
				state.unfinishedEducationCount = action.payload.data.unfinished_education_count
			} else if (action.payload.type === currentRankTop10Month) {
				state.currentRankTop10MonthCount = action.payload.data.current_rank_top_10_month
			} else if (action.payload.type === achievementsCount) {
				state.achievementsCount = action.payload.data.achievements_count
			}
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.message = null
		})
		.addCase(CLEAN_TOP10, (state, action) => {
			state.topListEducation = []
		})
})

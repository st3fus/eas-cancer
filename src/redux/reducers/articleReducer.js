import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import { articlePageURL, articleSingleURL, commentsURL, reactionURL, submitReportURL, surveyURL } from "../api_urls"

const START_REQUEST = createAction("ARTICLE/START_REQUEST")
const START_SECOND = createAction("ARTICLE/START_SECOND")
const FETCH_SUCCESS = createAction("ARTICLE/FETCH_SUCCESS")
const FETCH_ONE = createAction("ARTICLE/FETCH_ONE")
const REQUEST_SUCCESS = createAction("ARTICLE/REQUEST_SUCCESS")
const REQUEST_FAIL = createAction("ARTICLE/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("ARTICLE/CLEAN_MESSAGE")
const CLEAN_DETAIL = createAction("ARTICLE/CLEAN_DETAIL")
const CLEAN_DATA = createAction("ARTICLE/CLEAN_DATA")
const SET_UNREAD = createAction("ARTICLE/SET_UNREAD")
const SUBMIT_SUCCESS = createAction("ARTICLE/SUBMIT_SUCCESS")

export const fetchArticlePage = (perPage, pageNumber, filterData, firstLoading, secondLoading) => async (dispatch) => {
	if (firstLoading) {
		dispatch(START_REQUEST())
	}

	if (secondLoading) {
		dispatch(START_SECOND())
	}
	let filterUrl = articlePageURL(perPage, pageNumber)

	if (filterData) {
		if (filterData.title) {
			filterUrl = filterUrl + `&title=${filterData.title}`
		}

		if (filterData.category) {
			filterUrl = filterUrl + `&category=${filterData.category}`
		}

		if (filterData.unread) {
			filterUrl = filterUrl + `&viewed=True`
		}
	}

	return axios.get(filterUrl).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS, REQUEST_FAIL))
}

export const fetchArticle = (id, loading) => async (dispatch) => {
	if (loading) {
		dispatch(START_REQUEST())
	}
	return axios.get(articleSingleURL(id)).then((res) => handleResponse(res, dispatch, FETCH_ONE, REQUEST_FAIL))
}

export const cleanArticle = () => async (dispatch) => {
	dispatch(CLEAN_DETAIL())
}

export const cleanMessage = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

export const emptyData = () => async (dispatch) => {
	dispatch(CLEAN_DATA())
}

export const sendReaction = (payload) => async (dispatch) => {
	// dispatch(START_REQUEST())
	return axios.post(reactionURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const sendComment = (payload) => async (dispatch) => {
	// dispatch(START_REQUEST())
	return axios.post(commentsURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const sendSurvey = (payload) => async (dispatch) => {
	// dispatch(START_REQUEST())
	return axios.post(surveyURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const sendArticleReport = (payload) => async (dispatch) => {
	// dispatch(START_REQUEST())
	return axios
		.post(submitReportURL, payload)
		.then((res) => handleResponse(res, dispatch, SUBMIT_SUCCESS, REQUEST_FAIL))
		.catch((error) => handleError(error, dispatch, REQUEST_FAIL))
}

export const setArticlesUnread = (payload) => async (dispatch) => {
	// dispatch(START_REQUEST())
	dispatch(SET_UNREAD(payload))
}

const handleResponse = (res, dispatch, success, fail) => {
	if (res !== undefined) {
		if (res.status >= 200 && res.status <= 299) {
			if (success === SUBMIT_SUCCESS) {
				dispatch(success(res.data.message))
				dispatch(CLEAN_MESSAGE())
			} else if (success === REQUEST_SUCCESS) {
				dispatch(success(res.data.message))
			} else {
				dispatch(success(res.data))
			}
			return res
		} else if (res.response !== undefined && res.response.status >= 400 && res.response.status <= 499) {
			dispatch(fail(res.response.data.message))
			// dispatch(CLEAN_MESSAGE())
		} else {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
			// dispatch(CLEAN_MESSAGE())
		}
	} else {
		dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		// dispatch(CLEAN_MESSAGE())
	}
}

const handleError = (error, dispatch, fail) => {
	if (error.response) {
		if (error.response.status === 500) {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		} else if (error.response.status === 400) {
			dispatch(fail(error.response.data.message))
		} else {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		}
	} else {
		dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
	}

	// dispatch(CLEAN_MESSAGE())
	return error
}

const initState = {
	data: [],
	pagination: null,
	detail: null,
	defaultSize: 10,
	message: null,
	loading: false,
	secondLoading: false,
	stopFetching: false,
	unread: false,
}

export const articleReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			state.loading = true
			state.message = null
		})
		.addCase(START_SECOND, (state, action) => {
			state.secondLoading = true
			state.message = null
		})
		.addCase(FETCH_SUCCESS, (state, action) => {
			state.loading = false
			state.secondLoading = false
			if (!state.data) {
				state.data = action.payload.articles
			} else {
				state.data = state.data.concat(action.payload.articles)
			}
			if (action.payload.articles.length > 0) {
				state.pagination = action.payload.pagination
				state.stopFetching = false
			} else {
				state.message = { text: i18n.t("noMoreMessage"), type: "info" }
				state.stopFetching = true
			}
		})
		.addCase(FETCH_ONE, (state, action) => {
			state.loading = false
			state.detail = action.payload
		})
		.addCase(REQUEST_SUCCESS, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(SUBMIT_SUCCESS, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.secondLoading = false
			state.message = action.payload
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.message = null
		})
		.addCase(CLEAN_DETAIL, (state, action) => {
			state.detail = null
		})
		.addCase(CLEAN_DATA, (state, action) => {
			state.data = []
		})
		.addCase(SET_UNREAD, (state, action) => {
			state.unread = action.payload
		})
})

import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import { educationPageURL, educationSingleURL, educationsNewEmployeeURL } from "../api_urls"

const START_REQUEST = createAction("EDUCATION/START_REQUEST")
const START_SECOND = createAction("EDUCATION/START_SECOND")
const FETCH_SUCCESS = createAction("EDUCATION/FETCH_SUCCESS")
const FETCH_SUCCESS_SEARCH = createAction("EDUCATION/FETCH_SUCCESS_SEARCH")
const FETCH_SUCCESS_NEW_EMPLOYEE = createAction("EDUCATION/FETCH_SUCCESS_NEW_EMPLOYEE")
const FETCH_ONE = createAction("EDUCATION/FETCH_ONE")
const REQUEST_FAIL = createAction("EDUCATION/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("EDUCATION/CLEAN_MESSAGE")
const CLEAN_DETAIL = createAction("EDUCATION/CLEAN_DETAIL")
const CLEAN_DATA = createAction("EDUCATION/CLEAN_DATA")
const CHANGE_SIZE = createAction("EDUCATION/CHANGE_SIZE")
const IS_PORTRAIT = createAction("EDUCATION/IS_PORTRAIT")

export const fetchEducationPage = (perPage, pageNumber, firstLoading, secondLoading) => async (dispatch) => {
	if (firstLoading) {
		dispatch(START_REQUEST())
	}

	if (secondLoading) {
		dispatch(START_SECOND())
	}
	return axios.get(educationPageURL(perPage, pageNumber)).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS, REQUEST_FAIL))
}

export const fetchNewEmployeesEdu = () => async (dispatch) => {
	dispatch(START_REQUEST())

	return axios.get(educationsNewEmployeeURL).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS_NEW_EMPLOYEE, REQUEST_FAIL))
}

export const searchEducationPage = (perPage, pageNumber, filterData) => async (dispatch) => {
	dispatch(START_REQUEST())
	let filterUrl = educationPageURL(perPage, pageNumber)

	if (filterData) {
		if (filterData.name) {
			filterUrl = filterUrl + `&name=${filterData.name}`
		}

		if (filterData.category) {
			filterUrl = filterUrl + `&category=${filterData.category}`
		}

		if (filterData.notCompleted) {
			filterUrl = filterUrl + "&completed=True"
		}
	}

	return axios.get(filterUrl).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS_SEARCH, REQUEST_FAIL))
}

export const fetchEducation = (id) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.get(educationSingleURL(id)).then((res) => handleResponse(res, dispatch, FETCH_ONE, REQUEST_FAIL))
}

export const cleanMessage = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

export const emptyData = () => async (dispatch) => {
	dispatch(CLEAN_DATA())
}

export const cleanEducation = () => async (dispatch) => {
	dispatch(CLEAN_DETAIL())
}

export const changeDefaultSize = (size) => async (dispatch) => {
	dispatch(CHANGE_SIZE(size))
}

export const toggleIsPortrait = (bool) => async (dispatch) => {
	dispatch(IS_PORTRAIT(bool))
}

const handleResponse = (res, dispatch, success, fail) => {
	if (res !== undefined) {
		if (res.status >= 200 && res.status <= 299) {
			dispatch(success(res.data))
			return res
		} else if (res.response !== undefined && res.response.status >= 400 && res.response.status <= 499) {
			dispatch(fail(res.response.data.message))
			dispatch(CLEAN_MESSAGE())
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
	data: [],
	newEmployeeData: [],
	pagination: null,
	detail: null,
	defaultSize: 10,
	message: null,
	loading: false,
	isPortrait: true,
	secondLoading: false,
	stopFetching: false,
}

export const educationReducer = createReducer(initState, (builder) => {
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
				state.data = action.payload.educations
			} else {
				state.data = state.data.concat(action.payload.educations)
			}
			if (action.payload.educations.length > 0) {
				state.pagination = action.payload.pagination
				state.stopFetching = false
			} else {
				state.message = { text: i18n.t("noMoreMessage"), type: "info" }
				state.stopFetching = true
			}
		})
		.addCase(FETCH_SUCCESS_NEW_EMPLOYEE, (state, action) => {
			state.loading = false
			state.newEmployeeData = action.payload.educations
		})
		.addCase(FETCH_SUCCESS_SEARCH, (state, action) => {
			state.loading = false
			state.data = action.payload.educations
			state.pagination = action.payload.pagination
		})
		.addCase(FETCH_ONE, (state, action) => {
			state.loading = false
			state.detail = action.payload
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
		.addCase(CHANGE_SIZE, (state, action) => {
			state.defaultSize = action.payload
		})
		.addCase(IS_PORTRAIT, (state, action) => {
			state.isPortrait = action.payload
		})
		.addCase(CLEAN_DATA, (state, action) => {
			state.data = []
		})
})

import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import {
	articleCategory,
	city,
	country,
	education,
	educationCategory,
	form,
	language,
	position,
	sector,
	title,
} from "../../utils/constants"
import { documentsUrl, formSubmissionURL, genericURL, masterdataURL, publicMasterdataURL, reportsUrl } from "../api_urls"

const START_REQUEST = createAction("DD/START_REQUEST")
const FETCH_PUBLIC_SUCCESS = createAction("DD/FETCH_PUBLIC_SUCCESS")
const FETCH_DOCUMENTS_DROPDOWN = createAction("DD/FETCH_DOCUMENTS_DROPDOWN")
const REQUEST_SUCCESS = createAction("DD/REQUEST_SUCCESS")
const FETCH_SUCCESS = createAction("DD/FETCH_SUCCESS")
const REQUEST_FAIL = createAction("DD/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("DD/CLEAN_MESSAGE")

export const fetchPublicMasterdata = () => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.get(publicMasterdataURL).then((res) => handleResponse(res, dispatch, FETCH_PUBLIC_SUCCESS, REQUEST_FAIL))
}

export const fetchMasterData = (type) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.get(masterdataURL(type)).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS, REQUEST_FAIL, type))
}

export const fetchGeneric = (type, userView) => async (dispatch) => {
	dispatch(START_REQUEST())
	let url = genericURL(type)
	if (userView) {
		url = url + "&user_view=True"
	}

	return axios.get(url).then((res) => handleResponse(res, dispatch, FETCH_SUCCESS, REQUEST_FAIL, type))
}

export const createReportUser = () => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.get(reportsUrl).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const fetchDocumentsFilesDropdown = () => async (dispatch) => {
	const url = documentsUrl + "?dropdown_data=True"
	return axios.get(url).then((res) => handleResponse(res, dispatch, FETCH_DOCUMENTS_DROPDOWN, REQUEST_FAIL))
}

export const submitFormSubmission = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios
		.post(formSubmissionURL, payload)
		.then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
		.catch((err) => {
			dispatch(REQUEST_FAIL({ text: i18n.t("allFieldsRequired"), type: "error" }))
		})
}

export const clean = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

const handleResponse = (res, dispatch, success, fail, type) => {
	if (res !== undefined) {
		// console.log(res, "Res")
		if (res.status >= 200 && res.status <= 299) {
			if (success === FETCH_SUCCESS) {
				dispatch(success({ data: res.data, type: type }))
			} else {
				dispatch(success(res.data))
			}
			return res
		}
		// else if (res.response !== undefined && res.response.status >= 400 && res.response.status <= 499) {
		// 	// console.log("upao error")
		// 	dispatch(fail(res.response.data.message))
		// 	dispatch(CLEAN_MESSAGE())
		// } else {
		// 	// console.log("upao else error")
		// 	dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		// 	dispatch(CLEAN_MESSAGE())
		// }
	}
	// else {
	// // console.log("else else")
	// 	dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
	// 	dispatch(CLEAN_MESSAGE())
	// }
}

const initState = {
	titles: [],
	positions: [],
	countries: [],
	cities: [],
	languages: [],
	companies: [],
	articleCategories: [],
	educationCategories: [],
	educations: [],
	documents: [],
	forms: [],
	sectors: [],
	message: null,
	loading: false,
}

export const dropdownDataReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			state.loading = true
			state.message = null
		})
		.addCase(FETCH_PUBLIC_SUCCESS, (state, action) => {
			state.loading = false
			state.cities = action.payload.cities
			state.countries = action.payload.countries
			state.positions = action.payload.positions
			state.titles = action.payload.titles
			state.companies = action.payload.companies
		})
		.addCase(FETCH_SUCCESS, (state, action) => {
			state.loading = false
			if (action.payload.type === title) {
				state.titles = action.payload.data
			} else if (action.payload.type === position) {
				state.positions = action.payload.data
			} else if (action.payload.type === country) {
				state.countries = action.payload.data
			} else if (action.payload.type === language) {
				state.languages = action.payload.data
			} else if (action.payload.type === city) {
				state.cities = action.payload.data
			} else if (action.payload.type === articleCategory) {
				state.articleCategories = action.payload.data
			} else if (action.payload.type === education) {
				state.educations = action.payload.data
			} else if (action.payload.type === form) {
				state.forms = action.payload.data
			} else if (action.payload.type === sector) {
				state.sectors = action.payload.data
			} else if (action.payload.type === educationCategory) {
				state.educationCategories = action.payload.data
			}
		})
		.addCase(REQUEST_SUCCESS, (state, action) => {
			state.loading = false
			state.message = null
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.message = null
		})
		.addCase(FETCH_DOCUMENTS_DROPDOWN, (state, action) => {
			state.loading = false
			state.documents = action.payload.docs
		})
})

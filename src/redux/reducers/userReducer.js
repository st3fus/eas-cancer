import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import jwtDecode from "jwt-decode"
// import * as Sentry from "sentry-expo"
import { appName } from "../../utils/constants"
import { clearStorage, saveData } from "../../utils/functions"
import { forgotPasswordURL, loginURL, logoutURL, refreshTokenURL, registerURL, updateProfileURL } from "../api_urls"

const START_REQUEST = createAction("USER/START_REQUEST")
const LOGIN_SUCCESS = createAction("USER/LOGIN_SUCCESS")
const REQUEST_FAIL = createAction("USER/REQUEST_FAIL")
const REQUEST_SUCCESS = createAction("USER/UPDATE_PROFILE")
const REFRESH_SUCCESS = createAction("USER/REFRESH_SUCCESS")
const LOGOUT = createAction("USER/LOGOUT")
const CLEAN_MESSAGE = createAction("USER/CLEAN_MESSAGE")

export const login = (data) => async (dispatch) => {
	dispatch(START_REQUEST())
	// Sentry.Native.captureMessage("started login")
	return axios
		.post(loginURL, data)
		.then((res) => handleResponse(res, dispatch, LOGIN_SUCCESS, REQUEST_FAIL))
		.catch(function (error) {
			handleError(error, dispatch, REQUEST_FAIL)
		})
}

export const logout = () => async (dispatch) => {
	// dispatch(START_REQUEST())
	return axios.post(logoutURL).then((res) => handleResponse(res, dispatch, LOGOUT, REQUEST_FAIL))
}

export const updateProfile = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.put(updateProfileURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const updateProfilePicture = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios
		.put(updateProfileURL, payload, { headers: { "content-type": "multipart/form-data" } })
		.then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const refreshAccessToken = (data) => async (dispatch) => {
	const payload = { refresh: data }
	// dispatch(START_REQUEST())
	axios
		.post(refreshTokenURL, payload)
		.then((res) => handleResponse(res, dispatch, REFRESH_SUCCESS, REQUEST_FAIL))
		.catch(function (error) {
			handleError(error, dispatch, REQUEST_FAIL)
		})
}

// export const applyRefreshToken = () => async (dispatch) => {
// 	// dispatch(REFRESH_SUCCESS())
// 	AsyncStorage.getItem("access").then((res) =>
// 	dispatch(REFRESH_SUCCESS(res)))
// }

export const resetUserPassword = (data) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.put(forgotPasswordURL, data).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const registerUser = (data) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.post(registerURL, data).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const deleteUserAccount = () => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.delete(updateProfileURL).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const cleanMessage = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

const handleResponse = (res, dispatch, success, fail) => {
	// Sentry.Native.captureException(res)
	if (success === LOGOUT) {
		clearStorage()
		dispatch(LOGOUT())
	} else if (res !== undefined) {
		if (res.status >= 200 && res.status <= 299) {
			if (success === REQUEST_SUCCESS) {
				dispatch(success(res.data.message))
			} else if (success === LOGIN_SUCCESS) {
				const decode = jwtDecode(res.data.access)
				if (decode.app.name !== appName || decode.is_admin || decode.is_supervisor) {
					dispatch(fail({ text: i18n.t("wrongCredentialsMessage"), type: "error" }))
				} else {
					// try {
					// 	saveData("access", res.data.access).then((res) => {
					// 		if (res) {
					// 			if (res.data.refresh) {
					// 				saveData("refresh", res.data.refresh).then((res) => {
					// 					if (res) {
					// 						dispatch(success(res.data))
					// 					}
					// 				})
					// 			} else {
					// 				dispatch(success(res.data))
					// 			}
					// 		}
					// 	})
					// } catch (error) {}
					saveData("access", res.data.access).then((resp) => dispatch(success(res.data)))
				}
			} else {
				try {
					saveData("access", res.data.access)
					dispatch(REFRESH_SUCCESS(res.data.access))
				} catch (error) {
					// console.log(error)
				}
			}
			return res
		} else if (res.response !== undefined) {
			if (res.response.status === 401) {
				dispatch(fail({ text: i18n.t("wrongCredentialsMessage"), type: "error" }))
			} else if (res.response.status >= 400 && res.response.status <= 499) {
				dispatch(fail(res.response.data.message))
			}
		} else {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		}
	} else {
		dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
	}
}

const handleError = (error, dispatch, fail) => {
	if (error.response) {
		if (error.response.status === 500) {
			dispatch(fail({ text: i18n.t("serverErrorMessage"), type: "error" }))
		} else {
			if (error.response.status === 401) {
				dispatch(fail({ text: i18n.t("wrongCredentialsMessage"), type: "error" }))
			} else if (error.response.status >= 400 && error.response.status <= 499) {
				dispatch(fail(res.response.data.message))
			}
		}
	} else {
		dispatch(fail({ type: "error", text: "Server error!" }))
	}

	return error
}

const initState = {
	token: "",
	refreshToken: "",
	id: "",
	username: "",
	admin: false,
	supervisor: false,
	city: null,
	company: null,
	country: null,
	title: null,
	position: null,
	firstName: "",
	lastName: "",
	email: "",
	bio: "",
	phoneNumber: "",
	profilePicture: null,
	licenseNumber: null,
	language: null,
	sector: "",
	loading: false,
	message: null,
	newEmployee: false,
}

export const userReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			state.loading = true
			state.message = null
		})
		.addCase(LOGIN_SUCCESS, (state, action) => {
			const decoded = jwtDecode(action.payload.access)
			state.loading = false
			state.token = action.payload.access
			state.refreshToken = action.payload.refresh
			state.firstName = decoded.firstname
			state.lastName = decoded.lastname
			state.bio = decoded.bio
			state.email = decoded.email
			state.phoneNumber = decoded.phone_number
			state.id = decoded.user_id
			state.admin = decoded.is_admin
			state.username = decoded.username
			state.supervisor = decoded.is_supervisor
			state.city = decoded.city
			state.company = decoded.company
			state.country = decoded.country
			state.title = decoded.title
			state.position = decoded.position
			state.profilePicture = decoded.image
			state.licenseNumber = decoded.licence_number
			state.language = decoded.language
			state.sector = decoded.sector
			state.newEmployee = decoded.new_employee
		})
		.addCase(REFRESH_SUCCESS, (state, action) => {
			const decoded = jwtDecode(action.payload)
			state.loading = false
			state.token = action.payload
			state.firstName = decoded.firstname
			state.lastName = decoded.lastname
			state.bio = decoded.bio
			state.email = decoded.email
			state.phoneNumber = decoded.phone_number
			state.id = decoded.user_id
			state.admin = decoded.is_admin
			state.username = decoded.username
			state.supervisor = decoded.is_supervisor
			state.city = decoded.city
			state.company = decoded.company
			state.country = decoded.country
			state.title = decoded.title
			state.position = decoded.position
			state.profilePicture = decoded.image
			state.licenseNumber = decoded.licence_number
			state.language = decoded.language
			state.sector = decoded.sector
			state.newEmployee = decoded.new_employee
		})
		.addCase(REQUEST_SUCCESS, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(LOGOUT, (state, action) => {
			state.loading = false
			state.token = ""
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.loading = false
			state.message = null
		})
})

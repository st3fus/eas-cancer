import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import i18n from "i18n-js"
import { testResultsURL, testSingleURL } from "../api_urls"

const START_REQUEST = createAction("TEST/START_REQUEST")
const FETCH_ONE = createAction("TEST/FETCH_ONE")
const REQUEST_SUCCESS = createAction("TEST/REQUEST_SUCCESS")
const REQUEST_FAIL = createAction("TEST/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("TEST/CLEAN_MESSAGE")
const CLEAN_DETAIL = createAction("TEST/CLEAN_DETAIL")
const CLEAN_TEST_ANSWERS = createAction("TEST/CLEAN_ANSWERS")
const ADD_USER_ANSWER = createAction("TEST/ADD_TEST_ANSWER")
const CONFIRM_USER_ANSWER = createAction("TEST/CONFIRM_USER_ANSWER")
const HANDLE_USER_ANSWER = createAction("TEST/HANDLE_USER_ANSWER")
const UPDATE_USER_SUBQUESTION = createAction("TEST/UPDATE_USER_SUBQUESTION")

export const fetchTest = (id) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.get(testSingleURL(id)).then((res) => handleResponse(res, dispatch, FETCH_ONE, REQUEST_FAIL))
}

export const startTest = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.post(testResultsURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const endTest = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.put(testResultsURL, payload).then((res) => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const cleanMessage = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

export const cleanTest = () => async (dispatch) => {
	dispatch(CLEAN_DETAIL())
}

export const addAnsweredTestQuestion = (payload) => async (dispatch) => {
	dispatch(ADD_USER_ANSWER(payload))
}

export const confirmNewUserAnswer = (payload) => async (dispatch) => {
	dispatch(CONFIRM_USER_ANSWER(payload))
}

export const handleNewUserAnswer = (payload) => async (dispatch) => {
	dispatch(HANDLE_USER_ANSWER(payload))
}

export const updateUserSubquestion = (index, result) => async (dispatch) => {
	const payload = { answerIndex: index, value: result }
	dispatch(UPDATE_USER_SUBQUESTION(payload))
}

export const cleanTestAnswers = () => async (dispatch) => {
	dispatch(CLEAN_TEST_ANSWERS())
}

const handleResponse = (res, dispatch, success, fail) => {
	if (res !== undefined) {
		if (res.status >= 200 && res.status <= 299) {
			if (success === REQUEST_SUCCESS) {
				dispatch(success(res.data.message))
				dispatch(CLEAN_MESSAGE())
			} else {
				dispatch(success(res.data))
			}
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
	detail: null,
	message: null,
	loading: false,
	testAnswers: [],
}

export const testReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			state.loading = true
			state.message = null
		})
		.addCase(FETCH_ONE, (state, action) => {
			state.loading = false
			state.detail = action.payload
		})
		.addCase(REQUEST_SUCCESS, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.message = null
		})
		.addCase(CLEAN_DETAIL, (state, action) => {
			state.detail = null
		})
		.addCase(CONFIRM_USER_ANSWER, (state, action) => {
			let currentTest = state.testAnswers.find((test) => test.id === action.payload.id)
			currentTest["confirmed"] = true
			currentTest["finalResult"] = action.payload.finalResult
		})
		.addCase(HANDLE_USER_ANSWER, (state, action) => {
			let currentTest = state.testAnswers.find((test) => test.id === action.payload.id)
			if (action.payload.type === "add") {
				currentTest.userResult[`${action.payload.key}`] = action.payload.value
			} else if (action.payload.type === "remove") {
				delete currentTest.userResult[`${action.payload.key}`]
			}
		})
		.addCase(ADD_USER_ANSWER, (state, action) => {
			state.testAnswers.push(action.payload)
		})
		.addCase(UPDATE_USER_SUBQUESTION, (state, action) => {
			state.testAnswers[action.payload.answerIndex].subquestion = action.payload.value
		})
		.addCase(CLEAN_TEST_ANSWERS, (state, action) => {
			state.testAnswers = []
		})
})

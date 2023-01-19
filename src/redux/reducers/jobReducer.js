import { billboardPageAdminURL, billboardRemoveUrl, jobApplicationURL } from "../api_urls";
import { createAction, createReducer } from "@reduxjs/toolkit"
import axios from "axios";
import I18n from "i18n-js";

const START_REQUEST = createAction("JOB/START_REQUEST")
const FETCH_SUCCESS = createAction("JOB/FETCH_SUCCESS")
const FETCH_SUCCESS_DETAIL = createAction("JOB/FETCH_SUCCESS_DETAIL")
const REQUEST_SUCCESS = createAction("JOB/REQUEST_SUCCESS")
const REQUEST_FAIL = createAction("JOB/REQUEST_FAIL")
const CLEAN_MESSAGE = createAction("JOB/CLEAN_MESSAGE")
const CLEAN_DATA = createAction("JOB/CLEAN_DATA")
const CLEAN_DETAIL = createAction("JOB/CLEAN_DETAIL")

export const fetchBillboardPage = (perPage, pageNumber) => async (dispatch) => {  
	dispatch(START_REQUEST())
	return axios.get(billboardPageAdminURL(perPage, pageNumber))
	.then(res => handleResponse(res, dispatch, FETCH_SUCCESS, REQUEST_FAIL))
};

export const fetchOneJob = (id) => async (dispatch) => {  
	dispatch(START_REQUEST())
	return axios.get(billboardRemoveUrl(id))
	.then(res => handleResponse(res, dispatch, FETCH_SUCCESS_DETAIL, REQUEST_FAIL))
}

export const postJobApplication = (payload) => async (dispatch) => {
	dispatch(START_REQUEST())
	return axios.post(jobApplicationURL, payload)
	.then(res => handleResponse(res, dispatch, REQUEST_SUCCESS, REQUEST_FAIL))
}

export const emptyData = () => async (dispatch) => {
    dispatch(CLEAN_DATA())
}

export const cleanMessage = () => async (dispatch) => {
	dispatch(CLEAN_MESSAGE())
}

export const cleanJobDetail= () => async (dispatch) => {
    dispatch(CLEAN_DETAIL())
}

const handleResponse = (res, dispatch, success, fail) => {
	if(res !== undefined) {
		if(res.status >= 200 && res.status <= 299) {
		
			dispatch(success(res.data))
	
			return res
		}else if(res.response !== undefined && res.response.status === 400){
			dispatch(fail(res.response.data.message))
			dispatch(CLEAN_MESSAGE())
		}else{
			dispatch(fail({text: I18n.t("serverErrorMessage"), type: "error"}))
			dispatch(CLEAN_MESSAGE())
		}
	}else{
		dispatch(fail({text: I18n.t("serverErrorMessage"), type: "error"}))
		dispatch(CLEAN_MESSAGE())
	}
}


const initState = {
	data: null,
	detail: null,
	pagination: null,
	defaultSize: 10,
	message: null,
	loading: false,
};

export const jobReducer = createReducer(initState, (builder) => {
	builder
		.addCase(START_REQUEST, (state, action) => {
			state.loading = true
			state.message = null
		})
		.addCase(FETCH_SUCCESS, (state, action) => {
			state.loading = false
            if(!state.data) {
				state.data = action.payload.job_listings
			}else{
				state.data = state.data.concat(action.payload.job_listings)
			}
			if(action.payload.job_listings.length > 0) {
				state.pagination = action.payload.pagination
			}else{
				state.message = { text: I18n.t("noMoreMessage"), type: "info"}
			}
		})
		.addCase(FETCH_SUCCESS_DETAIL, (state, action) => {
			state.loading = false
			state.detail = action.payload
		})
		.addCase(REQUEST_SUCCESS, (state, action) => {
			state.loading = false
			state.message = action.payload.message
		})
		.addCase(REQUEST_FAIL, (state, action) => {
			state.loading = false
			state.message = action.payload
		})
		.addCase(CLEAN_MESSAGE, (state, action) => {
			state.message = null
		})
        .addCase(CLEAN_DATA, (state, action) => {
            state.data = null
        })
        .addCase(CLEAN_DETAIL, (state, action) => {
            state.detail = null
        })
	})
  
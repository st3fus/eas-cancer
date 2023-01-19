import getEnvVars from "../../environment"

export const base_url = getEnvVars().api_base_url

//AUTH
export const loginURL = "/user/login/"
export const logoutURL = "/user/logout"
export const refreshTokenURL = "/user/refresh/"
export const forgotPasswordURL = "/public/forgotpassword"
export const registerURL = "/public/register"

//USER
const profile = "/profile"
export const updateProfileURL = profile
export const updateTokenURL = profile + "/token"

//MASTERDATA & GENERIC
export const masterdataURL = (type) => `/masterdata?model=${type}`
export const genericURL = (type) => `/generic?model=${type}`
export const publicMasterdataURL = "/public/masterdata"

//ARTICLE
const articles = "/articles"
export const articleSingleURL = (id) => `${articles}?unique_url=${id}`
export const articlePageURL = (perPage, pageNumber) =>
	`${articles}?per_page=${perPage}&page_no=${pageNumber}&order_by=date_created&user_view=True&status=2`

//EDUCATION
const educations = "/educations"
export const educationSingleURL = (id) => `${educations}?id=${id}`
export const educationPageURL = (perPage, pageNumber) =>
	`${educations}?per_page=${perPage}&page_no=${pageNumber}&order_by=date_created&user_view=True&status=2`
export const educationsNewEmployeeURL = `${educations}?order_by=date_created&user_view=True&status=2&new_employee_content=True`

//TEST
const tests = "/tests"
export const testURL = tests
export const testSingleURL = (id) => `${tests}?education_id=${id}`

//BILLBOARD
const billboard = "/joblistings"
export const billboardUrl = billboard
export const billboardPageAdminURL = (perPage, pageNumber) => `${billboard}?per_page=${perPage}&page_no=${pageNumber}`
export const billboardRemoveUrl = (id) => `${billboard}?id=${id}`

//TRACK
const track = "/track"

//REACTIONS
const reaction = "/reactions"
export const reactionURL = track + reaction

//SURVEY
const surveys = "/surveys"
export const surveyURL = track + surveys

//COMMENTS
const comments = "/comments"
export const commentsURL = track + comments

//TEST
const test = "/test/results"
export const testResultsURL = track + test

const reports = "/reports"
export const reportsUrl = reports
export const reportsComponentUrl = (component) => reports + `?component=${component}`

export const submitReportURL = track + "/article/reports"

//BILLBOARD
const jobApplications = "/jobapplications"
export const jobApplicationURL = track + jobApplications

//DOCUMENTS
const documents = "/documents"
export const documentsUrl = documents

//FORMS
export const formSubmissionURL = "/formsubmissions"

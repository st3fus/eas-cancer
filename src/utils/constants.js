import Constants from "expo-constants"
import getEnvVars from "../../environment"

export const IMAGE_PREFIX = getEnvVars().s3_base_url

export const title = "Title"
export const position = "Position"
export const city = "City"
export const country = "Country"
export const language = "Language"
export const articleCategory = "ArticleCategory"
export const educationCategory = "EducationCategory"
export const education = "Education"
export const form = "Form"
export const sector = "Sector"

export const like = 1
export const love = 2
export const insightful = 3

export const loginCount = "login_count"
export const articleViews = "article_views"
export const articleReactions = "article_reactions"
export const educationViews = "education_views"
export const passedTests = "passed_tests"

export const appName = Constants.expoConfig.extra.appName

export const smarted = "SMARTED"
export const pharmanet = "PHARMANET"
export const doctornet = "DOCTORNET"

export const userActivityComponent = "user_activity"
export const unreadArticleCount = "button_data_unread_article_count"
export const unfinishedEducationCount = "button_data_unfinished_education_count"
export const currentRankTop10Month = "button_data_current_rank_top_10_month"
export const achievementsCount = "button_data_achievements_count"
export const userAchievements = "achievements"
export const top10Month = "top10_month"
export const top10Year = "top10_year"
export const top10Education = "top10_education"

const documentTypeOptions = [
	{
		value: "potvrda o zaposlenju",
		label: "Potvrda o zaposlenju",
	},
	{
		value: "potvrda o visini primanja",
		label: "Potvrda o visini primanja",
	},
	{
		value: "poslednja 3 obracunska listica",
		label: "Poslednja 3 obračunska listića",
	},
	{
		value: "ostalo",
		label: "Ostalo",
	},
]

const absenceTypeOptions = [
	{
		value: "godisnji odmor",
		label: "Godišnji odmor",
	},
	{
		value: "placeno odsustvo",
		label: "Plaćeno odsustvo",
	},
	{
		value: "dan za verski praznik – slava",
		label: "Dan za verski praznik – slava",
	},
	{
		value: "ostalo",
		label: "Ostalo",
	},
]

export const forms = [
	{
		id: 1,
		formName: "Inicijative zaposlenih",
		code: "FORM_IZ",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "initiative_name",
				label: "initiative",
				required: true,
				type: "input",
			},
			{
				fieldName: "initiative_doc",
				label: "document",
				type: "file",
			},
		],
	},
	{
		id: 2,
		formName: "Pobednicka kombinacija",
		code: "FORM_PK",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "note",
				label: "commentNote",
				required: true,
				type: "input",
			},
			{
				fieldName: "recommendation",
				label: "recommendation",
				required: true,
				type: "input",
			},
			{
				fieldName: "cv_doc",
				label: "cv",
				required: true,
				type: "file",
			},
		],
	},
	{
		id: 7,
		formName: "Zahtev za administrativnu zabranu",
		code: "FORM_ZZAZ",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
		],
	},
	{
		id: 4,
		formName: "Zahtev potvrda o zaposlenju",
		code: "FORM_ZPOZ",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "bank",
				label: "bank",
				required: true,
				type: "input",
			},
			{
				fieldName: "purpose",
				label: "certificationPurpose",
				required: true,
				type: "input",
			},
			{
				fieldName: "doc_type1",
				label: "documentType",
				type: "select",
				required: true,
				options: documentTypeOptions,
			},
			{
				fieldName: "doc_type2",
				label: "documentType",
				type: "select",
				options: documentTypeOptions,
			},
			{
				fieldName: "verification_doc",
				label: "documentVerification",
				type: "file",
			},
			{
				fieldName: "statement_doc",
				label: "loanStatement",
				type: "file",
			},
		],
	},
	{
		id: 5,
		formName: "Trkački klub",
		code: "FORM_TK",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "phone_number",
				label: "contactPhoneNumber",
				required: true,
				type: "input",
			},
		],
	},
	{
		id: 6,
		formName: "Prijava za deljenje flajera",
		code: "FORM_PZDF",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "phone_number",
				label: "contactPhoneNumber",
				required: true,
				type: "input",
			},
		],
	},
	{
		id: 3,
		formName: "Zahtevi za odsustvo",
		code: "FORM_ZZO",
		formFields: [
			{
				fieldName: "first_name",
				label: "firstName",
				required: true,
				type: "input",
			},
			{
				fieldName: "last_name",
				label: "lastName",
				required: true,
				type: "input",
			},
			{
				fieldName: "email",
				label: "email",
				required: true,
				type: "input",
			},
			{
				fieldName: "absence_type",
				label: "leaveType",
				required: true,
				type: "select",
				options: absenceTypeOptions,
			},
			{
				fieldName: "date_from",
				label: "dateFrom",
				type: "date",
			},
			{
				fieldName: "date_to",
				label: "dateTo",
				type: "date",
			},
			{
				fieldName: "absence_doc",
				label: "absenceDocument",
				required: true,
				type: "file",
			},
		],
	},
]

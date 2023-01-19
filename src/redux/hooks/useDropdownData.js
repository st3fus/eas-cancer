import { useDispatch, useSelector } from "react-redux"
import {
	clean,
	createReportUser,
	fetchDocumentsFilesDropdown,
	fetchGeneric,
	fetchMasterData,
	fetchPublicMasterdata,
	submitFormSubmission,
} from "../reducers/dropdownDataReducer"

export default function useDropdownData() {
	const dispatch = useDispatch()
	const titles = useSelector((state) => state.dropdownData.titles)
	const positions = useSelector((state) => state.dropdownData.positions)
	const countries = useSelector((state) => state.dropdownData.countries)
	const cities = useSelector((state) => state.dropdownData.cities)
	const companies = useSelector((state) => state.dropdownData.companies)
	const languages = useSelector((state) => state.dropdownData.languages)
	const educations = useSelector((state) => state.dropdownData.educations)
	const forms = useSelector((state) => state.dropdownData.forms)
	const articleCategories = useSelector((state) => state.dropdownData.articleCategories)
	const message = useSelector((state) => state.dropdownData.message)
	const loading = useSelector((state) => state.dropdownData.loading)
	const documents = useSelector((state) => state.dropdownData.documents)
	const sectors = useSelector((state) => state.dropdownData.sectors)
	const educationCategories = useSelector((state) => state.dropdownData.educationCategories)

	const fetchPublic = async () => {
		dispatch(fetchPublicMasterdata())
	}

	const fetchMd = async (type) => {
		dispatch(fetchMasterData(type))
	}

	const fetchG = async (type, userView) => {
		dispatch(fetchGeneric(type, userView))
	}

	const fetchDocumentsDropdown = async () => {
		dispatch(fetchDocumentsFilesDropdown())
	}

	const makeReportUser = async () => {
		return dispatch(createReportUser())
	}

	const submitFormular = async (payload) => {
		return dispatch(submitFormSubmission(payload))
	}

	const cleanMessage = async () => {
		return dispatch(clean())
	}

	return {
		titles,
		positions,
		countries,
		articleCategories,
		educations,
		cities,
		languages,
		companies,
		loading,
		message,
		documents,
		forms,
		sectors,
		educationCategories,
		makeReportUser,
		cleanMessage,
		fetchPublic,
		fetchMd,
		fetchG,
		fetchDocumentsDropdown,
		submitFormular,
	}
}

import { useDispatch, useSelector } from "react-redux"
import {
	changeDefaultSize,
	cleanEducation,
	cleanMessage,
	emptyData,
	fetchEducation,
	fetchEducationPage,
	fetchNewEmployeesEdu,
	searchEducationPage,
	toggleIsPortrait,
} from "../reducers/educationReducer"

export default function useEducation() {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.educations.data)
	const newEmployeeData = useSelector((state) => state.educations.newEmployeeData)
	const pagination = useSelector((state) => state.educations.pagination)
	const detail = useSelector((state) => state.educations.detail)
	const defaultSize = useSelector((state) => state.educations.defaultSize)
	const message = useSelector((state) => state.educations.message)
	const loading = useSelector((state) => state.educations.loading)
	const isPortrait = useSelector((state) => state.educations.isPortrait)
	const secondLoading = useSelector((state) => state.educations.secondLoading)
	const stopFetching = useSelector((state) => state.educations.stopFetching)

	const fetchPage = async (perPage, pageNumber, loading, secondLoading) => {
		dispatch(fetchEducationPage(perPage, pageNumber, loading, secondLoading))
	}

	const fetchNewEmp = async () => {
		dispatch(fetchNewEmployeesEdu())
	}

	const searchPage = async (perPage, pageNumber, filterData) => {
		dispatch(searchEducationPage(perPage, pageNumber, filterData))
	}

	const fetchOne = async (id) => {
		dispatch(fetchEducation(id))
	}

	const cleanToast = async () => {
		dispatch(cleanMessage())
	}

	const cleanData = async () => {
		dispatch(emptyData())
	}

	const changeSize = async (size) => {
		dispatch(changeDefaultSize(size))
	}
	const setIsPortrait = async (bool) => {
		dispatch(toggleIsPortrait(bool))
	}

	const cleanDetail = async () => {
		dispatch(cleanEducation())
	}

	return {
		data,
		newEmployeeData,
		loading,
		message,
		detail,
		pagination,
		defaultSize,
		isPortrait,
		secondLoading,
		stopFetching,
		fetchPage,
		fetchOne,
		cleanData,
		cleanToast,
		changeSize,
		cleanDetail,
		searchPage,
		fetchNewEmp,
		setIsPortrait,
	}
}

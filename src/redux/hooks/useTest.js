import { useDispatch, useSelector } from "react-redux"
import {
	addAnsweredTestQuestion,
	cleanMessage,
	cleanTest,
	cleanTestAnswers,
	confirmNewUserAnswer,
	endTest,
	fetchTest,
	handleNewUserAnswer,
	startTest,
	updateUserSubquestion,
} from "../reducers/testReducer"

export default function useTest() {
	const dispatch = useDispatch()
	const detail = useSelector((state) => state.tests.detail)
	const message = useSelector((state) => state.tests.message)
	const testAnswers = useSelector((state) => state.tests.testAnswers)
	const loading = useSelector((state) => state.tests.loading)

	const fetchOne = async (id) => {
		return dispatch(fetchTest(id))
	}

	const start = async (payload) => {
		return dispatch(startTest(payload))
	}

	const end = async (payload) => {
		dispatch(endTest(payload))
	}

	const cleanToast = async () => {
		dispatch(cleanMessage())
	}

	const cleanDetail = async () => {
		dispatch(cleanTest())
	}

	const addTestAnswer = async (payload) => {
		dispatch(addAnsweredTestQuestion(payload))
	}

	const handleUserAnswer = async (payload) => {
		dispatch(handleNewUserAnswer(payload))
	}

	const confirmUserAnswer = async (payload) => {
		dispatch(confirmNewUserAnswer(payload))
	}

	const cleanAnswers = async () => {
		dispatch(cleanTestAnswers())
	}

	const updateSubquestion = async (index, result) => {
		dispatch(updateUserSubquestion(index, result))
	}

	return {
		loading,
		message,
		detail,
		fetchOne,
		cleanToast,
		cleanDetail,
		start,
		end,
		testAnswers,
		addTestAnswer,
		cleanAnswers,
		updateSubquestion,
		handleUserAnswer,
		confirmUserAnswer,
	}
}

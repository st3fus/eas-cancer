import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { updateTokenURL } from "../api_urls"
import {
	cleanMessage,
	deleteUserAccount,
	login,
	logout,
	refreshAccessToken,
	registerUser,
	resetUserPassword,
	updateProfile,
	updateProfilePicture,
} from "../reducers/userReducer"

export default function useUser() {
	const dispatch = useDispatch()
	const username = useSelector((state) => state.user.username)
	const token = useSelector((state) => state.user.token)
	const refreshToken = useSelector((state) => state.user.refreshToken)
	const id = useSelector((state) => state.user.id)
	const supervisor = useSelector((state) => state.user.supervisor)
	const admin = useSelector((state) => state.user.admin)
	const city = useSelector((state) => state.user.city)
	const company = useSelector((state) => state.user.company)
	const title = useSelector((state) => state.user.title)
	const position = useSelector((state) => state.user.position)
	const firstName = useSelector((state) => state.user.firstName)
	const lastName = useSelector((state) => state.user.lastName)
	const email = useSelector((state) => state.user.email)
	const bio = useSelector((state) => state.user.bio)
	const phoneNumber = useSelector((state) => state.user.phoneNumber)
	const profilePicture = useSelector((state) => state.user.profilePicture)
	const licenseNumber = useSelector((state) => state.user.licenseNumber)
	const country = useSelector((state) => state.user.country)
	const language = useSelector((state) => state.user.language)
	const sector = useSelector((state) => state.user.sector)
	const message = useSelector((state) => state.user.message)
	const loading = useSelector((state) => state.user.loading)
	const newEmployee = useSelector((state) => state.user.newEmployee)

	const signin = async (data) => {
		return dispatch(login(data))
	}

	const signout = async () => {
		return dispatch(logout())
	}

	const update = async (payload) => {
		return dispatch(updateProfile(payload))
	}

	const updatePicture = async (payload) => {
		return dispatch(updateProfilePicture(payload))
	}

	const refreshAccess = async () => {
		return dispatch(refreshAccessToken(refreshToken))
	}

	const deleteAccount = async () => {
		return dispatch(deleteUserAccount())
	}

	const resetPassword = async (data) => {
		return dispatch(resetUserPassword(data))
	}

	const cleanToast = async () => {
		dispatch(cleanMessage())
	}

	const register = async (data) => {
		return dispatch(registerUser(data))
	}

	const sendPushToken = async () => {
		AsyncStorage.getItem("push_token").then((token) => axios.put(updateTokenURL, { username: username, push_token: token }))
	}

	return {
		signin,
		signout,
		cleanToast,
		update,
		updatePicture,
		refreshAccess,
		resetPassword,
		register,
		sendPushToken,
		deleteAccount,
		// applyRefresh,
		newEmployee,
		token,
		username,
		firstName,
		lastName,
		sector,
		bio,
		phoneNumber,
		email,
		refreshToken,
		profilePicture,
		language,
		licenseNumber,
		country,
		admin,
		message,
		city,
		company,
		title,
		position,
		id,
		supervisor,
		loading,
	}
}

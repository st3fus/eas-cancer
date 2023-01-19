import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
// import reactotron from "../../ReactotronConfig"
import { clearStorage } from "../utils/functions"
import { articleReducer } from "./reducers/articleReducer"
import { dashboardReducer } from "./reducers/dashboardReducer"
import { dropdownDataReducer } from "./reducers/dropdownDataReducer"
import { educationReducer } from "./reducers/educationReducer"
import { jobReducer } from "./reducers/jobReducer"
import { testReducer } from "./reducers/testReducer"
import { userReducer } from "./reducers/userReducer"

const persistConfig = {
	key: "smarted",
	version: 1,
	storage: AsyncStorage,
	whitelist: ["user"],
}

const reducer = combineReducers({
	user: userReducer,
	articles: articleReducer,
	educations: educationReducer,
	tests: testReducer,
	dropdownData: dropdownDataReducer,
	jobs: jobReducer,
	dashboard: dashboardReducer,
})

const rootReducer = (state, action) => {
	if (action.type === "USER/LOGOUT") {
		state = undefined
		clearStorage()
	}
	return reducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
})

export default store

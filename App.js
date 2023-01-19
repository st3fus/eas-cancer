import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as Font from "expo-font"
import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider } from "native-base"
import { useEffect, useState } from "react"
import { LogBox } from "react-native"
import "react-native-gesture-handler"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
// import * as Sentry from "sentry-expo"
import "expo-dev-client"
import Navigation from "./src/components/navigation"
import { config } from "./src/nativeBaseTheme/config"
import { base_url } from "./src/redux/api_urls"
import store from "./src/redux/store"
import useConfig from "./src/utils/config"
import { fonts, loadingIndicator, registerForPushNotificationsAsync } from "./src/utils/functions"

export default function App() {
	if (__DEV__) {
		import("./ReactotronConfig")
	}

	const loadFonts = async () => {
		try {
			await Font.loadAsync(fonts)
		} catch (e) {
			// Safari FontObserver timeout after 3000ms, this will fail silently
		}
		setIsReady(true)
	}

	const clearAsyncStorage = async () => {
		AsyncStorage.clear()
	}

	useEffect(() => {
		clearAsyncStorage()
		registerForPushNotificationsAsync()
		loadFonts()
	}, [])

	const [isReady, setIsReady] = useState(false)

	const persistor = persistStore(store)

	axios.defaults.baseURL = base_url

	// AsyncStorage.getAllKeys().then((res) => console.log(res))

	// AsyncStorage.getItem("access").then((res) => {
	// 	if (res) {
	// 		const decoded = jwtDecode(res)
	// 		if (decoded && decoded.language) {
	// 			I18n.locale = decoded.language.code.toLowerCase()
	// 		}
	// 	}
	// })

	LogBox.ignoreLogs(["NativeBase:", "When server rendering,"])

	const appConfig = useConfig()

	// let [fontsReady, fontsError] = useFonts(fonts)

	if (!isReady) {
		return <></>
	}

	// Sentry.init({
	// 	dsn: "https://1ad75bb9c5b54744a0be75c53d8ed34d@o1282136.ingest.sentry.io/6489260",
	// 	enableInExpoDevelopment: true,
	// 	debug: true,
	// 	// enableNative: true,
	// 	// If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	// })

	// Access any @sentry/react-native exports via:
	// Sentry.Native.init({
	// 	dsn: "https://1ad75bb9c5b54744a0be75c53d8ed34d@o1282136.ingest.sentry.io/6489260",
	// 	enableInExpoDevelopment: true,
	// 	debug: true,
	// 	enableNative: false,
	// 	// If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	// })

	//   // Access any @sentry/browser exports via:
	// Sentry.Browser.init({
	// 	dsn: "https://1ad75bb9c5b54744a0be75c53d8ed34d@o1282136.ingest.sentry.io/6489260",
	// 	enableInExpoDevelopment: true,
	// 	debug: true,
	// 	enableNative: false,
	// 	// If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
	// })

	return (
		<Provider store={store}>
			<NativeBaseProvider theme={appConfig.theme} config={config}>
				<PersistGate loading={loadingIndicator(appConfig.colors)} persistor={persistor}>
					<StatusBar style="dark" />
					<Navigation />
				</PersistGate>
			</NativeBaseProvider>
		</Provider>
	)
}

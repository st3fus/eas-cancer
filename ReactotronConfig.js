import AsyncStorage from "@react-native-async-storage/async-storage"
import Reactotron from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure({ host: "192.168.0.106" })
	.useReactNative()
	.use(reactotronRedux())
	.connect()

export default reactotron

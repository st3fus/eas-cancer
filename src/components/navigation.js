import AsyncStorage from "@react-native-async-storage/async-storage"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import axios from "axios"
import { default as I18n, default as i18n } from "i18n-js"
import { useEffect } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import TabBurger from "../icons/TabBurger"
import TabEdu from "../icons/TabEdu"
import TabForum from "../icons/TabForum"
import TabNews from "../icons/TabNews"
import useUser from "../redux/hooks/useUser"
import ArticleDetailScreen from "../screens/ArticleDetailScreen"
import ArticlesScreen from "../screens/ArticlesScreen"
import EducationsScreen from "../screens/EducationsScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import JobDetailScreen from "../screens/JobDetailScreen"
import JobListingScreen from "../screens/JobListingScreen"
import LoginScreen from "../screens/LoginScreen"
import ProfileAchievementsScreen from "../screens/ProfileAchievementsScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ProfileTop10Screen from "../screens/ProfileTop10Screen"
import RegistrationScreen from "../screens/RegistrationScreen"
import SingleEducationScreen from "../screens/SingleEducationScreen"
import SuccessScreen from "../screens/SuccessScreen"
import TestScreen from "../screens/TestScreen"
import UpdateProfileScreen from "../screens/UpdateProfileScreen"
import useConfig from "../utils/config"
import { appName } from "../utils/constants"
import { navigationRef } from "../utils/RootNavigator"

const Navigation = () => {
	const hook = useUser()
	const config = useConfig()
	const colors = config.colors
	const companyFontName = config.companyFontName
	const shadow = {
		// shadowColor: "#000000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.15,
		// shadowRadius: 1.0,
		// elevation: 1,
		// borderColor: "#ddd",
		// borderBottomColor: "#ddd",
		// borderleftColor: "#ddd",
		// borderRightColor: "#ddd",
	}
	const tabBtnStyle = {
		marginVertical: 2,
		paddingVertical: 0,
		minWidth: 75,
		height: 44,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#ddd",
		overflow: "hidden",
	}
	const tabBarLabelStyle = {
		fontSize: 8,
		marginBottom: 1,
		padding: 2,
		fontFamily: `${companyFontName}-Regular`,
		minWidth: 75,
		borderBottomStartRadius: 4,
		borderBottomEndRadius: 4,
		textAlign: "center",
		borderRadius: 4,
	}
	const tabBarIconStyle = {
		minWidth: 75,
		// height: 30,
		justifyContent: "center",
		alignItems: "center",
		borderTopStartRadius: 4,
		borderTopEndRadius: 4,
		marginTop: 5,
		paddingBottom: 2,
		// zindex: 2,
		zIndex: 2,
	}

	axios.interceptors.request.use(async (config) => {
		const token = await AsyncStorage.getItem("access")
		console.log(hook.token, "token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		} else if (hook.token) {
			config.headers.Authorization = `Bearer ${hook.token}`
		}

		config.headers["x-app-name"] = appName

		return config
	})

	useEffect(() => {
		if (hook.language) {
			I18n.locale = hook.language.code.toLowerCase()
		}
	}, [hook.language])

	// axios.interceptors.response.use(
	// 	(response) => {
	// 		return response
	// 	},
	// 	async function (error) {
	// 		const originalRequest = error.config
	// 		if (error.response && error.response.status === 401 && !originalRequest._retry) {
	// 			originalRequest._retry = true
	// 			AsyncStorage.getItem("refresh").then((res) => {
	// 				if (res) {
	// 					const access = hook.refreshAccess(res)
	// 					axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
	// 				}
	// 			})

	// 			return axiosApiInstance(originalRequest)
	// 		}
	// 		return Promise.reject(error)
	// 	}
	// 	// (error) => {
	// 	// 	if (error.response !== undefined) {
	// 	// 		if (error.response.status === 401) {
	// 	// 			if (error.response.config.url !== loginURL) {
	// 	// 				// navigate("Login")
	// 	// 				// clearStorage()
	// 	// 			}
	// 	// 		}
	// 	// 	}

	// 	// 	return error
	// 	// }
	// )

	const Tab = createBottomTabNavigator()
	const RootStack = createStackNavigator()
	const ArticleStack = createStackNavigator()
	const EduStack = createStackNavigator()
	const LogRegStack = createStackNavigator()
	const ProfileStack = createStackNavigator()

	const loginOptions = ({ route }) => ({
		headerLeft: () => null,
		headerShown: false,
		gestureEnabled: false,
	})

	const options = ({ route }) => ({
		headerLeft: () => null,
		headerShown: true,
		gestureEnabled: false,
		headerTitle: () => config.title(route.name, hook.company),
		headerStyle: {
			height: Platform.OS === "ios" ? 75 : 65,
		},
		headerTitleAlign: "center",
	})

	function ProfileStackScreens() {
		return (
			<SafeAreaProvider>
				<ProfileStack.Navigator>
					<ProfileStack.Screen
						name={i18n.t("profileNoUp")}
						component={ProfileScreen}
						options={{
							headerLeft: () => null,
							// headerShown: false,
							gestureEnabled: false,
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
							headerTitle: () => config.title(i18n.t("profileNoUp"), hook.company),
							// checkTitle(consts.appName, i18n.t("profileNoUp"), hook.company),
						}}
					/>
					<ProfileStack.Screen
						name="UpdateProfile"
						component={UpdateProfileScreen}
						options={{
							title: "",
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,

							headerTitle: () => config.title("", hook.company),
						}}
					/>
					<ProfileStack.Screen
						name="Top10"
						component={ProfileTop10Screen}
						options={{
							title: "",
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
							headerTitleAlign: "center",
							headerTitle: () => config.title("Top 10", hook.company),
						}}
					/>
					<ProfileStack.Screen
						name="Achievements"
						component={ProfileAchievementsScreen}
						options={{
							title: "",
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
							headerTitleAlign: "center",
							headerTitle: () => config.title("Achievements", hook.company),
						}}
					/>
				</ProfileStack.Navigator>
			</SafeAreaProvider>
		)
	}

	function LogRegistStackScreens() {
		return (
			<SafeAreaProvider>
				<LogRegStack.Navigator>
					<LogRegStack.Screen name="Login" component={LoginScreen} options={loginOptions} />
					<LogRegStack.Screen
						name="Registration"
						component={RegistrationScreen}
						options={{
							title: "",
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
						}}
					/>
					<LogRegStack.Screen name="Password" component={ForgotPasswordScreen} options={options} />
					<LogRegStack.Screen name="Success" component={SuccessScreen} options={options} />
				</LogRegStack.Navigator>
			</SafeAreaProvider>
		)
	}

	function ArticlesStackScreens() {
		return (
			<SafeAreaProvider>
				<ArticleStack.Navigator>
					<ArticleStack.Screen name={"News"} component={ArticlesScreen} options={options} />
					<ArticleStack.Screen
						name="ArticleDetail"
						component={ArticleDetailScreen}
						options={{
							title: "",
							gestureEnabled: false,
							headerTitleStyle: {
								fontSize: 12,
								color: colors.medium,
								fontFamily: `${companyFontName}-Regular`,
								margin: -20,
							},
							headerTitle: () => config.title("", hook.company),
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
							headerTitleAlign: "center",
							headerLeftContainerStyle: {},
						}}
					/>
				</ArticleStack.Navigator>
			</SafeAreaProvider>
		)
	}

	function EduStackScreens() {
		return (
			<SafeAreaProvider>
				<EduStack.Navigator>
					<EduStack.Screen name={i18n.t("educationsNoUp")} component={EducationsScreen} options={options} />
					<EduStack.Screen
						name="SingleEducation"
						component={SingleEducationScreen}
						options={{
							title: "",
							gestureEnabled: false,
							headerTitleStyle: {
								fontSize: 12,
								color: colors.medium,
								fontFamily: `${companyFontName}-Regular`,
								marginLeft: -20,
							},
							headerTitle: () => config.title("", hook.company),
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,

								// marginTop: StatusBar.currentHeight,
							},

							headerTitleAlign: "center",

							headerTintColor: colors.medium,
							headerLeftContainerStyle: {},
						}}
					/>
					<EduStack.Screen
						name="Test"
						component={TestScreen}
						options={{
							title: "",
							headerLeft: () => null,
							gestureEnabled: false,
							headerShown: false,
							headerTintColor: colors.medium,
						}}
					/>
				</EduStack.Navigator>
			</SafeAreaProvider>
		)
	}
	function JobListingScreens() {
		return (
			<SafeAreaProvider>
				<ArticleStack.Navigator>
					<ArticleStack.Screen name={i18n.t("jobListingsNoUp")} component={JobListingScreen} options={options} />
					<ArticleStack.Screen
						name="JobDetailScreen"
						component={JobDetailScreen}
						options={{
							title: "",
							gestureEnabled: false,
							headerTitleStyle: {
								fontSize: 12,
								color: colors.medium,
								fontFamily: `${companyFontName}-Regular`,
								margin: -20,
							},
							headerTitle: () => config.title("", hook.company),
							headerStyle: {
								height: Platform.OS === "ios" ? 75 : 65,
							},
							headerTintColor: colors.medium,
							headerTitleAlign: "center",
							headerLeftContainerStyle: {},
						}}
					/>
				</ArticleStack.Navigator>
			</SafeAreaProvider>
		)
	}

	function TabScreens() {
		return (
			<Tab.Navigator
				initialRouteName={"TabScreenNavigator"}
				tabBarOptions={{
					keyboardHidesTabBar: true,
					labelPosition: "below-icon",
					tabStyle: {
						backgroundColor: colors.bg,
						borderRadius: 6,
					},
				}}
			>
				<Tab.Screen
					name={"ArticlesStack"}
					component={ArticlesStackScreens}
					options={({ navigation }) => ({
						title: "",
						gestureEnabled: false,
						tabBarButton: ({ children, ...props }) => {
							return (
								<TouchableOpacity {...props} activeOpacity={0.9} onPress={() => navigation.navigate("ArticlesStack")}>
									<View
										style={[
											{
												backgroundColor: props.accessibilityState.selected ? colors.dark : colors.bg,
											},
											{ ...tabBtnStyle },
										]}
									>
										{children}
									</View>
								</TouchableOpacity>
							)
						},

						tabBarLabel: ({ focused, color }) => {
							return (
								<Text
									style={[
										{
											color: focused ? colors.bg : colors.dark,
										},
										{ ...tabBarLabelStyle },
										{ ...shadow },
									]}
								>
									{i18n.t("articles")}
								</Text>
							)
						},
						tabBarIcon: ({ size, focused, color }) => {
							return (
								<View style={[{ ...tabBarIconStyle }, { ...shadow }]}>
									<TabNews width={20} height={20} fill={focused ? colors.bg : colors.dark} />
								</View>
							)
						},
					})}
				/>

				<Tab.Screen
					name="EduStack"
					component={EduStackScreens}
					options={({ navigation }) => ({
						title: "",
						tabBarVisible: true,
						tabBarButton: ({ children, ...props }) => {
							return (
								<TouchableOpacity {...props} activeOpacity={0.9} onPress={() => navigation.navigate("EduStack")}>
									<View
										style={[
											{
												backgroundColor: props.accessibilityState.selected ? colors.dark : colors.bg,
											},
											{ ...tabBtnStyle },
										]}
									>
										{children}
									</View>
								</TouchableOpacity>
							)
						},
						tabBarLabel: ({ focused, color }) => {
							return (
								<Text
									style={[
										{
											color: focused ? colors.bg : colors.dark,
											backgroundColor: focused ? colors.dark : colors.bg,
										},
										{ ...tabBarLabelStyle },
										{ ...shadow },
										{ borderTopColor: "transparent", borderTopLeftRadius: 0, borderTopRightRadius: 0 },
									]}
								>
									{i18n.t("educations")}
								</Text>
							)
						},
						tabBarIcon: ({ size, focused, color }) => {
							return (
								<View
									style={[
										{
											backgroundColor: focused ? colors.dark : colors.bg,
										},
										{ ...tabBarIconStyle },
										{ ...shadow },
									]}
								>
									<TabEdu width={20} height={20} fill={focused ? colors.bg : colors.dark} />
								</View>
							)
						},
					})}
				/>
				{config.appId !== 2 && (
					<Tab.Screen
						name="JobListingStack"
						component={JobListingScreens}
						options={({ navigation }) => ({
							title: "",
							tabBarVisible: true,
							tabBarButton: ({ children, ...props }) => {
								return (
									<TouchableOpacity {...props} activeOpacity={0.9} onPress={() => navigation.navigate("JobListingStack")}>
										<View
											style={[
												{
													backgroundColor: props.accessibilityState.selected ? colors.dark : colors.bg,
												},
												{ ...tabBtnStyle },
											]}
										>
											{children}
										</View>
									</TouchableOpacity>
								)
							},
							tabBarLabel: ({ focused, color }) => {
								return (
									<Text
										style={[
											{
												color: focused ? colors.bg : colors.dark,
												backgroundColor: focused ? colors.dark : colors.bg,
											},
											{ ...tabBarLabelStyle },
											{ ...shadow },
											{ borderTopColor: "transparent", borderTopLeftRadius: 0, borderTopRightRadius: 0 },
										]}
									>
										{i18n.t("jobListings")}
									</Text>
								)
							},
							tabBarIcon: ({ size, focused, color }) => {
								return (
									<View
										style={[
											{
												backgroundColor: focused ? colors.dark : colors.bg,
											},
											{ ...tabBarIconStyle },
											{ ...shadow },
										]}
									>
										<TabForum width={20} height={20} fill={focused ? colors.bg : colors.dark} />
									</View>
								)
							},
						})}
					/>
				)}
				<Tab.Screen
					name="Profile"
					component={ProfileStackScreens}
					options={({ navigation }) => ({
						tabBarButton: ({ children, ...props }) => {
							return (
								<TouchableOpacity {...props} activeOpacity={0.9} onPress={() => navigation.navigate("Profile")}>
									<View
										style={[
											{
												backgroundColor: props.accessibilityState.selected ? colors.dark : colors.bg,
											},
											{ ...tabBtnStyle },
											// { borderColor: props.accessibilityState.selected ? colors.dark : "red" },
										]}
									>
										{children}
									</View>
								</TouchableOpacity>
							)
						},
						title: "",
						tabBarIcon: ({ size, focused, color }) => {
							return (
								<View
									style={[
										{
											backgroundColor: focused ? colors.dark : colors.bg,

											justifyContent: "center",
											alignItems: "center",
											borderRadius: 4,
											marginTop: 17,
										},
									]}
								>
									<TabBurger width={28} height={28} fill={focused ? colors.bg : colors.dark} />
								</View>
							)
						},
					})}
				/>
			</Tab.Navigator>
		)
	}
	return (
		<NavigationContainer ref={navigationRef}>
			<RootStack.Navigator initialRouteName={hook.token ? "News" : "Login"}>
				<RootStack.Screen name={"TabScreens"} component={TabScreens} options={loginOptions} />
				<RootStack.Screen name="Login" component={LogRegistStackScreens} options={loginOptions} />
			</RootStack.Navigator>
		</NavigationContainer>
	)
}
export default Navigation

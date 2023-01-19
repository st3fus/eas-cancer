export default {
	name: "Pharmanet",
	slug: "pharmanet",
	owner: "djalovic.miljan",
	sdkVersion: "45.0.0",
	version: "2.4.54",
	orientation: "portrait",
	icon: "./assets/pharmanet-logo.png",
	privacy: "public",
	userInterfaceStyle: "light",
	splash: {
		image: "./assets/pharmanetSplash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	updates: {
		enabled: false,
	},
	notification: {
		// icon: "icon 96x96", just for android
		iosDisplayInForeground: true,
	},
	assetBundlePatterns: ["**/*"],
	// qmjg-nzel-fohz-uege (Apple app specific password, needed for eas submit)
	ios: {
		bundleIdentifier: "rs.pharmanet.app",
		buildNumber: "2.4.54", // used to upgrade version of app, needed before every prod build
		userInterfaceStyle: "light",
		config: {
			usesNonExemptEncryption: false,
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/pharmanet-logo-android.png",
			backgroundColor: "#FFFFFF",
		},
		package: "rs.pharmanet.app",
		versionCode: 2454, // used to upgrade version of app, needed before every prod build
		googleServicesFile: "./google-services-pharmanet.json",
		userInterfaceStyle: "light",
		permissions: [
			"ACCESS_MEDIA_LOCATION",
			"ACCESS_NETWORK_STATE",
			"ACCESS_WIFI_STATE",
			"CAMERA",
			"FOREGROUND_SERVICE",
			"INTERNET",
			"MANAGE_DOCUMENTS",
			"MODIFY_AUDIO_SETTINGS",
			"READ_APP_BADGE",
			"READ_CALENDAR",
			"READ_CONTACTS",
			"READ_EXTERNAL_STORAGE",
			"READ_INTERNAL_STORAGE",
			"READ_PHONE_STATE",
			"RECEIVE_BOOT_COMPLETED",
			"RECORD_AUDIO",
			"SYSTEM_ALERT_WINDOW",
			"USE_BIOMETRIC",
			"USE_FINGERPRINT",
			"VIBRATE",
			"WAKE_LOCK",
			"WRITE_CALENDAR",
			"WRITE_EXTERNAL_STORAGE",
			"WRITE_SETTINGS",
		],
	},
	web: {
		favicon: "./assets/favicon.png",
	},
	extra: {
		appName: "PHARMANET",
	},
}

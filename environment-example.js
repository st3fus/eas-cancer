import Constants from "expo-constants"

// staging and prod not required
const smartedENV = {
	dev: {
		api_base_url: "https://e356-178-237-217-92.ngrok.io/api",
		s3_base_url: "https://pharmanet-smarted-staging.s3.eu-central-1.amazonaws.com/",
	},
	staging: {
		api_base_url: "",
		s3_base_url: "",
	},
	prod: {
		api_base_url: "https://smart-ed.rs/api", // production
		s3_base_url: "https://smarted-production.s3.eu-central-1.amazonaws.com/", // production
	},
}

// staging and prod not required
const pharmaENV = {
	dev: {
		api_base_url: "https://e356-178-237-217-92.ngrok.io/api",
		s3_base_url: "https://pharmanet-smarted-staging.s3.eu-central-1.amazonaws.com/",
	},
	staging: {
		api_base_url: "",
		s3_base_url: "",
	},
	prod: {
		api_base_url: "https://pharmanet.rs/api", // production
		s3_base_url: "https://pharmanet-smarted-prod.s3.eu-central-1.amazonaws.com/", // production
	},
}

// staging and prod not required
const doctorENV = {
	dev: {
		api_base_url: "https://5e2b-24-135-34-240.ngrok.io/api",
		s3_base_url: "https://pharmanet-smarted-staging.s3.eu-central-1.amazonaws.com/",
	},
	staging: {
		api_base_url: "",
		s3_base_url: "",
	},
	prod: {
		api_base_url: "https://doctor-net.rs/api", // production
		s3_base_url: "https://pharmanet-smarted-prod.s3.eu-central-1.amazonaws.com/", // production
	},
}

const getEnvVars = (appName = Constants.manifest.extra.appName) => {
	if (__DEV__) {
		if (appName === "PHARMANET") {
			return pharmaENV.dev
		} else if (appName === "SMARTED") {
			return smartedENV.dev
		} else if (appName === "DOCTORNET") {
			return doctorENV.dev
		}
	} else {
		if (appName === "PHARMANET") {
			return pharmaENV.prod
		} else if (appName === "SMARTED") {
			return smartedENV.prod
		} else if (appName === "DOCTORNET") {
			return doctorENV.prod
		}
	}
}

export default getEnvVars

module.exports = () => {
	process.env.APP_ENV === "production"
	return require("./app.json")
}
// } else {
// 	return require("./app.development.json")
// }

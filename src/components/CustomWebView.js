import AutoHeightWebView from "react-native-autoheight-webview"
import WebView from "react-native-webview"

const CustomWebView = ({ colors, totalWidth, currentWidth, content, pdf }) => {
	const handleHTML = (html) =>
		`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=${
			currentWidth - 16
		}, user-scalable=no" initial-scale=0.2", ></head><body>${html}</body></html>`

	if (pdf) {
		return (
			<WebView
				style={{
					opacity: 0.99,
					minHeight: 400,
					width: totalWidth,
					backgroundColor: colors.bg,
				}}
				source={{ uri: content }}
			/>
		)
	} else {
		return (
			<AutoHeightWebView
				style={{
					opacity: 0.99,
					minHeight: 1,
					// height: "100%",
					// padding: 3,
					width: totalWidth,
					backgroundColor: colors.bg,
				}}
				customStyle={`
				body{
					font-family: sans-serif, Arial, tohoma, "Courier New,Courier";
					background-color:${colors.bg}!important;
				}
					p,span{
						background-color:${colors.bg}!important;
					}
					img {
						max-width: ${currentWidth - 22}px;
						max-height:${(currentWidth - 20) * 0.75}px;
						object-fit:contain;
					}
					video{
						width:${currentWidth - 12};
							max-height:200px;
						border-style: none;

					}
					iframe{
						width:${currentWidth - 12};
							max-height:200px;
						border-style: none;

					}
					table, td, th {
						border: 1px solid black;
						}
					table{
						border-collapse: collapse;
						min-width:100%;
						overflow-x: scroll;
					}
			`}
				files={[
					{
						href: "cssfileaddress",
						type: "text/css",
						rel: "stylesheet",
					},
				]}
				source={{ html: handleHTML(content) }}
				scalesPageToFit={false}
				viewportContent={"width=device-width, user-scalable=no"}
				scrollEnabledWithZoomedin={true}
				allowsFullscreenVideo={true}
				userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
			            (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
			/>
		)
	}
}

export default CustomWebView

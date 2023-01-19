import { extendTheme } from "native-base"
import { appName, pharmanet, smarted } from "../utils/constants"

export default theme = extendTheme({
    colors:
        appName === pharmanet
            ? {
                  _black: "#012c31",
                  _bg: "#f5feff",
                  _light: "rgba(36, 180, 188,0.2)",
                  _medium: "#24b4bc",
                  _dark: "#00707c",
                  _red: "#ed7474",
                  _green: "#00ff00",
              }
            : appName === smarted
            ? {
                  _black: "#041829",
                  _bg: "#F5FEFF",
                  _light: "rgba(66, 146, 220,0.2)",
                  _medium: "#4292DC",
                  _dark: "#082D4F",
                  _red: "#ED7474",
                  _green: "#00ff00",
              }
            : {
                  _black: "#181818",
                  _bg: "#EFFFFC",
                  _light: "rgba(6, 171, 143,0.2)",
                  _medium: "#06AB8F",
                  _dark: "#065547",
                  _red: "#ED7474",
                  _green: "#00ff00",
              },
    fontConfig: {
        JosefinSans: {
            200: {
                normal: "regular",
                italic: "italic",
            },
            300: {
                normal: "regular",
                italic: "italic",
            },
            400: {
                normal: "regular",
                italic: "italic",
            },
            500: {
                normal: "regular",
                italic: "italic",
            },
            600: {
                normal: "regular",
                italic: "italic",
            },
            700: {
                normal: "bold",
            },
            800: {
                normal: "bold",
            },
            900: {
                normal: "bold",
            },
        },
    },
    fonts: {
        heading: "JosefinSans",
        body: "JosefinSans",
        mono: "JosefinSans",
    },
})

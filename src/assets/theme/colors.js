import { appName, pharmanet, smarted } from "../../utils/constants"

export default appName === pharmanet
    ? {
          black: "#012c31",
          bg: "#f5feff",
          light: "rgba(36, 180, 188,0.2)",
          medium: "#24b4bc",
          dark: "#00707c",
          red: "#ed7474",
          green: "#00ff00",
      }
    : appName === smarted
    ? {
          black: "#041829",
          bg: "#F5FEFF",
          light: "rgba(66, 146, 220,0.2)",
          medium: "#4292DC",
          dark: "#082D4F",
          red: "#ED7474",
          green: "#00ff00",
      }
    : {
          black: "#181818",
          bg: "#EFFFFC",
          light: "rgba(6, 171, 143,0.2)",
          medium: "#06AB8F",
          dark: "#065547",
          red: "#ED7474",
          green: "#00ff00",
      }

import React from "react"
import { SvgXml } from "react-native-svg"
function ReloadIcon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
      fill="${props.fill}"
        fillRule="evenodd"
        d="M4.193 5H8v2H1V0h2v3.27C4.725 1.183 7.196 0 10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10h2a8 8 0 108-8C7.606 2 5.554 3.079 4.193 5z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ReloadIcon

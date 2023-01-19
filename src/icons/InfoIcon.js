import React from "react"
import { SvgXml } from "react-native-svg"

function InfoIcon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 50 50"
    >
      <path
        stroke="${props.fill}"
        strokeWidth="4.167"
        d="M25 45.833c11.506 0 20.833-9.327 20.833-20.833 0-11.506-9.327-20.834-20.833-20.834C13.494 4.166 4.166 13.494 4.166 25S13.494 45.833 25 45.833z"
      ></path>
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeWidth="4.167"
        d="M23.959 14.584H25"
      ></path>
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.167"
        d="M20.834 22.916H25v10.417M20.834 33.334h8.333"
      ></path>
    </svg>
    `
    return <SvgXml xml={xml} />
}

export default InfoIcon

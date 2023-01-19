import React from "react"
import { SvgXml } from "react-native-svg"
function Educations(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 22 18"
    >
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.6"
        d="M11 1L1 6.333l10 5.334 10-5.334L11 1z"
      ></path>
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.6"
        d="M5 8.467V13c0 1.467 2.667 3.333 6 3.333s6-1.866 6-3.333V8.467M21 6.333V15"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Educations

import React from "react"
import { SvgXml } from "react-native-svg"

function CheckIcon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 18 14"
    >
      <path
      fill="${props.fill}"
        fillRule="evenodd"
        d="M6.258 10.19L16.45 0 18 1.55 6.258 13.293 0 7.034l1.55-1.55 4.708 4.707z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default CheckIcon

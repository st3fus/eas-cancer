import React from "react"
import { SvgXml } from "react-native-svg"

function XIcon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
      fill="${props.fill}"
        fillRule="evenodd"
        d="M14.273 13L20 18.727 18.728 20 13 14.273 7.272 20 6 18.727 11.727 13 6 7.272 7.272 6 13 11.727 18.728 6 20 7.272 14.273 13z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default XIcon

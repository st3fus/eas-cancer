import React from "react"
import { SvgXml } from "react-native-svg"

function Articles(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="${props.fill}"
        fillRule="evenodd"
        d="M0 13.5A1.5 1.5 0 001.5 15h10.06L15 11.56V1.5A1.5 1.5 0 0013.5 0h-12A1.5 1.5 0 000 1.5v12zm1.5-12h12v8.25h-2.25a1.5 1.5 0 00-1.5 1.5v2.25H1.5v-12zm9.75 9.75h1.94l-1.94 1.94v-1.94zm-7.5-1.5v1.5h4.5v-1.5h-4.5zm0-1.5v-1.5h7.5v1.5h-7.5zm0-4.5v1.5h7.5v-1.5h-7.5z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Articles

import React from "react"
import { SvgXml } from "react-native-svg"

const Created = (props) => {
    const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    fill="none"
    viewBox="0 0 22 22"
  >
    <path
      stroke="${props.fill}"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    d="M9.795 2.979H3.706A2.706 2.706 0 001 5.685v12.177a2.706 2.706 0 002.706 2.706h13.53a2.706 2.706 0 002.706-2.706v-6.089"
    ></path>
    <path
      stroke="${props.fill}"
      fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.942 1.581a1.978 1.978 0 01-.023 2.774l-9.448 9.448-4.059 1.353 1.353-4.06 9.453-9.532a1.906 1.906 0 012.55-.141l.174.158z"
                
    ></path>
    <path
    stroke="${props.fill}"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M17.236 4.332l1.29 1.353"
    ></path>
  </svg>`
    return <SvgXml xml={xml} />
}

export default Created

import React from "react"
import { SvgXml } from "react-native-svg"

const Export = (props) => {
    const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    fill="none"
    viewBox="0 0 18 18"
  >
    <path
      stroke="${props.fill}"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M6.99 4.875l1.92-1.92 1.92 1.92M8.91 10.635V3.007M3 9c0 3.315 2.25 6 6 6s6-2.685 6-6"
    ></path>
  </svg>`
    return <SvgXml xml={xml} />
}

export default Export

import React from "react"
import { SvgXml } from "react-native-svg"

const Clock = (props) => {
    const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="${props.fill}"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18.333 10c0 4.6-3.733 8.333-8.333 8.333A8.336 8.336 0 011.667 10C1.667 5.4 5.4 1.667 10 1.667S18.333 5.4 18.333 10z"
    ></path>
    <path
      stroke="${props.fill}"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M13.092 12.65l-2.584-1.542c-.45-.266-.816-.908-.816-1.433V6.258"
    ></path>
  </svg>`
    return <SvgXml xml={xml} />
}

export default Clock

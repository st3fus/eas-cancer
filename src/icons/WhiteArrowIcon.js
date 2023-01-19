import React from "react"
import { SvgXml } from "react-native-svg"

const WhiteArrowIcon = (props) => {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        fill="${props.fill}"
        fillRule="evenodd"
        d="M15.842 10.034H0V7.966h15.842L9.007 1.462 10.543 0 20 9l-9.457 9-1.536-1.462 6.835-6.504z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default WhiteArrowIcon

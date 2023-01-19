import React from "react"
import { SvgXml } from "react-native-svg"

const Location = (props) => {
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
        strokeWidth="1.5"
        d="M10 11.192a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2z"
      ></path>
      <path
        stroke="${props.fill}"
        strokeWidth="1.5"
        d="M3.017 7.075C4.658-.142 15.35-.133 16.983 7.083c.959 4.234-1.675 7.817-3.983 10.034a4.328 4.328 0 01-6.008 0c-2.3-2.217-4.934-5.809-3.975-10.042z"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Location

import React from "react"
import { SvgXml } from "react-native-svg"

function WarningIcon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 22 20"
    >
      <path
      fill="${props.fill}"
        fillRule="evenodd"
        d="M21.442 13.953L14.437 1.978a3.974 3.974 0 00-6.873 0L.556 13.958a4.007 4.007 0 003.419 6.04h14.038a4.005 4.005 0 003.43-6.045zM2.28 14.973L9.292 2.986a1.975 1.975 0 013.416-.003l7.01 11.985a2.008 2.008 0 01-1.715 3.031H3.983a2.004 2.004 0 01-1.704-3.024zM11 15.999a1 1 0 100-2 1 1 0 000 2zm1.004-10h-2.001v7h2v-7z"
        clipRule="evenodd"
      ></path>
    </svg>`

    return <SvgXml xml={xml} />
}

export default WarningIcon

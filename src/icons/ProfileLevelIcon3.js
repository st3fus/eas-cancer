import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileLevelIcon3(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 18 22" 
    >
      <path
        fill="${props.fill}"
        fillRule="evenodd"
        d="M9.2223 0L0.666748 4V10C0.666748 15.55 4.31712 20.74 9.2223 22C14.1275 20.74 17.7779 15.55 17.7779 10V4L9.2223 0ZM15.8766 10C15.8766 14.52 13.0438 18.69 9.2223 19.93C5.40082 18.69 2.56798 14.52 2.56798 10V5.3L9.2223 2.19L15.8766 5.3V10Z"
        clipRule="evenodd"
      ></path>
      <path d="M4.94434 11H13.4999" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M4.94434 14.6667H13.4999" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M4.94434 7.33325H13.4999" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon3

import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileLevelIcon2(props) {
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
        d="M8.99989 0L0.444336 4V10C0.444336 15.55 4.09471 20.74 8.99989 22C13.9051 20.74 17.5554 15.55 17.5554 10V4L8.99989 0ZM15.6542 10C15.6542 14.52 12.8214 18.69 8.99989 19.93C5.17841 18.69 2.34557 14.52 2.34557 10V5.3L8.99989 2.19L15.6542 5.3V10Z"
        clipRule="evenodd"
      ></path>
      <path d="M4.72217 12.2222H13.2777" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd"    fillRule="evenodd"/>
      <path d="M4.72217 8.55566H13.2777" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd"    fillRule="evenodd"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon2

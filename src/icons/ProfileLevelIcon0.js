import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileLevelIcon0(props) {
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
        d="M8.55556 0L0 4V10C0 15.55 3.65037 20.74 8.55556 22C13.4607 20.74 17.1111 15.55 17.1111 10V4L8.55556 0ZM15.2099 10C15.2099 14.52 12.377 18.69 8.55556 19.93C4.73407 18.69 1.90123 14.52 1.90123 10V5.3L8.55556 2.19L15.2099 5.3V10Z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon0

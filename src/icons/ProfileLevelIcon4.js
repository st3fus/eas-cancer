import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileLevelIcon4(props) {
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
        d="M9.44447 0L0.888916 4V10C0.888916 15.55 4.53929 20.74 9.44447 22C14.3497 20.74 18 15.55 18 10V4L9.44447 0ZM16.0988 10C16.0988 14.52 13.266 18.69 9.44447 19.93C5.62299 18.69 2.79015 14.52 2.79015 10V5.3L9.44447 2.19L16.0988 5.3V10Z"
        clipRule="evenodd"
      ></path>
      <path d="M5.16675 9.77783H13.7223" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M5.16675 12.2222H13.7223" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M9.44434 6.11108L9.44434 20.7778" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M5.16675 7.33325H13.7223" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon4

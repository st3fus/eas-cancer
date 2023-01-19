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
        d="M8.66664 0L0.111084 4V10C0.111084 15.55 3.76145 20.74 8.66664 22C13.5718 20.74 17.2222 15.55 17.2222 10V4L8.66664 0ZM15.321 10C15.321 14.52 12.4881 18.69 8.66664 19.93C4.84516 18.69 2.01232 14.52 2.01232 10V5.3L8.66664 2.19L15.321 5.3V10Z"
        clipRule="evenodd"
      ></path>
      <path d="M4.11108 9L13.1111 9" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M4.11108 12L13.1111 12" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M10.6667 6.11108L10.6667 20.7778" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M8.11108 6.11108L8.11108 20.7778" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
      <path d="M4.11108 6L13.1111 6" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd" fillRule="evenodd"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon4

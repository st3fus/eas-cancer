import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileLevelIcon1(props) {
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
        d="M8.77772 0L0.222168 4V10C0.222168 15.55 3.87254 20.74 8.77772 22C13.6829 20.74 17.3333 15.55 17.3333 10V4L8.77772 0ZM15.432 10C15.432 14.52 12.5992 18.69 8.77772 19.93C4.95624 18.69 2.1234 14.52 2.1234 10V5.3L8.77772 2.19L15.432 5.3V10Z"
        clipRule="evenodd"
      ></path>
      <path d="M4.5 11H13.0556" stroke="${props.fill}" stroke-width="1.3" clipRule="evenodd"    fillRule="evenodd"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default ProfileLevelIcon1

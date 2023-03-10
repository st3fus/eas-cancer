import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileEduIcon(props) {
	const xml = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.08301 21.0002V8.16683C4.08301 3.50016 5.24967 2.3335 9.91634 2.3335H18.083C22.7497 2.3335 23.9163 3.50016 23.9163 8.16683V19.8335C23.9163 19.9968 23.9163 20.1602 23.9047 20.3235" stroke="#082D4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.40801 17.5H23.9163V21.5833C23.9163 23.835 22.0847 25.6667 19.833 25.6667H8.16634C5.91467 25.6667 4.08301 23.835 4.08301 21.5833V20.825C4.08301 18.9933 5.57634 17.5 7.40801 17.5Z" stroke="#082D4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33301 8.1665H18.6663" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33301 12.25H15.1663" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
    `
	return <SvgXml xml={xml} />
}

export default ProfileEduIcon

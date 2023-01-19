import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileTop10Icon(props) {
	const xml = `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.4997 25.6668H17.4997C23.333 25.6668 25.6663 23.3335 25.6663 17.5002V10.5002C25.6663 4.66683 23.333 2.3335 17.4997 2.3335H10.4997C4.66634 2.3335 2.33301 4.66683 2.33301 10.5002V17.5002C2.33301 23.3335 4.66634 25.6668 10.4997 25.6668Z" stroke="#082D4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.0833 21.5832C19.3667 21.5832 20.4167 20.5332 20.4167 19.2498V8.74984C20.4167 7.4665 19.3667 6.4165 18.0833 6.4165C16.8 6.4165 15.75 7.4665 15.75 8.74984V19.2498C15.75 20.5332 16.7883 21.5832 18.0833 21.5832Z" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.91634 21.5835C11.1997 21.5835 12.2497 20.5335 12.2497 19.2502V15.1668C12.2497 13.8835 11.1997 12.8335 9.91634 12.8335C8.63301 12.8335 7.58301 13.8835 7.58301 15.1668V19.2502C7.58301 20.5335 8.62134 21.5835 9.91634 21.5835Z" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
	return <SvgXml xml={xml} />
}

export default ProfileTop10Icon

import React from "react"
import { SvgXml } from "react-native-svg"
function DatePicker(props) {
	const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 36 36"
    >   
    <path
    fill="${props.fill}"
    d="M32.25 6H29v2h3v22H4V8h3V6H3.75A1.78 1.78 0 002 7.81v22.38A1.78 1.78 0 003.75 32h28.5A1.78 1.78 0 0034 30.19V7.81A1.781 1.781 0 0032.25 6z"
  ></path>
  <path
  fill="${props.fill}"
    d="M8 14h2v2H8v-2zM14 14h2v2h-2v-2zM20 14h2v2h-2v-2zM26 14h2v2h-2v-2zM8 19h2v2H8v-2zM14 19h2v2h-2v-2zM20 19h2v2h-2v-2zM26 19h2v2h-2v-2zM8 24h2v2H8v-2zM14 24h2v2h-2v-2zM20 24h2v2h-2v-2zM26 24h2v2h-2v-2zM10 10a1 1 0 001-1V3a1 1 0 00-2 0v6a1 1 0 001 1zM26 10a1 1 0 001-1V3a1 1 0 00-2 0v6a1 1 0 001 1zM13 6h10v2H13V6z"
  ></path>
    </svg>`
	return <SvgXml xml={xml} />
}

export default DatePicker

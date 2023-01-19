import React from "react"
import { SvgXml } from "react-native-svg"

function TabEdu(props) {
	const xml = `
    <svg
    width="${props.width}"
    height="${props.height}"
    viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.20703 16.5002V6.41683C3.20703 2.75016 4.1237 1.8335 7.79036 1.8335H14.207C17.8737 1.8335 18.7904 2.75016 18.7904 6.41683V15.5835C18.7904 15.7118 18.7904 15.8402 18.7812 15.9685" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.81953 13.75H18.7904V16.9583C18.7904 18.7275 17.3512 20.1667 15.582 20.1667H6.41536C4.6462 20.1667 3.20703 18.7275 3.20703 16.9583V16.3625C3.20703 14.9233 4.38036 13.75 5.81953 13.75Z" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.33203 6.4165H14.6654" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.33203 9.625H11.9154" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
    `
	return <SvgXml xml={xml} />
}

export default TabEdu

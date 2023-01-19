import React from "react"
import { SvgXml } from "react-native-svg"

function TabBurger(props) {
	const xml = `
    <svg 
    width="${props.width}"
    height="${props.height}"
      viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.25 9.91602H29.75" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" />
    <path d="M4.25 17H29.75" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" />
    <path d="M4.25 24.084H29.75" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" />
  </svg>
    `
	return <SvgXml xml={xml} />
}

export default TabBurger

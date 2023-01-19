import React from "react"
import { SvgXml } from "react-native-svg"

function BurgerMenu(props) {
	const xml = `
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.25 9.9165H29.75" stroke="#F5FEFF" stroke-width="1.5" stroke-linecap="round" />
        <path d="M4.25 17H29.75" stroke="#F5FEFF" stroke-width="1.5" stroke-linecap="round" />
        <path d="M4.25 24.0835H29.75" stroke="#F5FEFF" stroke-width="1.5" stroke-linecap="round" />
    </svg>`
	return <SvgXml xml={xml} />
}

export default BurgerMenu

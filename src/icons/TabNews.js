import React from "react"
import { SvgXml } from "react-native-svg"

function TabNews(props) {
	const xml = `
    <svg       
        width="${props.width}"
        height="${props.height}"
        viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3346 9.16683V13.7502C18.3346 18.3335 16.668 20.1668 12.5013 20.1668H7.5013C3.33464 20.1668 1.66797 18.3335 1.66797 13.7502V8.25016C1.66797 3.66683 3.33464 1.8335 7.5013 1.8335H11.668" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.3346 9.16683H15.0013C12.5013 9.16683 11.668 8.25016 11.668 5.50016V1.8335L18.3346 9.16683Z" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.83203 11.9165H10.832" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M5.83203 15.5835H9.16537" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    `
	return <SvgXml xml={xml} />
}

export default TabNews

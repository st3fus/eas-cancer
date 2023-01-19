import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileDocsIcon(props) {
	const xml = `
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  		<path d="M25.6673 12.833V19.833C25.6673 24.4997 24.5007 25.6663 19.834 25.6663H8.16732C3.50065 25.6663 2.33398 24.4997 2.33398 19.833V8.16634C2.33398 3.49967 3.50065 2.33301 8.16732 2.33301H9.91732C11.6673 2.33301 12.0523 2.84634 12.7173 3.73301L14.4673 6.06634C14.9107 6.64967 15.1673 6.99967 16.334 6.99967H19.834C24.5007 6.99967 25.6673 8.16634 25.6673 12.833Z" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" />
  		<path d="M9.33398 2.33301H19.834C22.1673 2.33301 23.334 3.49967 23.334 5.83301V7.44301" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
	`
	return <SvgXml xml={xml} />
}

export default ProfileDocsIcon

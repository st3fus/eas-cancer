import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileFormsIcon(props) {
	const xml = `
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33301 2.3335V5.8335" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.667 2.3335V5.8335" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.16699 15.1665H17.5003" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.16699 19.8335H14.0003" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.6667 4.0835C22.5517 4.2935 24.5 5.77516 24.5 11.2585V18.4685C24.5 23.2752 23.3333 25.6785 17.5 25.6785H10.5C4.66667 25.6785 3.5 23.2752 3.5 18.4685V11.2585C3.5 5.77516 5.44833 4.30516 9.33333 4.0835H18.6667Z" stroke="#F5FEFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	`
	return <SvgXml xml={xml} />
}

export default ProfileFormsIcon

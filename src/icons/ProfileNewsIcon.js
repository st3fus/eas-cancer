import React from "react"
import { SvgXml } from "react-native-svg"

function ProfileNewsIcon(props) {
	const xml = `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4997 25.6668H17.4997C23.333 25.6668 25.6663 23.3335 25.6663 17.5002V10.5002C25.6663 4.66683 23.333 2.3335 17.4997 2.3335H10.4997C4.66634 2.3335 2.33301 4.66683 2.33301 10.5002V17.5002C2.33301 23.3335 4.66634 25.6668 10.4997 25.6668Z" stroke="#082D4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.33301 15.1665H6.71967C7.60634 15.1665 8.41134 15.6681 8.80801 16.4615L9.84634 18.5498C10.4997 19.8331 11.6663 19.8331 11.9463 19.8331H16.0647C16.9513 19.8331 17.7563 19.3315 18.153 18.5381L19.1913 16.4498C19.588 15.6565 20.393 15.1548 21.2797 15.1548H25.643" stroke="#082D4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.0635 8.1665H15.9485" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.083 11.6665H16.9163" stroke="#EC5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
	return <SvgXml xml={xml} />
}

export default ProfileNewsIcon

import React from "react"
import { SvgXml } from "react-native-svg"

function TabForum(props) {
	const xml = `
    <svg 
    width="${props.width}"
    height="${props.height}"
     viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.4804 9.89084V13.5575C16.4804 13.7958 16.4712 14.025 16.4437 14.245C16.2329 16.72 14.7754 17.9483 12.0895 17.9483H11.7229C11.4937 17.9483 11.2737 18.0583 11.1362 18.2417L10.0362 19.7083C9.55038 20.3592 8.76203 20.3592 8.2762 19.7083L7.17619 18.2417C7.05702 18.0858 6.7912 17.9483 6.58953 17.9483H6.22287C3.29871 17.9483 1.83203 17.2242 1.83203 13.5575V9.89084C1.83203 7.20501 3.06954 5.74751 5.53537 5.53667C5.75537 5.50917 5.98454 5.5 6.22287 5.5H12.0895C15.0137 5.5 16.4804 6.96667 16.4804 9.89084Z" stroke="${props.fill}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M20.1488 6.22434V9.891C20.1488 12.586 18.9113 14.0343 16.4454 14.2452C16.4729 14.0252 16.4821 13.796 16.4821 13.5577V9.891C16.4821 6.96684 15.0154 5.50016 12.0913 5.50016H6.22461C5.98628 5.50016 5.75711 5.50934 5.53711 5.53684C5.74794 3.071 7.20544 1.8335 9.89128 1.8335H15.7579C18.6821 1.8335 20.1488 3.30017 20.1488 6.22434Z" stroke="${props.fill}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.3722 12.1458H12.3804" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.16124 12.1458H9.16949" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.95421 12.1458H5.96246" stroke="${props.fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
    `
	return <SvgXml xml={xml} />
}

export default TabForum

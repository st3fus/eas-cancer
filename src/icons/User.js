import React from "react"
import { SvgXml } from "react-native-svg"
function Icon(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 17 17"
    >
      <path
        fill="${props.fill}"
        fillRule="evenodd"
        d="M8.5 17a8.5 8.5 0 110-17 8.5 8.5 0 010 17zm5.718-4.54a6.955 6.955 0 10-11.435 0c.867-1.146 2.901-1.64 5.693-1.642-1.719-.01-3.067-1.227-3.067-3.863 0-1.735 1.22-3.091 3.091-3.091 1.866 0 3.09 1.485 3.09 3.245 0 2.523-1.363 3.698-3.066 3.71 2.792.002 4.827.495 5.694 1.64zm-1.109 1.248c-.226-.813-1.851-1.344-4.609-1.344s-4.383.53-4.609 1.344A6.928 6.928 0 008.5 15.454c1.768 0 3.382-.66 4.609-1.746zM6.955 6.955c0 1.753.632 2.318 1.545 2.318.91 0 1.546-.542 1.546-2.164 0-.965-.607-1.7-1.546-1.7-.978 0-1.545.63-1.545 1.546z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Icon

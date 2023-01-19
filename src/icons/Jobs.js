import React from "react"
import { SvgXml } from "react-native-svg"

const Jobs = (props) => {
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
        d="M10.2 3.4V1.7H6.8v1.7h3.4zM1.7 5.95v7.65c0 .468.383.85.85.85h11.9c.468 0 .85-.382.85-.85V5.95a.852.852 0 00-.85-.85H2.55a.852.852 0 00-.85.85zM15.3 3.4c.944 0 1.7.757 1.7 1.7v9.35c0 .944-.756 1.7-1.7 1.7H1.7c-.944 0-1.7-.756-1.7-1.7L.008 5.1c0-.943.748-1.7 1.692-1.7h3.4V1.7C5.1.756 5.856 0 6.8 0h3.4c.944 0 1.7.756 1.7 1.7v1.7h3.4z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Jobs

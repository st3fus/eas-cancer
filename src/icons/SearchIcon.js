import React from "react"
import { SvgXml } from "react-native-svg"

const SearchIcon = (props) => {
    const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="${props.fill}"
      fillRule="evenodd"
      d="M11.408 20.816c2.088 0 4.115-.7 5.76-1.986l5.17 5.17L24 22.337l-5.17-5.17a9.351 9.351 0 001.987-5.76C20.817 6.222 16.596 2 11.408 2 6.221 2 2 6.22 2 11.408c0 5.187 4.22 9.408 9.408 9.408zm0-16.464a7.063 7.063 0 017.056 7.056 7.063 7.063 0 01-7.056 7.056 7.063 7.063 0 01-7.056-7.056 7.063 7.063 0 017.056-7.056z"
      clipRule="evenodd"
    ></path>
  </svg>`
    return <SvgXml xml={xml} />
}

export default SearchIcon

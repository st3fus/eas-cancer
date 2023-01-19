import React from "react"
import { SvgXml } from "react-native-svg"

function Like(props) {
    const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        fill="${props.fill}"
        fillRule="evenodd"
        d="M15 7.5c0-1.262-.848-2.25-2.25-2.25h-2.305l.021-.057c.02-.056.08-.21.136-.36v-.001l.12-.318c.143-.383.248-.691.332-.996.127-.462.196-.878.196-1.268 0-1.104-.681-1.79-1.689-2.083A4.43 4.43 0 008.25 0h-.36l-.225.28c-.254.317-.754.888-1.33 1.546C5.273 3.04 3.95 4.552 3.428 5.313A1.5 1.5 0 003 5.25H1.5A1.5 1.5 0 000 6.75v6.75A1.5 1.5 0 001.5 15H3c.515 0 .97-.26 1.24-.656.228.147.481.27.757.369A5.055 5.055 0 006.776 15H12c2.066 0 3-3.042 3-7.5zm-9.497 5.801C4.839 13.064 4.5 12.677 4.5 12V6.75c0-.18.033-.34.106-.51.131-.306 1.32-1.663 2.447-2.948.582-.664 1.147-1.309 1.542-1.78.189.014.366.042.547.095.43.125.608.305.608.643 0 .237-.048.527-.142.869-.07.256-.162.526-.29.871l-.113.296v.001l-.146.386a6.093 6.093 0 00-.206.634c-.186.75.001 1.443.897 1.443h3c.518 0 .75.27.75.75 0 3.593-.739 6-1.5 6H6.722a3.61 3.61 0 01-1.22-.199zm-4.003.2V6.75H3v6.75H1.5z"
        clipRule="evenodd"
      ></path>
    </svg>`
    return <SvgXml xml={xml} />
}

export default Like
import React from "react"
import { SvgXml } from "react-native-svg"

const Comment = (props) => {
    const xml = `
    <svg width="${props.width}" height="${props.height}" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 14.8532L7.5651 12H13.5C14.3284 12 15 11.3284 15 10.5V1.5C15 0.671573 14.3284 0 13.5 0H1.5C0.671573 0 0 0.671573 0 1.5V10.5C0 11.3284 0.671573 12 1.5 12H3V14.8532ZM7.1349 10.5L4.5 12.1468V10.5H1.5V1.5H13.5V10.5H7.1349Z" fill="${props.fill}" />
</svg>`
    return <SvgXml xml={xml} />
}

export default Comment

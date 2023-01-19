import React from "react"
import { SvgXml } from "react-native-svg"

const Report = (props) => {
    const xml = `<svg width="${props.width}"  height="${props.height}" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.833 1.583H3.167c-.871 0-1.576.713-1.576 1.584l-.008 14.25L4.75 14.25h11.083c.871 0 1.584-.713 1.584-1.583v-9.5c0-.871-.713-1.584-1.584-1.584zm0 11.084H4.093l-.467.467-.46.459V3.167h12.667v9.5zM4.75 9.5h1.583v1.583H4.75V9.5zm0-2.375h1.583v1.583H4.75V7.125zm0-2.375h1.583v1.583H4.75V4.75zM7.917 9.5h3.958v1.583H7.917V9.5zm0-2.375h6.333v1.583H7.917V7.125zm0-2.375h6.333v1.583H7.917V4.75z"
    fill="${props.fill}" />
    </svg>`
    return <SvgXml xml={xml} />
}

export default Report

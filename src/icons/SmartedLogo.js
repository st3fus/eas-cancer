import React from "react"
import { SvgXml } from "react-native-svg"

const SmartedLogo = (props) => {
    const xml = `
    <svg width="${props.width}"
    height="${props.height}" viewBox="0 0 69 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48.361 51.804h7.745v2.173H50.6v2.424h4.877v2.16H50.6v2.454h5.724v2.16h-7.963V51.803zM58.64 63.163v-11.36h3.394a7.51 7.51 0 012.917.51c.74.299 1.402.764 1.934 1.359.481.555.846 1.2 1.072 1.899.223.682.337 1.394.338 2.112a5.498 5.498 0 01-.455 2.276 5.181 5.181 0 01-1.242 1.727 5.435 5.435 0 01-1.82 1.096 6.3 6.3 0 01-2.193.378l-3.945.003zm2.237-2.16h1.328a4.976 4.976 0 001.542-.234c.44-.135.847-.358 1.197-.655.34-.297.604-.67.772-1.089a4.527 4.527 0 00-.094-3.318 3.019 3.019 0 00-.894-1.087 3.285 3.285 0 00-1.089-.533 3.755 3.755 0 00-.939-.148h-1.823v7.065z" fill="#2290D3"/>
      <path d="M6.707 53.83a7.977 7.977 0 00-1.267-.517 4.42 4.42 0 00-1.342-.218 2.3 2.3 0 00-1.448.413 1.36 1.36 0 00-.54 1.126 1.248 1.248 0 00.352.9c.261.264.569.48.908.633.37.178.76.345 1.173.5.352.13.696.278 1.03.445.342.167.658.38.94.634.28.258.505.572.657.922.169.428.249.886.234 1.345a3.05 3.05 0 01-1.72 2.8c-.619.296-1.3.44-1.985.42a6.085 6.085 0 01-2.666-.608A9.06 9.06 0 010 62.053l.671-1.188c.274.19.562.36.861.507.325.163.666.292 1.017.385.336.092.683.139 1.032.14.363 0 .723-.063 1.063-.187.334-.12.63-.325.86-.596.241-.305.364-.688.344-1.077.01-.344-.098-.68-.305-.956a2.604 2.604 0 00-.798-.664 8.348 8.348 0 00-1.07-.492 10.927 10.927 0 01-1.093-.428 5.31 5.31 0 01-1.003-.603 2.816 2.816 0 01-.75-.868 2.52 2.52 0 01-.29-1.25 2.793 2.793 0 01.43-1.555c.29-.447.696-.81 1.174-1.049a4.032 4.032 0 011.72-.413 6.354 6.354 0 011.931.266 7.204 7.204 0 011.479.64l-.566 1.164zM9.96 63.116V51.452h.014l5.928 8.427-.643-.14 5.926-8.287h.016v11.664h-1.516v-8.214l.108.765-4.252 6.026h-.03l-4.333-6.035.251-.705v8.163H9.96zM23.328 63.116l4.928-11.774h.094l4.928 11.774h-1.734l-3.692-9.388 1.08-.704-4.112 10.092h-1.492zm2.893-4.283h4.206l.5 1.312h-5.145l.44-1.312zM38.415 51.811a5.331 5.331 0 011.587.235c.462.138.893.366 1.267.67.36.3.65.678.845 1.104.21.472.315.985.305 1.502 0 .444-.066.886-.195 1.312-.13.431-.35.83-.643 1.173a3.216 3.216 0 01-1.173.843c-.574.23-1.19.34-1.807.321h-1.674v4.159h-1.513V51.81h3.001zm.157 5.677c.383.013.764-.057 1.118-.204.273-.115.515-.294.704-.523.16-.203.282-.434.359-.681.071-.228.108-.465.11-.704a2.178 2.178 0 00-.493-1.382 1.976 1.976 0 00-.673-.526 2.301 2.301 0 00-1.01-.202h-1.75v4.224l1.636-.002zm1.862.875l2.954 4.753h-1.75L38.62 58.41l1.814-.047zM44.717 51.811h7.521v1.462h-3.034v9.857h-1.516v-9.857h-2.971v-1.462zM34.151 3.933V0a20.549 20.549 0 00-20.525 20.523c0 .664.035 1.319.098 1.967h20.418v-3.934H17.68a16.613 16.613 0 0116.47-14.623z" fill="#141A20"/>
      <path d="M54.578 18.556h-3.96a16.564 16.564 0 01-14.5 18.437V18.556h-3.936V40.95c.648.062 1.304.094 1.97.096a20.546 20.546 0 0020.53-20.523c0-.664-.043-1.319-.104-1.967z" fill="#2290D3"/>
      <path d="M28.57 36.141a16.662 16.662 0 01-10.03-10.035h-4.135A20.608 20.608 0 0028.57 40.272v-4.13z" fill="#141A20"/>
      <path d="M40.028 4.565a16.662 16.662 0 0110.04 10.037h4.125A20.608 20.608 0 0040.028.437v4.128z" fill="#2290D3"/>
    </svg>`
    return <SvgXml xml={xml} />
}

export default SmartedLogo

import React from "react"
import { SvgXml } from "react-native-svg"

const Hourglass = (props) => {
    const xml = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${props.width}"
    height="${props.height}"
    fill="none"
    viewBox="0 0 19 25"
  >
  <path
  fill="${props.fill}"
  d="M18.293 2.735c.39 0 .707-.343.707-.765V.764C19 .342 18.683 0 18.293 0H1.373C.984 0 .668.342.668.764V1.97c0 .422.316.764.707.764h.439v19.531h-.44c-.39 0-.706.342-.706.764v1.206c0 .422.316.765.707.765h16.919c.39 0 .707-.343.707-.765V23.03c0-.422-.317-.764-.707-.764h-.439V2.735h.439zM2.576 22.265V2.736h.719c-.186 0-.337.14-.337.312v.937c0 .173.15.311.335.313 0 3.454.552 6.81 4.554 7.967l.198.062c.173.055.38.12.486.174-.106.053-.31.118-.482.172l-.19.06c-4.013 1.161-4.566 4.518-4.566 7.971-.185.002-.334.14-.334.312v.938c0 .172.15.313.336.313h-.719zm12.278-1.953c-.359-3.216-5.02-5.172-5.02-5.172s-4.663 1.956-5.022 5.172H4.06c.064-4.142 1.172-6.008 4.019-6.832l.195-.06c.547-.173 1.064-.337 1.064-.92s-.518-.747-1.068-.92l-.203-.064C5.23 10.696 4.123 8.83 4.06 4.688h11.547c-.063 4.143-1.172 6.01-4.017 6.832l-.19.06c-.55.172-1.07.336-1.07.92 0 .583.517.747 1.065.92l.205.064c2.836.82 3.944 2.686 4.008 6.829h-.754zm2.236 1.954h-.718c.185 0 .336-.14.336-.313v-.938c0-.172-.15-.31-.334-.311 0-3.455-.553-6.812-4.555-7.968l-.2-.064a4.125 4.125 0 01-.483-.172c.106-.053.314-.118.487-.173l.185-.06c4.013-1.16 4.566-4.516 4.566-7.97.184-.001.334-.14.334-.313v-.937c0-.173-.15-.312-.336-.312h.718v19.53"
></path>
   
  </svg>`
    return <SvgXml xml={xml} />
}

export default Hourglass
import { SvgXml } from "react-native-svg"

const Locker = (props) => {
	const xml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${props.width}"
      height="${props.height}"
      fill="none"
      viewBox="0 0 27 28"
    >
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.75 11.677V9.354c0-3.843 1.125-6.967 6.75-6.967s6.75 3.124 6.75 6.967v2.323M13.5 21.548c1.553 0 2.812-1.3 2.812-2.903 0-1.604-1.259-2.903-2.812-2.903s-2.813 1.3-2.813 2.903 1.26 2.903 2.813 2.903z"
      ></path>
      <path
        stroke="${props.fill}"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19.125 25.613H7.875c-4.5 0-5.625-1.161-5.625-5.806v-2.323c0-4.645 1.125-5.806 5.625-5.806h11.25c4.5 0 5.625 1.161 5.625 5.806v2.323c0 4.645-1.125 5.806-5.625 5.806z"
      ></path>
    </svg>`
	return <SvgXml xml={xml} />
}

export default Locker

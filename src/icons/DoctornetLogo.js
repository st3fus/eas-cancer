import React from "react"
import { SvgXml } from "react-native-svg"

const DoctornetLogo = (props) => {
    const xml = `
<svg width="${props.width}"
height="${props.height}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9985 9.83405C14.0707 10.1678 14.1158 10.5106 14.1158 10.8534C14.1158 12.1705 13.5655 13.3613 12.6634 14.2274C11.7703 15.0844 10.5434 15.6166 9.18118 15.6166C7.81898 15.6166 6.59209 15.0844 5.699 14.2274C4.8059 13.3613 4.24658 12.1705 4.24658 10.8534C4.24658 10.5106 4.28267 10.1769 4.35484 9.8521C4.40896 9.62657 4.47211 9.40104 4.5533 9.18453C4.69764 8.82368 4.9773 8.41772 5.4464 8.41772C5.65389 8.41772 5.84333 8.49892 5.97865 8.62521C6.12299 8.76053 6.2132 8.94095 6.2132 9.14844C6.2132 9.35593 6.12299 9.53635 5.97865 9.67167C5.84333 9.79797 5.65389 9.87916 5.4464 9.87916C5.275 9.87916 5.11262 9.82503 4.9773 9.73482C4.95024 9.81601 4.93219 9.8972 4.91415 9.97839C4.851 10.258 4.82394 10.5557 4.82394 10.8534C4.82394 12.0082 5.31108 13.0546 6.09593 13.8124C6.88077 14.5702 7.97234 15.0393 9.17216 15.0393C10.372 15.0393 11.4635 14.5702 12.2484 13.8124C13.0332 13.0546 13.5204 12.0082 13.5204 10.8534C13.5204 10.5467 13.4843 10.24 13.4211 9.96035C13.4031 9.8972 13.3851 9.82503 13.367 9.76188C13.2407 9.84307 13.0964 9.88818 12.934 9.88818C12.7265 9.88818 12.5371 9.80699 12.4017 9.68069C12.2574 9.54537 12.1672 9.36495 12.1672 9.15746C12.1672 8.94998 12.2574 8.76955 12.4017 8.63423C12.5371 8.50794 12.7265 8.42675 12.934 8.42675C13.6377 8.42675 13.8542 9.27474 13.9805 9.83405H13.9985Z" fill="#006973" />
  <path d="M14.4235 7.03758C15.2535 8.10208 15.7497 9.42819 15.7497 10.8626C15.7497 12.0443 15.4159 13.1449 14.8295 14.0922C14.2251 15.0755 13.359 15.8784 12.3306 16.4286C11.0226 17.1233 9.17321 17.2857 8.90258 15.4724C8.89355 15.4363 8.89355 15.3912 8.89355 15.3461L9.47091 15.31C9.47091 15.3281 9.47091 15.3551 9.47993 15.3822C9.68742 16.7895 11.203 16.3745 12.06 15.9144C13.0072 15.4183 13.7921 14.6785 14.3424 13.7854C14.8656 12.9284 15.1723 11.9271 15.1723 10.8535C15.1723 9.54547 14.7212 8.34565 13.9635 7.38038C13.3049 6.54141 11.1489 4.61989 9.91295 5.61223C9.75959 5.7295 9.64231 5.88286 9.57014 6.04524C9.47091 6.25273 9.47091 6.37903 9.47091 6.60456V9.79806H8.89355V6.56847C8.89355 6.33392 8.89355 6.22567 8.97475 5.99112C9.083 5.6844 9.28147 5.3867 9.56112 5.17019C11.1759 3.87114 13.5395 5.9009 14.4326 7.03758H14.4235Z" fill="#006973" />
  <path d="M9.18131 9.50806C9.55117 9.50806 9.89398 9.66142 10.1376 9.90499C10.3811 10.1486 10.5345 10.4914 10.5345 10.8612C10.5345 11.2311 10.3811 11.5739 10.1376 11.8175C9.89398 12.0611 9.55117 12.2144 9.18131 12.2144C8.80241 12.2144 8.46863 12.0611 8.22506 11.8175C7.98149 11.5739 7.82812 11.2311 7.82812 10.8612C7.82812 10.4914 7.98149 10.1486 8.22506 9.90499C8.46863 9.66142 8.81144 9.50806 9.18131 9.50806ZM9.7316 10.32C9.58726 10.1756 9.39781 10.0944 9.18131 10.0944C8.9648 10.0944 8.77535 10.1846 8.63101 10.32C8.48667 10.4643 8.40548 10.6537 8.40548 10.8703C8.40548 11.0868 8.49569 11.2762 8.63101 11.4206C8.77535 11.5649 8.9648 11.6461 9.18131 11.6461C9.39781 11.6461 9.58726 11.5559 9.7316 11.4206C9.87594 11.2762 9.95713 11.0868 9.95713 10.8703C9.95713 10.6537 9.86692 10.4643 9.7316 10.32Z" fill="#006973" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.18155 10.4287C9.4161 10.4287 9.61457 10.6182 9.61457 10.8617C9.61457 11.0963 9.42513 11.2947 9.18155 11.2947C8.947 11.2947 8.74854 11.1053 8.74854 10.8617C8.74854 10.6272 8.93798 10.4287 9.18155 10.4287Z" fill="#006973" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.98355 3.87866C3.42559 3.87866 3.78644 4.23951 3.78644 4.68155C3.78644 5.12359 3.42559 5.48444 2.98355 5.48444C2.54151 5.48444 2.18066 5.12359 2.18066 4.68155C2.18066 4.23951 2.54151 3.87866 2.98355 3.87866Z" fill="#00ADB5" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9118 3.96021C16.3538 3.96021 16.7147 4.32105 16.7147 4.76309C16.7147 5.20513 16.3538 5.56598 15.9118 5.56598C15.4697 5.56598 15.1089 5.20513 15.1089 4.76309C15.1089 4.32105 15.4697 3.96021 15.9118 3.96021Z" fill="#00AFEF" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27225 10.8977C2.56093 10.8977 2.79548 11.1323 2.79548 11.4209C2.79548 11.7096 2.56093 11.9442 2.27225 11.9442C1.98357 11.9442 1.74902 11.7096 1.74902 11.4209C1.74902 11.1323 1.98357 10.8977 2.27225 10.8977Z" fill="#00ADB5" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.01708 3.08569C8.42304 3.08569 8.75682 3.41948 8.75682 3.82543C8.75682 4.23139 8.42304 4.56517 8.01708 4.56517C7.61113 4.56517 7.27734 4.23139 7.27734 3.82543C7.27734 3.41948 7.61113 3.08569 8.01708 3.08569Z" fill="#00ADB5" />
  <path d="M8.15343 9.96846L2.91211 4.74518L3.04743 4.60986L8.29776 9.83314L8.15343 9.96846Z" fill="#00ADB5" />
  <path d="M2.96484 4.58358L7.99867 3.72656L8.03476 3.91601L3.00093 4.77302L2.96484 4.58358Z" fill="#00ADB5" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6083 11.9724C17.9601 11.9724 18.2488 12.2611 18.2488 12.6129C18.2488 12.9647 17.9601 13.2534 17.6083 13.2534C17.2565 13.2534 16.9678 12.9647 16.9678 12.6129C16.9678 12.2611 17.2565 11.9724 17.6083 11.9724Z" fill="#00ADB5" />
  <path d="M17.4922 12.6112L17.5102 9.04785L17.6997 9.05687L17.6816 12.6202L17.4922 12.6112Z" fill="#00ADB5" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6083 8.41772C17.9601 8.41772 18.2488 8.7064 18.2488 9.05823C18.2488 9.41006 17.9601 9.69873 17.6083 9.69873C17.2565 9.69873 16.9678 9.41006 16.9678 9.05823C16.9678 8.7064 17.2565 8.41772 17.6083 8.41772Z" fill="#00AFEF" />
</svg>`
    return <SvgXml xml={xml} />
}
export default DoctornetLogo
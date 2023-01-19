import { Button } from "native-base"
import CheckIcon from "../icons/CheckIcon"
import Locker from "../icons/Locker"
import ReloadIcon from "../icons/ReloadIcon"
import SearchIcon from "../icons/SearchIcon"
import WhiteArrowIcon from "../icons/WhiteArrowIcon"
import XIcon from "../icons/XIcon"
import useConfig from "../utils/config"

const CustomButton = ({ text, textColorContrast, onPress, icon, style, disabled, bgOnPress, bg, ...props }) => {
	const colors = useConfig().colors
	const handleIcon = () => {
		switch (icon) {
			case "arrow":
				return <WhiteArrowIcon width={20} height={20} fill={colors.bg} />

			case "arrowDark":
				return <WhiteArrowIcon width={20} height={20} fill={colors.dark} />

			case "searchIcon":
				return <SearchIcon width={20} height={20} fill={colors.bg} />

			case "checkIcon":
				return <CheckIcon width={18} height={14} fill={colors.bg} />

			case "checkIconDark":
				return <CheckIcon width={18} height={14} fill={colors.dark} />

			case "xIcon":
				return <XIcon width={22} height={22} fill={colors.bg} />

			case "reloadIcon":
				return <ReloadIcon width={20} height={20} fill={colors.bg} />
			case "lockerIcon":
				return <Locker width={24} height={24} fill={"#525252"} />
		}
	}

	return (
		<Button
			onPress={onPress}
			borderRadius={10}
			rightIcon={icon ? handleIcon() : null}
			bg={bg}
			_pressed={{ opacity: 0.7, bg: bg }}
			_hover={{ opacity: 0.9 }}
			_text={{
				fontSize: 12,
				// default button text color is better solution becouse of color contrast ratio automatic! , alternative custom solution is line bellow
				color: textColorContrast ? null : colors.bg,
			}}
			disabled={disabled}
			{...props}
		>
			{text}
		</Button>
	)
}

export default CustomButton

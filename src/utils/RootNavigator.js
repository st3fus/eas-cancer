import { createRef } from "react"

export const navigationRef = createRef(null)

export const navigate = (name, params) => {
	if (navigationRef.current) {
		navigationRef.current.navigate({
			name: name,
			params: params,
		})
	}
}

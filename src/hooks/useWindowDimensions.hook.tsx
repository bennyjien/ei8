import { useCallback, useEffect, useState } from "react"

export default function useWindowDimensions() {
	const hasWindow = typeof window !== `undefined`

	const getWindowDimensions = useCallback(() => {
		const windowWidth = hasWindow ? window.innerWidth : null
		const windowHeight = hasWindow ? window.innerHeight : null
		return {
			windowWidth,
			windowHeight
		}
	}, [hasWindow])

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	)

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}

		if (hasWindow) {
			window.addEventListener(`resize`, handleResize)
			return () => window.removeEventListener(`resize`, handleResize)
		}
	}, [getWindowDimensions, hasWindow])

	return windowDimensions
}

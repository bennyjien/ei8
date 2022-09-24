import { useRef } from "react"
import { toastsVar } from "src/store/apollo.store"

interface Props {
	code: number
	success: boolean
	message: string
	align?: `global` | `app`
}

export default function useToast() {
	const timerRef = useRef(null)

	const autohide = 4000

	function setupToastClearer() {
		timerRef.current = setTimeout(function () {
			toastsVar([])
		}, autohide + 500)
	}

	function cancelToastClearer() {
		clearTimeout(timerRef.current)
	}

	function setToast(data: Props) {
		cancelToastClearer()
		setupToastClearer()

		const { code, success, message, align = `app` } = data
		const newToast = {
			text: message,
			footnote: !success && code ? `Error code: ${code}` : ``,
			type: success ? `success` : `error`,
			align,
			autohide
		}

		toastsVar([...toastsVar(), newToast])

		if (!success) {
			console.dir(data)
		}
	}

	return { setToast }
}

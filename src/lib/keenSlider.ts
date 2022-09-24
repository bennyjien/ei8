import { KeenSliderPlugin } from "keen-slider"

export const WheelControls: KeenSliderPlugin = (slider) => {
	let touchTimeout: ReturnType<typeof setTimeout>
	let position: {
		x: number
		y: number
	}
	let wheelActive: boolean

	const isDesktop = window.matchMedia(`(min-width: 1024px)`).matches

	function dispatch(e: WheelEvent, name: string) {
		position.x -= e.deltaX
		position.y -= e.deltaY
		slider.container.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					x: position.x,
					y: position.y
				}
			})
		)
	}

	function wheelStart(e: WheelEvent) {
		position = {
			x: e.pageX,
			y: e.pageY
		}
		dispatch(e, `ksDragStart`)
	}

	function wheel(e: WheelEvent) {
		dispatch(e, `ksDrag`)
	}

	function wheelEnd(e: WheelEvent) {
		dispatch(e, `ksDragEnd`)
	}

	function eventWheel(e: WheelEvent) {
		e.preventDefault()
		if (!wheelActive) {
			wheelStart(e)
			wheelActive = true
		}
		wheel(e)
		clearTimeout(touchTimeout)
		touchTimeout = setTimeout(() => {
			wheelActive = false
			wheelEnd(e)
		}, 50)
	}

	if (isDesktop) {
		slider.on(`created`, () => {
			slider.container.addEventListener(`wheel`, eventWheel, {
				passive: false
			})
		})
	}
}

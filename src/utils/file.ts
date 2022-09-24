export function getExtension(filepath: string) {
	if (typeof filepath === `string`) {
		return filepath.split(`?`)[0].split(`#`)[0].split(`.`).pop()
	}
}

export function getExtensionType(filepath: string) {
	if (typeof filepath === `string`) {
		const extension = filepath.split(`?`)[0].split(`#`)[0].split(`.`).pop()
		let extensionType = undefined

		if (
			extension === `jpg` ||
			extension === `jpeg` ||
			extension === `png` ||
			extension === `gif` ||
			extension === `svg`
		) {
			extensionType = `image`
		}

		if (extension === `mp4`) {
			extensionType = `video`
		}

		if (extension === `pdf`) {
			extensionType = `pdf`
		}

		return extensionType
	}
}

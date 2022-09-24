export function revalidateData(paths: any[]) {
	const body = {
		revalidatePaths: paths
	}

	fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY}`, {
		headers: {
			"Content-Type": `application/json`
		},
		method: `POST`,
		body: JSON.stringify(body)
	})
}

export function parseMetaData(data) {
	if (!data?.meta) return

	const { meta, ...restData } = data
	let parsedMeta = {}

	meta.forEach((meta) => {
		if (meta.id) {
			parsedMeta = {
				...parsedMeta,
				[meta.name]: {
					id: meta.id,
					...meta.value
				}
			}
		} else {
			parsedMeta = {
				...parsedMeta,
				[meta.name]: {
					...meta.value
				}
			}
		}
	})

	return {
		...restData,
		meta: {
			...parsedMeta
		}
	}
}

export function parseSettingsData(data) {
	if (!data) return

	let parsedSetting = {}

	data.forEach((setting) => {
		parsedSetting = {
			...parsedSetting,
			[setting.name]: setting.value
		}
	})

	return {
		settings: parsedSetting
	}
}

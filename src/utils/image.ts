import { SupabaseStorageUpsert } from "@lib/supabase"
import { getExtension } from "./file"

interface FormData {
	file: FileWithDimension | string
	size?: {
		width: number
		height: number
	}
}

interface FileWithDimension extends File {
	width: number
	height: number
}

interface ImageMeta {
	file: string
	size?: {
		width: number
		height: number
	}
}

export async function upsertImage(
	filename: string,
	formData: FileWithDimension | FormData
): Promise<ImageMeta> {
	const payload: ImageMeta = {
		file: undefined
	}

	if (formData instanceof File) {
		payload.file = await SupabaseStorageUpsert(
			`${filename}.${getExtension(formData.name)}`,
			formData
		)

		if (formData.width && formData.height) {
			const { width, height } = formData

			payload.size = {
				width,
				height
			}
		}
	} else if (typeof formData.file === `string` && formData.file !== ``) {
		payload.file = formData.file
		payload.size = {
			width: formData.size?.width,
			height: formData.size?.height
		}
	}

	return payload
}

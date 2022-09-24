import {
	ApolloCache,
	DefaultContext,
	MutationFunctionOptions,
	OperationVariables
} from "@apollo/client"
import _ from "lodash"
import { revalidateData } from "./data"
import { upsertImage } from "./image"

export async function createPageData(
	createPage,
	pageId,
	parentId,
	formData,
	revalidatePaths = []
) {
	let meta = []

	if (formData.meta) {
		meta = Object.entries(formData.meta).map((meta: any) => {
			if (!meta[1].id) {
				return {
					name: meta[0],
					value: meta[1]
				}
			} else {
				const { id, ...restMetadata } = meta[1]

				return {
					id,
					name: meta[0],
					value: restMetadata
				}
			}
		})
	}

	try {
		const { data } = await createPage({
			variables: {
				input: {
					id: pageId,
					title: formData.title,
					sortOrder: formData.sortOrder,
					parentId: parentId,
					meta
				}
			}
		})

		if (revalidatePaths.length > 0) {
			revalidateData(revalidatePaths)
		}

		return data
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export async function updatePageData(
	updatePage: (
		options?: MutationFunctionOptions<
			any,
			OperationVariables,
			DefaultContext,
			ApolloCache<any>
		>
	) => Promise<any>,
	pageId: string,
	formData: any,
	fileNames: string[] = [],
	revalidatePaths: string[] = [],
	fileUploadTime = false
) {
	let meta = []

	try {
		if (fileNames.length) {
			await Promise.all(
				fileNames.map(async (fileName) => {
					const fileObject = _.get(formData, fileName)

					if (fileObject) {
						const n = fileName.split(`.`)
						let uniqueFileName = `${pageId}-${n.join(`-`)}`

						if (fileUploadTime) {
							uniqueFileName = `${uniqueFileName}-${Date.now()}`
						}

						const imageData = await upsertImage(uniqueFileName, fileObject)

						_.update(formData, fileName, () => imageData)
					}
				})
			)
		}

		if (formData.meta) {
			meta = Object.entries(formData.meta).map((meta: any) => {
				if (!meta[1].id) {
					return {
						name: meta[0],
						value: meta[1]
					}
				} else {
					const { id, ...restMetadata } = meta[1]

					return {
						id,
						name: meta[0],
						value: restMetadata
					}
				}
			})
		}

		const { data } = await updatePage({
			variables: {
				input: {
					id: pageId,
					title: formData.title,
					sortOrder: formData.sortOrder,
					parentId: formData.parentId,
					meta
				}
			}
		})

		if (revalidatePaths.length > 0) {
			revalidateData(revalidatePaths)
		}

		return data
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

export async function deletePageData(deletePage, pageId, revalidatePaths = []) {
	try {
		const { data } = await deletePage({
			variables: {
				id: pageId
			}
		})

		if (revalidatePaths.length > 0) {
			revalidateData(revalidatePaths)
		}

		return data
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

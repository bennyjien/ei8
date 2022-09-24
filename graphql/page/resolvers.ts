import { parseMetaData } from "@utils/data"
import { Context } from "../context"

const queries = {
	page: async (_parent, args, context: Context) => {
		const page = await context.prisma.page.findUnique({
			where: { id: args.id },
			include: {
				meta: true,
				subpages: {
					orderBy: [
						{
							sortOrder: `asc`
						},
						{
							createdAt: `asc`
						}
					],
					include: {
						meta: true
					}
				}
			}
		})

		return parseMetaData(page)
	}
}

const mutations = {
	createPage: async (_parent, args, context: Context) => {
		try {
			const { id: pageId, title, sortOrder, meta, ...restInput } = args.input

			const parentId = restInput.parentId || null
			let parsedUrl

			if (parentId) {
				parsedUrl = `/${parentId}/${pageId}`
			} else {
				parsedUrl = `/${pageId}`
			}

			const page = await context.prisma.page.create({
				data: {
					id: pageId,
					title,
					url: parsedUrl,
					sortOrder,
					parentId,
					...restInput
				},
				include: {
					meta: true
				}
			})

			if (meta.length) {
				await Promise.all(
					meta.map(async (meta) => {
						const { name, value } = meta

						return await context.prisma.pageMeta.create({
							data: {
								name,
								pageId,
								value
							}
						})
					})
				)
			}

			return {
				code: `200`,
				success: true,
				message: `Successfully create new page`,
				page
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	},
	updatePage: async (_parent, args, context: Context) => {
		try {
			const { id: pageId, title, sortOrder, meta, ...restInput } = args.input

			const parentId = restInput.parentId || null
			let parsedUrl

			if (parentId) {
				parsedUrl = `/${parentId}/${pageId}`
			} else {
				parsedUrl = `/${pageId}`
			}

			const page = await context.prisma.page.upsert({
				where: { id: pageId },
				update: {
					title,
					sortOrder,
					parentId,
					...restInput
				},
				create: {
					id: pageId,
					title,
					url: parsedUrl,
					sortOrder,
					parentId,
					...restInput
				},
				include: {
					meta: true
				}
			})

			if (meta.length) {
				await Promise.all(
					meta.map(async (meta) => {
						if (meta.id) {
							const { id: metaId, name, value } = meta

							return await context.prisma.pageMeta.update({
								where: { id: metaId },
								data: {
									name,
									value
								}
							})
						} else {
							const { name, value } = meta

							return await context.prisma.pageMeta.create({
								data: {
									name,
									pageId,
									value
								}
							})
						}
					})
				)
			}

			return {
				code: `200`,
				success: true,
				message: `Successfully update page`,
				page
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	},
	deletePage: async (_parent, args, context: Context) => {
		try {
			const page = await context.prisma.page.delete({
				where: { id: args.id }
			})

			return {
				code: `200`,
				success: true,
				message: `Successfully delete page`,
				page
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	}
}

export const resolvers = { queries, mutations }

import { Context } from "../context"

const queries = {
	template: async (_parent, args, context: Context) => {
		return {}
	}
}

const mutations = {
	createTemplate: async (_parent, args, context: Context) => {
		try {
			// NOTE: write prisma create query here
			// const template = await context.prisma.template.create({
			// 	data: {
			// 		...args.input
			// 	}
			// })
			const template = { args }

			return {
				code: `200`,
				success: true,
				message: `Successfully create new template`,
				template
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	},
	updateTemplate: async (_parent, args, context: Context) => {
		try {
			const { id, ...rest } = args.input
			// NOTE: write prisma update query here
			// const template = await context.prisma.template.update({
			// 	where: { id },
			// 	data: {
			// 		...rest
			// 	}
			// })
			const template = { id, rest }

			return {
				code: `200`,
				success: true,
				message: `Successfully update template`,
				template
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	},
	deleteTemplate: async (_parent, args, context: Context) => {
		try {
			// NOTE: write prisma delete query here
			// const template = await context.prisma.template.delete({
			// 	where: { id: args.id }
			// })
			const template = {}

			return {
				code: `200`,
				success: true,
				message: `Successfully delete template`,
				template
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	}
}

export const resolvers = { queries, mutations }

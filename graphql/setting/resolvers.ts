import { Context } from "../context"

const queries = {
	settings: async (_parent, _args, context: Context) => {
		const settings = await context.prisma.setting.findMany()

		return settings
	}
}

const mutations = {
	updateGeneralSettings: async (_parent, args, context: Context) => {
		let settings = []

		try {
			await Promise.all(
				(settings = args.inputs.map(async (input) => {
					const { name, value } = input

					return await context.prisma.setting.upsert({
						where: { name },
						update: { value },
						create: {
							name,
							value
						}
					})
				}))
			)

			return {
				code: `200`,
				success: true,
				message: `Succesfully update settings`,
				settings
			}
		} catch (error) {
			console.log(error)
			throw new Error(error)
		}
	}
}

export const resolvers = { queries, mutations }

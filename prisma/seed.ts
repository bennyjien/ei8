import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const pages = [
	{
		id: `home`,
		url: `/home`,
		title: `Home`
	},
	{
		id: `about`,
		url: `/about`,
		title: `About`
	}
]

const users = [
	{
		name: `Benny Jien`,
		username: `bennyjien`,
		password: `$2b$10$AantRulvuVA5tutvfb1z.Ok71JGhPT0DakOJE0UQ874uPWd/N1Xx2`,
		role: `superadmin`
	}
]

const userRoles = [
	{
		id: `superadmin`,
		name: `Super Admin`,
		read: [
			`home`,
			`about`,
			`settings-general`,
			`settings-navigation`,
			`settings-users`
		],
		write: [
			`home`,
			`about`,
			`settings-general`,
			`settings-navigation`,
			`settings-users`
		]
	},
	{
		id: `admin`,
		name: `Admin`,
		read: [
			`home`,
			`about`,
			`settings-general`,
			`settings-navigation`,
			`settings-users`
		],
		write: [`home`, `about`]
	},
	{
		id: `user`,
		name: `User`,
		read: [
			`home`,
			`about`,
			`settings-general`,
			`settings-navigation`,
			`settings-users`
		],
		write: []
	}
]

const navigation = [
	{
		name: `Main Navigation`
	}
]

async function main() {
	await prisma.page.deleteMany()
	await prisma.user.deleteMany()
	await prisma.userRole.deleteMany()
	await prisma.navigation.deleteMany()

	await prisma.page.createMany({ data: pages })
	await prisma.userRole.createMany({ data: userRoles })
	await prisma.user.createMany({ data: users })
	await prisma.navigation.createMany({ data: navigation })
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => await prisma.$disconnect)

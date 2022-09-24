import { gql } from "apollo-server-micro"
import { navigation } from "./navigation"
import { page } from "./page"
import { Scalars } from "./scalars"
import { setting } from "./setting"
import { user } from "./user"

export const typeDefs = gql`
	${page.types}
	${setting.types}
	${navigation.types}
	${user.types}

	type Query {
		page(id: ID): Page

		settings: [Setting!]

		navigation: [Navigation!]

		users(page: Int): Users
		user(id: ID): User
		userRoles: [UserRole!]
		userRole(id: ID): UserRole
	}

	type Mutation {
		createPage(input: CreatePageInput!): PageResponse!
		updatePage(input: UpdatePageInput!): PageResponse!
		deletePage(id: ID!): PageResponse

		updateGeneralSettings(inputs: [SettingInput!]): SettingResponse!

		createNavigation(name: String!): NavigationStatusResponse!
		updateNavigation(inputs: [UpdateNavigationInput!]): NavigationResponse!
		deleteNavigation(id: ID!): NavigationStatusResponse!

		createUser(input: CreateUserInput!): UserResponse!
		updateUser(input: UpdateUserInput!): UserResponse!
		deleteUser(id: ID!): UserResponse!
		createUserRole(input: CreateUserRoleInput!): RoleResponse!
		updateUserRole(input: UpdateUserRoleInput!): RoleResponse!
		deleteUserRole(id: ID!): RoleResponse!
	}
`

export const resolvers = {
	...Scalars,
	Query: {
		...page.resolvers.queries,
		...setting.resolvers.queries,
		...navigation.resolvers.queries,
		...user.resolvers.queries
	},
	Mutation: {
		...page.resolvers.mutations,
		...setting.resolvers.mutations,
		...navigation.resolvers.mutations,
		...user.resolvers.mutations
	}
}

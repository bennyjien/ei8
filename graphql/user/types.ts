import { gql } from "apollo-server-micro"

export const types = gql`
	type User {
		id: ID!
		username: String!
		name: String
		role: String!
		createdAt: String
		userRole: UserRole!
	}

	type Users {
		user: [User!]
		count: Int!
		countPerPage: Int!
	}

	input CreateUserInput {
		username: String!
		name: String
		password: String!
		role: String!
	}

	input UpdateUserInput {
		id: String!
		username: String
		name: String
		password: String
		role: String!
	}

	type UserResponse {
		code: String!
		success: Boolean!
		message: String!
		user: User
	}

	type UserRole {
		id: ID!
		name: String!
		read: [String]
		write: [String]
		users: [User!]
		_count: UserRoleCount
	}

	type UserRoleCount {
		users: Int
	}

	input CreateUserRoleInput {
		name: String!
		read: [String]
		write: [String]
	}

	input UpdateUserRoleInput {
		id: ID!
		name: String!
		read: [String]
		write: [String]
	}

	type RoleResponse {
		code: String!
		success: Boolean!
		message: String!
		userRole: UserRole
	}
`

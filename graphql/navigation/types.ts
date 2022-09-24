import { gql } from "apollo-server-micro"

export const types = gql`
	type Navigation {
		id: ID!
		name: String!
		menu: [NavigationMenu!]
	}

	type NavigationMenu {
		id: ID!
		label: String!
		url: String!
		navigationId: String!
	}

	input UpdateNavigationInput {
		id: ID!
		menu: [UpdateNavigationMenuInput!]
	}

	input UpdateNavigationMenuInput {
		id: ID
		label: String
		url: String
	}

	type NavigationStatusResponse {
		code: String!
		success: Boolean!
		message: String!
	}

	type NavigationResponse {
		code: String!
		success: Boolean!
		message: String!
		navigation: [Navigation!]
	}
`

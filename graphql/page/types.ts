import { gql } from "apollo-server-micro"

export const types = gql`
	scalar JSON

	type Page {
		id: ID!
		title: String!
		url: String!
		createdAt: String
		sortOrder: Int
		meta: JSON!
		parentId: ID
		subpages: [Page]
	}

	input CreatePageInput {
		id: ID!
		title: String!
		sortOrder: Int
		url: String
		meta: JSON!
		parentId: ID
	}

	input UpdatePageInput {
		id: ID!
		title: String
		sortOrder: Int
		url: String
		meta: JSON!
		parentId: ID
	}

	type PageResponse {
		code: String!
		success: Boolean!
		message: String!
		page: Page
	}
`

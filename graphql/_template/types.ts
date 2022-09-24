import { gql } from "apollo-server-micro"

export const types = gql`
	type Template {
		id: ID!
	}

	input CreateTemplateInput {
		id: ID!
	}

	input UpdateTemplateInput {
		id: ID!
	}

	type TemplateStatusResponse {
		code: String!
		success: Boolean!
		message: String!
	}

	type TemplateResponse {
		code: String!
		success: Boolean!
		message: String!
		template: Template
	}
`

import { gql } from "apollo-server-micro"

export const CREATE_TEMPLATE = gql`
	mutation CreateTemplate($input: CreateTemplateInput!) {
		createTemplate(inputs: $inputs) {
			code
			success
			message
			template {
				id
			}
		}
	}
`

export const UPDATE_TEMPLATE = gql`
	mutation UpdateTemplate($input: UpdateTemplateInput!) {
		updateTemplate(inputs: $inputs) {
			code
			success
			message
			template {
				id
			}
		}
	}
`

export const DELETE_TEMPLATE = gql`
	mutation DeleteTemplate($id: ID!) {
		deleteTemplate(id: $id) {
			code
			success
			message
			template {
				id
			}
		}
	}
`

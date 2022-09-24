import { gql } from "apollo-server-micro"

export const CREATE_PAGE = gql`
	mutation CreatePage($input: CreatePageInput!) {
		createPage(input: $input) {
			code
			success
			message
			page {
				id
				title
				url
				createdAt
				sortOrder
				meta
				parentId
			}
		}
	}
`

export const UPDATE_PAGE = gql`
	mutation UpdatePage($input: UpdatePageInput!) {
		updatePage(input: $input) {
			code
			success
			message
			page {
				id
				title
				url
				createdAt
				sortOrder
				meta
				parentId
			}
		}
	}
`

export const DELETE_PAGE = gql`
	mutation DeletePage($id: ID!) {
		deletePage(id: $id) {
			code
			success
			message
			page {
				id
			}
		}
	}
`

import { gql } from "apollo-server-micro"

export const GET_PAGE = gql`
	query Page($id: ID) {
		page(id: $id) {
			id
			title
			url
			sortOrder
			meta
			parentId
			subpages {
				id
				title
				sortOrder
			}
		}
	}
`

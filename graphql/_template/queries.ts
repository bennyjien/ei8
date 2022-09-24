import { gql } from "apollo-server-micro"

export const GET_TEMPLATE = gql`
	query Template($id: ID) {
		template(id: $id) {
			id
		}
	}
`

import { gql } from "apollo-server-micro"

export const CREATE_NAVIGATION = gql`
	mutation CreateNavigation($name: String!) {
		createNavigation(name: $name) {
			code
			success
			message
		}
	}
`

export const UPDATE_NAVIGATION = gql`
	mutation UpdateNavigation($inputs: [UpdateNavigationInput!]) {
		updateNavigation(inputs: $inputs) {
			code
			success
			message
			navigation {
				id
				name
				menu {
					id
					label
					url
				}
			}
		}
	}
`

export const DELETE_NAVIGATION = gql`
	mutation DeleteNavigation($id: ID!) {
		deleteNavigation(id: $id) {
			code
			success
			message
		}
	}
`

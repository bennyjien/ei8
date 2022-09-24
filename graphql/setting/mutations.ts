import { gql } from "apollo-server-micro"

export const UPDATE_SETTINGS = gql`
	mutation UpdateSettings($inputs: [SettingInput!]) {
		updateGeneralSettings(inputs: $inputs) {
			code
			success
			message
		}
	}
`

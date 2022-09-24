import { ApolloClient, InMemoryCache } from "@apollo/client"

const hostname = process.env.NEXT_PUBLIC_API_BASE_URL

const apolloClient = new ApolloClient({
	uri: `${hostname}/api/graphql`,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: `no-cache`
		}
	}
})

export default apolloClient

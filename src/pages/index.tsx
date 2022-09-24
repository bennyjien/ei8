import PageHead from "@components/page/PageHead.component"
import PageTransition from "@components/page/PageTransition.component"
import Site from "@components/site/Site.component"
import apolloClient from "@lib/apollo"
import { gql } from "apollo-server-micro"

const GET_HOME = gql`
	query Home {
		home: page(id: "home") {
			id
			title
			url
			meta
		}

		settings {
			name
			value
		}

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
`

export async function getServerSideProps() {
	const { data } = await apolloClient.query({
		query: GET_HOME
	})

	return {
		props: {
			data
		}
		// revalidate: 60
	}
}

export default function Home({ data }) {
	return (
		<PageTransition>
			<PageHead id="home" data={data} />

			{/* TODO: add queryresult component to prevent data from error */}
			<div className="home-page">
				<div className="home-page-content">
					<section className="section">
						{data.home.meta.content && <p>{data.home.meta.content.desc}</p>}
					</section>
				</div>
			</div>
		</PageTransition>
	)
}

Home.getLayout = function getLayout(page, props) {
	return <Site data={props.data}>{page}</Site>
}

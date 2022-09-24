import { ApolloProvider } from "@apollo/client"
import DashboardContextProvider from "@contexts/DashboardContext.context"
import apolloClient from "@lib/apollo"
import "@styles/global.scss"
import "@styles/style-admin.scss"
import "@styles/style-main.scss"
import { AnimatePresence } from "framer-motion"
import { NextPage } from "next"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { ReactNode } from "react"

type Page<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactNode, pageProps: any) => ReactNode
}

type Props = AppProps<{ session: Session }> & {
	Component: Page
}

export default function App({ Component, pageProps, router }: Props) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page)

	return (
		<ApolloProvider client={apolloClient}>
			<SessionProvider session={pageProps.session} refetchInterval={0}>
				<DashboardContextProvider>
					<div className="app">
						{getLayout(
							<AnimatePresence
								mode="wait"
								onExitComplete={() => window.scrollTo(0, 0)}
							>
								<Component key={`page${router.route}`} {...pageProps} />
							</AnimatePresence>,
							pageProps
						)}
					</div>
				</DashboardContextProvider>
			</SessionProvider>
		</ApolloProvider>
	)
}

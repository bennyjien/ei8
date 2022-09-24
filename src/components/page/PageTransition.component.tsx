import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function PageTransition({ children }) {
	const [changing, setChanging] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const handleRouteChange = (_url, { shallow }) => {
			if (!shallow) {
				setChanging(true)
			}
		}

		const handleRouteComplete = (_url, { shallow }) => {
			if (!shallow) {
				setChanging(false)
			}
		}

		router.events.on(`routeChangeStart`, handleRouteChange)
		router.events.on(`routeChangeComplete`, handleRouteComplete)

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off(`routeChangeStart`, handleRouteChange)
			router.events.off(`routeChangeComplete`, handleRouteComplete)
		}
	}, [router])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: changing ? 0 : 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			style={{ height: `100%` }}
			className="site-content"
		>
			<div className="site-content-inner">
				<main className="main" role="main">
					{children}
				</main>
			</div>
		</motion.div>
	)
}

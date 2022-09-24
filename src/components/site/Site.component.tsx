import Link from "next/link"
import { ReactElement, useMemo } from "react"

interface Props {
	children: ReactElement
	data?: any
}

export default function Site({ children, data }: Props) {
	const mainNav = useMemo(
		() => data.navigation.find((nav) => nav.name === `Main Navigation`),
		[data]
	)

	return (
		<div className="site-container">
			<header className="site-header" role="banner">
				<div className="site-header-inner">
					<div className="site-header-logo">
						<Link href="/">
							<a className="logo">Ei8</a>
						</Link>
					</div>
					<nav className="site-header-nav">
						<ul className="items">
							{mainNav?.menu?.map((link) => (
								<li key={link.id} className="item">
									<Link href={link.url}>
										<a className="link">{link.label}</a>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</header>
			{children}
			<footer id="site-footer" className="site-footer" role="contentinfo">
				<div className="site-footer-inner">
					<div className="site-footer-attribution">
						<p className="copyright">
							{`© 2012–2019. Handcrafted by `}
							<a
								href="http://bennyjien.com/"
								target="_blank"
								rel="designer noreferrer"
							>
								Benny Jien
							</a>
							{`.`}
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

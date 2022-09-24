import IconHome from "@assets/icons/icon-home.svg"

interface Nav {
	key: string
	href: string
	url: string
	redirectHref?: string
	label: string
	icon?: any
	subnav?: Subnav[]
}

interface Subnav {
	key: string
	href: string
	redirectHref?: string
	label: string
}

export const dashboardPagesNav: Nav[] = [
	{
		key: `home`,
		href: `/admin/home`,
		url: `/`,
		label: `Home`,
		icon: IconHome,
		subnav: []
	}
]

export const dashboardSettingsNav = [
	{
		key: `settings-general`,
		href: `/admin/settings/general`,
		label: `General`
	},
	{
		key: `settings-navigation`,
		href: `/admin/settings/navigation`,
		label: `Navigation`
	},
	{
		key: `settings-users`,
		href: `/admin/settings/users`,
		label: `Users`
	}
]

import { parseSettingsData } from "@utils/data"
import Head from "next/head"
import { useRouter } from "next/router"

export default function PageHead({ id, data }) {
	const router = useRouter()

	const settingData: any = parseSettingsData(data.settings)

	return (
		<>
			{router.locale === `en` && data[id] && settingData && (
				<Head>
					<title>
						{data[id].meta?.seo?.title ||
							`${data[id].title} ${
								data.settings?.metaTitle ? `| ${data.settings?.metaTitle}` : ``
							}`}
					</title>
					<meta
						name="description"
						content={data[id].meta?.seo?.desc || data.settings?.metaDesc || ``}
					/>
					{data[id].meta?.og?.image?.file && (
						<meta property="og:image" content={data[id].meta.og.image.file} />
					)}
					{data[id].meta?.og?.image?.size?.width && (
						<meta
							property="og:image:width"
							content={data[id].meta.og.image.size.width}
						/>
					)}
					{data[id].meta?.og?.image?.size?.height && (
						<meta
							property="og:image:height"
							content={data[id].meta.og.image.size.height}
						/>
					)}
				</Head>
			)}
		</>
	)
}

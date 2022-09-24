export default async function handler(req, res) {
	// Check for secret to confirm this is a valid request
	if (req.method !== `POST`) {
		return res
			.status(400)
			.json({ error: `Invalid HTTP method. Only POST requests are allowed.` })
	}

	if (req.query.secret !== process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY) {
		return res.status(401).json({ message: `Invalid token` })
	}

	try {
		const body = req.body

		if (!body) {
			res.status(400).send(`Bad request`)
			return
		}

		const revalidatePaths = body.revalidatePaths
		console.log(revalidatePaths)

		if (revalidatePaths.length) {
			revalidatePaths.map(async (path) => await res.revalidate(path))

			console.log(`Revalidation done`)
			return res.json({ revalidated: true })
		}
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send(`Error revalidating`)
	}
}

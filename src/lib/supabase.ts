import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// STORAGE
export async function SupabaseStorageUpsert(
	name: string,
	file: File | `string`
) {
	if (file instanceof File) {
		try {
			const updateTime = Date.now()

			const { error } = await supabase.storage
				.from(`assets`)
				.upload(`${name}?${updateTime}`, file, {
					cacheControl: `3600`,
					upsert: true
				})

			if (error) {
				console.log(error)
			}

			const { publicURL, error: getError } = supabase.storage
				.from(`assets`)
				.getPublicUrl(`${name}?${updateTime}`)

			if (getError) {
				console.log(getError)
			}

			return publicURL
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return file
	}
}

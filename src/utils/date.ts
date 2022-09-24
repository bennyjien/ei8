import { formatISO, parseISO } from "date-fns"

export function formatDate(date) {
	if (!date) return
	return formatISO(date)
}

export function parseDate(date) {
	if (!date) return
	return parseISO(date)
}

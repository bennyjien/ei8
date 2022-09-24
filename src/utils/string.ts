import parse from "html-react-parser"

export function getInitial(str) {
	if (str) {
		return str
			.split(` `)
			.map((word) => word[0])
			.join(``)
			.toUpperCase()
			.substr(0, 2)
	}
}

export function wrapKatakana(text: string) {
	if (text) {
		const textArray = text.replace(/\*.*?\*/g, (match) => {
			const word = match.slice(1, -1)

			return `<span className="katakana">${word}</span>`
		})

		return parse(`${textArray}`)
	}

	return text
}

import {
	DetailedHTMLProps,
	ReactElement,
	TextareaHTMLAttributes,
	useState
} from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

interface Props
	extends DetailedHTMLProps<
		TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	setForm: UseFormReturn<FieldValues, object>
	name: string
	label?: string
	icon?: any
	footnote?: string | ReactElement
	count?: number
	error?: string
	[x: string]: any
}

export default function FormTextarea({
	setForm,
	name,
	label,
	icon,
	footnote,
	count,
	error,
	...attrs
}: Props) {
	const [charCount, setCharCount] = useState(0)
	const Icon = icon

	const { register } = setForm

	function handleCharCount(event) {
		setCharCount(() => event.target.value.length)
	}

	return (
		<div className="form-input">
			{label && (
				<label htmlFor={name} className="form-input-heading">
					{label}
				</label>
			)}
			<div className={`form-input-field ${error ? `is-error` : ``}`}>
				{Icon && (
					<i className="icon" role="img">
						<Icon className="svg" />
					</i>
				)}
				<textarea
					id={name}
					className="input input-textarea"
					{...attrs}
					{...register(name, {
						onChange: (e) => handleCharCount(e)
					})}
				></textarea>
			</div>
			{footnote && !error && <p className="form-input-footnote">{footnote}</p>}
			{count && (
				<p className="form-input-counter">
					{`Recommended: ${count} characters. You’ve used `}
					<span className={`count ${charCount > count ? `is-exceeded` : ``}`}>
						{charCount}
					</span>
					{`.`}
				</p>
			)}
			{error && <p className="form-input-error">{error}</p>}
		</div>
	)
}

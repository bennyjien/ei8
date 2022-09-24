import { FieldValues, UseFormReturn } from "react-hook-form"

interface Props {
	setForm: UseFormReturn<FieldValues, object>
	name: string
	label: string
	desc: string
	value?: string
}

export default function FormSwitch({
	setForm,
	name,
	label,
	desc,
	value
}: Props) {
	const { register } = setForm

	return (
		<div className="form-switch">
			<div className="form-switch-heading">
				<p className="label">{label}</p>
				<p className="desc">{desc}</p>
			</div>
			<div className="form-switch-field">
				<input
					type="checkbox"
					className="input"
					value={value}
					{...register(name)}
				/>
			</div>
		</div>
	)
}

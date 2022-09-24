import IconFileCross from "@assets/icons/icon-file-cross.svg"
import IconTimes from "@assets/icons/icon-times.svg"
import IconVideoCross from "@assets/icons/icon-video-cross.svg"
import { getExtensionType } from "@utils/file"
import { useRef } from "react"
import { Controller, FieldValues, UseFormReturn } from "react-hook-form"

interface Props {
	setForm: UseFormReturn<FieldValues, object>
	name: string
	type?: `file` | `image`
	size?: `icon` | `small` | `medium` | `large` | `full`
	aspectRatio?: string
	title?: string
	error?: string
	defaultValue?: string
	label?: string
	footnote?: string
	required?: boolean
	styleNoButton?: boolean
	styleNoPlaceholder?: boolean
}

const FormFile = ({
	setForm,
	name,
	type = `file`,
	size = `medium`,
	aspectRatio = `1`,
	title,
	error,
	defaultValue,
	label,
	footnote,
	required,
	styleNoButton,
	styleNoPlaceholder
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const { control } = setForm

	function removeValue(ev, onChange) {
		ev.preventDefault()
		inputRef.current.value = ``
		onChange(``)
	}

	function onSelectFile(onChange) {
		if (!inputRef.current.files || inputRef.current.files.length === 0) {
			onChange(``)
			return
		}

		const payload: File & {
			width?: number
			height?: number
		} = inputRef.current.files[0]

		if (payload?.type.includes(`image`)) {
			const objectUrl = URL.createObjectURL(payload)
			const image = new Image()

			image.src = objectUrl
			image.onload = (e) => {
				const target = e.target as HTMLImageElement

				payload.height = target.height
				payload.width = target.width

				// Only support one image upload
				onChange(payload)
			}
		} else {
			// Only support one image upload
			onChange(inputRef.current.files[0])
		}
	}

	return (
		<div className="form-file">
			{label && <label className="form-file-heading">{label}</label>}
			<Controller
				control={control}
				name={name}
				defaultValue={defaultValue}
				rules={{ required }}
				render={({ field: { onChange, value } }) => (
					<div className={`form-file-field form-file-field-${size}`}>
						{type === `image` && (
							<label
								className={`form-file-preview form-file-preview-${size} ${
									styleNoButton && styleNoPlaceholder
										? `form-file-preview-compact`
										: ``
								}`}
								style={{ aspectRatio }}
								htmlFor={name}
								title={title}
							>
								{value &&
								Object.values(value).length > 0 &&
								(getExtensionType(value.file) === `image` ||
									getExtensionType(value.name) === `image`) ? (
									<img
										className="preview"
										src={
											value instanceof File
												? URL.createObjectURL(value)
												: value.file
										}
										alt="Upload Preview"
									/>
								) : (
									<>
										{value &&
										Object.values(value).length > 0 &&
										(getExtensionType(value.file) === `video` ||
											getExtensionType(value.name) === `video`) ? (
											<div className="note">
												<i className="icon" role="img">
													<IconVideoCross className="svg" />
												</i>
												<span>Unable to preview video</span>
											</div>
										) : (
											<>
												{value && Object.values(value).length > 0 && (
													<div className="note">
														<i className="icon" role="img">
															<IconFileCross className="svg" />
														</i>
														<span>Unable to preview file</span>
													</div>
												)}
											</>
										)}
									</>
								)}
								{value && Object.values(value).length > 0 && (
									<button
										onClick={(ev) => removeValue(ev, onChange)}
										className="link remove"
										title="Remove attachment"
									>
										<i className="icon" role="img">
											<IconTimes className="svg" />
										</i>
									</button>
								)}
							</label>
						)}
						<div className="form-file-input">
							<input
								ref={inputRef}
								type="file"
								onChange={() => onSelectFile(onChange)}
								name={name}
								id={name}
								className="input"
							/>
							<label
								className={`label ${
									styleNoPlaceholder ? `no-placeholder` : ``
								}`}
								htmlFor={name}
							>
								{!styleNoButton && (
									<span
										className={`button ${
											type === `image` ? `button-small` : 0
										}`}
									>
										Browse files
									</span>
								)}
								{!styleNoPlaceholder && (
									<span className="placeholder">
										{value && Object.values(value).length > 0 ? (
											value instanceof File ? (
												value.name
											) : (
												<a href={value.file} target="_blank" rel="noreferrer">
													View current file
												</a>
											)
										) : (
											`No file selected…`
										)}
									</span>
								)}
								{!styleNoPlaceholder && value instanceof File && (
									<button
										onClick={(ev) => removeValue(ev, onChange)}
										className="link remove"
										title="Remove attachment"
									>
										&times;
									</button>
								)}
							</label>
							{footnote && <p className="footnote">{footnote}</p>}
							{error && <p className="error">{error}</p>}
						</div>
					</div>
				)}
			/>
		</div>
	)
}

export default FormFile

import IconSidebarOpen from "@assets/icons/icon-sidebar-open.svg"
import FormFile from "@components/form/FormFile.component"
import FormInput from "@components/form/FormInput.component"
import FormTextarea from "@components/form/FormTextarea.component"
import { AnimatePresence, motion } from "framer-motion"
import { FieldValues, UseFormReturn } from "react-hook-form"

interface Props {
	setForm: UseFormReturn<FieldValues, object>
	isShown: boolean
	close: () => void
}

export default function AdminPageSidebar({ setForm, isShown, close }: Props) {
	return (
		<AnimatePresence>
			{isShown && (
				<motion.aside
					className="admin-page-sidebar"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1, type: `tween` }}
				>
					<div className="admin-sidebar">
						<div className="admin-sidebar-head">
							<h4 className="heading">Page Settings</h4>
							<ul className="actions">
								<li className="action">
									<button
										type="button"
										onClick={close}
										className="button button-gray button-small"
									>
										<i className="icon icon-medium icon-only" role="img">
											<IconSidebarOpen className="svg" />
										</i>
									</button>
								</li>
							</ul>
						</div>
						<div className="admin-sidebar-body">
							<div className="form-fieldset">
								<div className="form-fieldset-body">
									<div className="row">
										<FormInput
											setForm={setForm}
											name="url"
											label="Page URL"
											footnote="URL cannot be changed"
											readOnly
										/>
									</div>
									<div className="row">
										<FormInput
											setForm={setForm}
											name="meta.seo.title"
											label="Meta Title"
											count={70}
										/>
									</div>
									<div className="row">
										<FormTextarea
											setForm={setForm}
											name="meta.seo.desc"
											label="Meta Description"
											count={156}
										/>
									</div>
									<div className="row">
										<FormFile
											setForm={setForm}
											type="image"
											name="meta.og.image"
											label="Open Graph Image"
											footnote="The image will be used as thumbnail for social sharing. Recommended size is 600x600px."
											size="medium"
											styleNoPlaceholder
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	)
}

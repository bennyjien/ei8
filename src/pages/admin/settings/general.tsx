import { useMutation, useQuery } from "@apollo/client"
import IconEmail from "@assets/icons/icon-envelope.svg"
import IconFacebook from "@assets/icons/icon-social-facebook.svg"
import IconInstagram from "@assets/icons/icon-social-instagram.svg"
import IconLine from "@assets/icons/icon-social-line.svg"
import IconLinkedin from "@assets/icons/icon-social-linkedin.svg"
import IconTwitter from "@assets/icons/icon-social-twitter.svg"
import IconWhatsapp from "@assets/icons/icon-social-whatsapp.svg"
import IconYoutube from "@assets/icons/icon-social-youtube.svg"
import AdminPage from "@components/admin/AdminPage.component"
import Dashboard from "@components/dashboard/Dashboard.component"
import EiExpandable from "@components/ei/EiExpandable.component"
import FormInput from "@components/form/FormInput.component"
import FormSwitch from "@components/form/FormSwitch.component"
import FormTextarea from "@components/form/FormTextarea.component"
import Access from "@components/util/Access.component"
import QueryResult from "@components/util/QueryResult.component"
import useLoading from "@hooks/useLoading.hook"
import useToast from "@hooks/useToast"
import { revalidateData } from "@utils/data"
import { dashboardPagesNav } from "@variables/dashboardNav.variable"
import { UPDATE_SETTINGS } from "graphql/setting/mutations"
import { GET_SETTINGS } from "graphql/setting/queries"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function SettingGeneral() {
	const { setLoading } = useLoading()
	const { setToast } = useToast()

	const { data, loading, error } = useQuery(GET_SETTINGS)
	const [updateGeneralSettings] = useMutation(UPDATE_SETTINGS, {
		refetchQueries: [{ query: GET_SETTINGS }]
	})

	const setForm = useForm()
	const {
		reset,
		handleSubmit,
		formState: { isDirty }
	} = setForm

	useEffect(() => {
		if (data?.settings) {
			let resetData = {}

			data.settings.forEach((setting: { name: string; value: string }) => {
				if (
					setting.name === `modePrivate` ||
					setting.name === `modeMaintenance`
				) {
					resetData = {
						...resetData,
						[setting.name]: setting.value === `false` ? false : setting.value
					}
				} else {
					resetData = {
						...resetData,
						[setting.name]: setting.value
					}
				}
			})

			reset(resetData)
		}
	}, [reset, data])

	async function onSubmit(formData) {
		setLoading(true)

		const payload = Object.entries(formData).map((setting) => ({
			name: setting[0],
			value: setting[1].toString()
		}))

		try {
			const { data } = await updateGeneralSettings({
				variables: {
					inputs: payload
				}
			})

			const urls = dashboardPagesNav.map((nav) => nav.url)
			revalidateData(urls)

			setToast(data.updateGeneralSettings)
		} catch (error) {
			setToast(error)
		}

		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<AdminPage
				setForm={setForm}
				authId="settings-general"
				title="General"
				legend="Settings"
				action={
					<Access
						auth="write:settings-general"
						yes={
							<ul className="actions">
								<li className="action">
									<button
										type="submit"
										className="button button-small"
										disabled={!isDirty}
									>
										Save Settings
									</button>
								</li>
							</ul>
						}
					/>
				}
			>
				<section className="section">
					<QueryResult loading={loading} error={error}>
						<div className="admin-section">
							<div className="admin-section-head">
								<h2 className="title">Website Settings</h2>
							</div>
							<div className="admin-section-body admin-section-body-graydient">
								<EiExpandable
									title="Site Meta Data"
									desc="Content for search engines"
								>
									<div className="form-fieldset">
										<div className="form-fieldset-body">
											<div className="row">
												<FormInput
													setForm={setForm}
													name="metaTitle"
													label="Meta title"
													count={70}
												/>
											</div>
											<div className="row">
												<FormTextarea
													setForm={setForm}
													name="metaDesc"
													label="Meta description"
													count={156}
												/>
											</div>
										</div>
									</div>
								</EiExpandable>
							</div>
							<div className="admin-section-body admin-section-body-graydient">
								<EiExpandable
									title="Site Contact"
									desc="The contact list of your website"
								>
									<div className="form-fieldset">
										<div className="form-fieldset-body">
											<div className="row">
												<FormInput
													setForm={setForm}
													name="emailContact"
													label="Contact Email"
													icon={IconEmail}
												/>
											</div>
										</div>
									</div>
								</EiExpandable>
							</div>
						</div>
					</QueryResult>
				</section>
				<section className="section">
					<QueryResult loading={loading} error={error}>
						<div className="admin-section">
							<div className="admin-section-head">
								<h2 className="title">Integration Settings</h2>
							</div>
							<div className="admin-section-body admin-section-body-graydient">
								<EiExpandable
									title="3rd Party Service"
									desc="Configuration for 3rd party integrations"
								>
									<div className="form-fieldset">
										<div className="form-fieldset-body">
											<div className="row">
												<FormInput
													setForm={setForm}
													name="integrationGanalytics"
													footnote="Google Analytics Tracking ID"
													placeholder="UA-XXXXXXXXX-XX"
												/>
											</div>
										</div>
									</div>
								</EiExpandable>
							</div>
							<div className="admin-section-body admin-section-body-graydient">
								<EiExpandable
									title="Social Media"
									desc="Link to your social media accounts"
								>
									<div className="form-fieldset">
										<div className="form-fieldset-body">
											<div className="row">
												<FormInput
													setForm={setForm}
													name="socialFacebook"
													icon={IconFacebook}
													footnote="URL of your Facebook profile"
													placeholder="Facebook"
												/>
											</div>
											<div className="row">
												<FormInput
													setForm={setForm}
													name="socialInstagram"
													icon={IconInstagram}
													footnote="URL of your Instagram profile"
													placeholder="Instagram"
												/>
											</div>
											<div className="row">
												<FormInput
													setForm={setForm}
													name="socialLinkedin"
													icon={IconLinkedin}
													footnote="URL of your LinkedIn profile"
													placeholder="LinkedIn"
												/>
											</div>
											<div className="row">
												<FormInput
													setForm={setForm}
													name="socialTwitter"
													icon={IconTwitter}
													footnote="URL of your Twitter profile"
													placeholder="Twitter"
												/>
											</div>
											<div className="row">
												<FormInput
													setForm={setForm}
													name="socialYoutube"
													icon={IconYoutube}
													footnote="URL of your Youtube profile"
													placeholder="Youtube"
												/>
											</div>
										</div>
									</div>
								</EiExpandable>
							</div>
							<div className="admin-section-body admin-section-body-graydient">
								<EiExpandable
									title="Social Messenger"
									desc="Your social messenger contacts"
								>
									<div className="form-fieldset">
										<div className="form-fieldset-body">
											<div className="row">
												<FormInput
													setForm={setForm}
													name="messengerWhatsapp"
													icon={IconWhatsapp}
													footnote="Your Whatsapp contact number"
													placeholder="Whatsapp"
												/>
											</div>
											<div className="row">
												<FormInput
													setForm={setForm}
													name="messengerLine"
													icon={IconLine}
													footnote="Your Line contact number"
													placeholder="Line"
												/>
											</div>
										</div>
									</div>
								</EiExpandable>
							</div>
						</div>
					</QueryResult>
				</section>
				<section className="section">
					<div className="admin-section">
						<div className="admin-section-head">
							<h2 className="title">Advanced Settings</h2>
						</div>
						<div className="admin-section-body admin-section-body-gray">
							<FormSwitch
								setForm={setForm}
								name="modePrivate"
								value="true"
								label="Block Search Engine"
								desc="Discourage search engines from indexing this site"
							/>
						</div>
						<div className="admin-section-body admin-section-body-gray">
							<FormSwitch
								setForm={setForm}
								name="modeMaintenance"
								value="true"
								label="Maintenance Mode"
								desc="Prevent visitors from accessing this site"
							/>
						</div>
					</div>
				</section>
			</AdminPage>
		</form>
	)
}

SettingGeneral.getLayout = function getLayout(page) {
	return <Dashboard>{page}</Dashboard>
}

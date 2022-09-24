import { useMutation, useQuery } from "@apollo/client"
import AdminPage from "@components/admin/AdminPage.component"
import Dashboard from "@components/dashboard/Dashboard.component"
import EiPopup from "@components/ei/EiPopup.component"
import FormInput from "@components/form/FormInput.component"
import FormRepeater from "@components/form/FormRepeater.component"
import Access from "@components/util/Access.component"
import QueryResult from "@components/util/QueryResult.component"
import useLoading from "@hooks/useLoading.hook"
import useToast from "@hooks/useToast"
import {
	CREATE_NAVIGATION,
	DELETE_NAVIGATION,
	UPDATE_NAVIGATION
} from "graphql/navigation/mutations"
import { GET_NAVIGATION } from "graphql/navigation/queries"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function SettingNavigation() {
	const [showAddPopup, setShowAddPopup] = useState(false)

	const { setLoading } = useLoading()
	const { setToast } = useToast()

	const { data, loading, error } = useQuery(GET_NAVIGATION)
	const [updateNavigation] = useMutation(UPDATE_NAVIGATION)
	const [deleteNavigation] = useMutation(DELETE_NAVIGATION, {
		refetchQueries: [
			{
				query: GET_NAVIGATION
			}
		]
	})

	const setForm = useForm()
	const {
		reset,
		handleSubmit,
		formState: { isDirty }
	} = setForm

	useEffect(() => {
		if (!data) return

		let resetData = {}

		data.navigation.forEach((nav) => {
			resetData = {
				...resetData,
				[nav.id]: nav.menu.map((menu) => {
					return {
						id: menu.id,
						label: menu.label,
						url: menu.url
					}
				})
			}
		})

		reset(resetData)
	}, [data, reset])

	async function onDelete(id) {
		setLoading(true)

		try {
			const { data } = await deleteNavigation({
				variables: {
					id
				}
			})

			setToast(data.deleteNavigation)
		} catch (error) {
			setToast(error)
		}

		setLoading(false)
	}

	async function onSubmit(formData) {
		setLoading(true)

		const payload = Object.keys(formData).map((key) => {
			return {
				id: key,
				menu: formData[key]
			}
		})

		try {
			const { data } = await updateNavigation({
				variables: {
					inputs: payload
				}
			})

			setToast(data.updateNavigation)
		} catch (error) {
			setToast(error)
		}

		setLoading(false)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AdminPage
					setForm={setForm}
					authId="settings-navigation"
					title="Navigation"
					legend="Settings"
					action={
						<Access
							auth="write:settings-navigation"
							yes={
								<ul className="actions">
									<Access
										auth="superadmin"
										yes={
											<li className="action">
												<button
													type="button"
													onClick={() => setShowAddPopup(true)}
													className="button button-small button-gray"
												>
													Add New
												</button>
											</li>
										}
									/>
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
					<QueryResult loading={loading} error={error}>
						{data?.navigation.map((nav) => (
							<section key={nav.id} className="section">
								<div className="admin-section">
									<div className="admin-section-head">
										<h2 className="title">{nav.name}</h2>
										<Access
											auth="superadmin"
											yes={
												<button
													type="button"
													onClick={() => onDelete(nav.id)}
													className="button button-micro button-alert"
												>
													Delete
												</button>
											}
										/>
									</div>
									<div className="admin-section-body admin-section-body-gray">
										<FormRepeater
											setForm={setForm}
											name={nav.id}
											inputNames={[`label`, `url`]}
											inputLabels={[`Label`, `URL`]}
											max={5}
											sortable
										/>
									</div>
								</div>
							</section>
						))}
					</QueryResult>
				</AdminPage>
			</form>

			<AddPopup showAddPopup={showAddPopup} setShowAddPopup={setShowAddPopup} />
		</>
	)
}

function AddPopup({ showAddPopup, setShowAddPopup }) {
	const setForm = useForm()
	const { handleSubmit, reset } = setForm

	const { setLoading } = useLoading()
	const { setToast } = useToast()

	const [createNavigation] = useMutation(CREATE_NAVIGATION, {
		refetchQueries: [
			{
				query: GET_NAVIGATION
			}
		]
	})

	async function onSubmit(formData) {
		setLoading(true)

		try {
			const { data } = await createNavigation({
				variables: {
					name: formData.name
				}
			})

			reset()

			setToast(data.createNavigation)
		} catch (error) {
			setToast(error)
		}

		setLoading(false)
	}

	return (
		<EiPopup isShown={showAddPopup} styleSmall>
			<form onSubmit={handleSubmit(onSubmit)} className="popup-confirm">
				<div className="popup-confirm-head">
					<h4>Add New Navigation</h4>
				</div>
				<div className="popup-confirm-body">
					<FormInput setForm={setForm} name="name" label="Name" />
				</div>
				<div className="popup-confirm-action">
					<button
						type="button"
						onClick={() => setShowAddPopup(false)}
						className="button button-gray"
					>
						Cancel
					</button>
					<button type="submit" className="button button-primary">
						Add Navigation
					</button>
				</div>
			</form>
		</EiPopup>
	)
}

SettingNavigation.getLayout = function getLayout(page) {
	return <Dashboard>{page}</Dashboard>
}

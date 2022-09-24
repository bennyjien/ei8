import { useMutation, useQuery } from "@apollo/client"
import AdminPage from "@components/admin/AdminPage.component"
import Dashboard from "@components/dashboard/Dashboard.component"
import FormInput from "@components/form/FormInput.component"
import FormTextarea from "@components/form/FormTextarea.component"
import QueryResult from "@components/util/QueryResult.component"
import { yupResolver } from "@hookform/resolvers/yup"
import useLoading from "@hooks/useLoading.hook"
import useToast from "@hooks/useToast"
import { updatePageData } from "@utils/mutation"
import { UPDATE_PAGE } from "graphql/page/mutations"
import { GET_PAGE } from "graphql/page/queries"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
	title: yup.string().required(`Title is required.`)
})

export default function AdminHome() {
	const PAGE_ID = `home`
	const { setLoading } = useLoading()
	const { setToast } = useToast()

	const setForm = useForm({
		resolver: yupResolver(schema)
	})
	const {
		reset,
		handleSubmit,
		formState: { errors }
	} = setForm

	const { data, loading, error } = useQuery(GET_PAGE, {
		variables: {
			id: PAGE_ID
		}
	})

	const [updatePage] = useMutation(UPDATE_PAGE, {
		refetchQueries: [
			{
				query: GET_PAGE,
				variables: {
					id: PAGE_ID
				}
			}
		]
	})

	useEffect(() => {
		if (!data?.page) return

		reset(data.page)
	}, [reset, data])

	async function onSubmit(formData) {
		setLoading(true)

		try {
			const data = await updatePageData(
				updatePage,
				PAGE_ID,
				formData,
				[`meta.og.image`],
				[`/`]
			)

			setToast(data.updatePage)
		} catch (error) {
			setToast(error)
		}

		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
			<AdminPage
				setForm={setForm}
				authId="home"
				title="Home"
				legend="Pages"
				sidebar={true}
			>
				<QueryResult loading={loading} error={error}>
					<section className="section">
						<div className="admin-section">
							<div className="admin-section-body admin-section-body-gray">
								<div className="form-fieldset">
									<div className="form-fieldset-body">
										<div className="row">
											<FormInput
												setForm={setForm}
												name="title"
												label="Title"
												error={errors.title?.message}
											/>
										</div>
										<div className="row">
											<FormTextarea
												setForm={setForm}
												name="meta.content.desc"
												label="Description"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</QueryResult>
			</AdminPage>
		</form>
	)
}

AdminHome.getLayout = function getLayout(page) {
	return <Dashboard>{page}</Dashboard>
}

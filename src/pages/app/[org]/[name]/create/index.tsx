import Container from '@/components/container'
import Content from '@/components/content'
import PanelNavbar from '@/components/panel-navbar'
import { api } from '@/services/api/main'
import Link from 'next/link'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import useProject from '@/hooks/projects/view'
import { useSession } from 'next-auth/react'
import { getOctokit } from '@/helpers/github'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { FaDownLong } from 'react-icons/fa6'
import { htmlToText } from '@/utils/html-to-text'
import { toastError } from '@/utils/toast-error'

type Issues = RestEndpointMethodTypes['issues']['listForRepo']['response']['data']

export default function CreateTask() {
	const [loading, setLoading] = useState(false)
	const [issues, setIssues] = useState<Issues>([])
	const { query, push } = useRouter()
	const { data: session } = useSession()

	const { project } = useProject({ repository: query.name && `${query.org}/${query.name}` })

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoading(true)
			const form_data = new FormData(e.currentTarget)
			const data = Object.fromEntries(form_data.entries())

			if ((data.description as string).length > 2048)
				throw new Error('Description too long. Max 2048 characters.')

			await api.post('/tasks', data)

			toast.success('Task created!')

			push(`/app/${query.org}/${query.name}`)
		} catch (error) {
			toastError(error)
		} finally {
			setLoading(false)
		}
	}

	const getIssues = useCallback(async () => {
		if (!session) return
		if (!session.accessToken) return
		setLoading(true)

		const octokit = getOctokit(session.accessToken)

		try {
			const response = await octokit.issues.listForRepo({
				owner: query.org as string,
				repo: query.name as string,
				state: 'open',
			})

			setIssues(response.data)
		} catch (error) {
			toastError(error, 'Failed to get repository issues')
		} finally {
			setLoading(false)
		}
	}, [query.org, query.name, session])

	const importIssue = async () => {
		try {
			setLoading(true)

			const selected = document.querySelector<HTMLSelectElement>('#issue_id')!.value

			if (!selected) return
			if (selected === 'default') return

			const issue = issues.find((issue) => issue.number === Number(selected))

			if (!issue) return

			const form = document.querySelector<HTMLFormElement>('form')!
			form.querySelector<HTMLInputElement>('#title')!.value = issue.title
			form.querySelector<HTMLInputElement>('#description')!.value = htmlToText(issue.body || '')
			form.querySelector<HTMLInputElement>('#tags')!.value = issue.labels
				.map((label) => (typeof label === 'string' ? label : label.name))
				.join(', ')
			if (issue.assignees) {
				form.querySelector<HTMLInputElement>('#assignees')!.value = issue.assignees
					.map((assignee) => (typeof assignee === 'string' ? assignee : assignee.login))
					.join(', ')
			}
		} catch (error) {
			toastError(error, 'Failed to import issue')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getIssues()
	}, [getIssues])

	return (
		<Container>
			<PanelNavbar title='Create New Task' />
			{project && (
				<Content>
					<div className='flex w-full max-w-7xl mt-4 mb-8'>
						<div className='breadcrumbs text-sm'>
							<ul>
								<li>
									<Link href='/app'>Projects</Link>
								</li>
								<li>
									<Link href={`/app/${project.repository}`}>{project.name}</Link>
								</li>
								<li>Create New Task</li>
							</ul>
						</div>
					</div>

					<div className='w-full max-w-xl'>
						<form id='create-task-form' onSubmit={submit}>
							<input type='hidden' name='project_id' value={project._id} />
							<input type='hidden' name='project_repo' value={project.repository} />
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Select an issue from GitHub (optional)</span>
								</label>
								<div className='join w-full'>
									<select
										name='issue_id'
										id='issue_id'
										className='select select-bordered join-item w-full'
										defaultValue='default'
										disabled={loading}
									>
										<option value='default' disabled>
											Select an issue
										</option>
										{issues.map((issue) => (
											<option key={issue.id} value={issue.number}>
												#{issue.number} {issue.title}
											</option>
										))}
									</select>
									<button
										type='button'
										disabled={loading}
										className='btn btn-primary join-item'
										onClick={importIssue}
									>
										<FaDownLong />
										Import
									</button>
								</div>
							</div>
							<div className='divider'>OR</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Title</span>
								</label>
								<input
									type='text'
									name='title'
									id='title'
									placeholder='Title'
									className='input input-bordered'
									required
									disabled={loading}
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Description</span>
								</label>
								<textarea
									name='description'
									id='description'
									placeholder='Description'
									className='textarea textarea-bordered'
									disabled={loading}
									rows={5}
									maxLength={2048}
								></textarea>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Tags</span>
								</label>
								<input
									type='text'
									name='tags'
									id='tags'
									placeholder='Tags (comma separated)'
									className='input input-bordered'
									disabled={loading}
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Priority</span>
								</label>
								<select
									name='priority'
									id='priority'
									className='select select-bordered'
									defaultValue='medium'
									disabled={loading}
								>
									<option value={0}>Low</option>
									<option value={1}>Medium</option>
									<option value={2}>High</option>
								</select>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Assignees</span>
								</label>
								<input
									type='text'
									name='assignees'
									id='assignees'
									placeholder='Github users (comma separated)'
									className='input input-bordered'
									disabled={loading}
								/>
							</div>
							<div className='form-control mt-6'>
								<p className='mb-4'>A GitHub issue will be created automatically.</p>
								<button type='submit' className='btn btn-primary'>
									{loading && <span className='loading loading-spinner'></span>}
									Create
								</button>
							</div>
						</form>
					</div>
				</Content>
			)}
		</Container>
	)
}

import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import { getOctokit } from '@/helpers/github'
import { api } from '@/services/api/main'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { repoToName } from '@/utils/repo-to-name'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

type Repos = RestEndpointMethodTypes['repos']['listForAuthenticatedUser']['response']['data']

export default function Settings() {
	const { data: session } = useSession()
	const [repos, setRepos] = useState<Repos>([])
	const [loading, setLoading] = useState(false)

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoading(true)
			const form_data = new FormData(e.currentTarget)
			const data = Object.fromEntries(form_data.entries())

			await api.post('/projects', data)

			toast.success('Project created!')

			window.history.back()
		} catch {
			toast.error('Failed to create project')
		} finally {
			setLoading(false)
		}
	}

	const changeRepo = (full_name: string) => {
		const repo = repos.find((repo) => repo.full_name === full_name)

		if (!repo) return

		const form = document.querySelector<HTMLFormElement>('form')!
		form.querySelector<HTMLInputElement>('#name')!.value = repoToName(repo.name)
		form.querySelector<HTMLInputElement>('#description')!.value = repo.description || ''
		form.querySelector<HTMLInputElement>('#access')!.value = repo.private ? 'private' : 'public'
	}

	const getRepos = useCallback(async () => {
		if (!session) return
		if (!session.accessToken) return

		const octokit = getOctokit(session.accessToken)

		try {
			const response = await octokit.repos.listForAuthenticatedUser({ per_page: 100 })

			setRepos(response.data)
		} catch {
			toast.error('Failed to get user repos')
		}
	}, [session])

	useEffect(() => {
		getRepos()
	}, [getRepos])

	return (
		<Container>
			<PainelNavbar title='Create Project' />
			<Content>
				<div className='flex w-full max-w-7xl mt-4 mb-8'>
					<div className='breadcrumbs text-sm'>
						<ul>
							<li>
								<Link href='/app' as='/app'>
									Projects
								</Link>
							</li>
							<li>Create</li>
						</ul>
					</div>
				</div>

				<div className='w-full max-w-xl'>
					<form id='create-project-form' onSubmit={submit}>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Repository</span>
							</label>
							<select
								onChange={(e) => changeRepo(e.target.value)}
								name='repository'
								id='repository'
								className='select select-bordered'
								defaultValue='default'
								disabled={loading || !repos.length}
							>
								<option value='default' disabled>
									Select a repository
								</option>
								{repos.map((repo) => (
									<option key={repo.id} value={repo.full_name}>
										{repo.full_name}
									</option>
								))}
							</select>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Name'
								className='input input-bordered'
								disabled={loading || !repos.length}
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
								disabled={loading || !repos.length}
							></textarea>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Dashboard access</span>
							</label>
							<select
								name='access'
								id='access'
								className='select select-bordered'
								defaultValue='public'
								disabled={loading || !repos.length}
							>
								<option value='public'>Public</option>
								<option value='private'>Private</option>
							</select>
						</div>
						<div className='form-control mt-6'>
							<button type='submit' className='btn btn-primary'>
								{loading && <span className='loading loading-spinner'></span>}
								Create
							</button>
						</div>
					</form>
				</div>
			</Content>
		</Container>
	)
}

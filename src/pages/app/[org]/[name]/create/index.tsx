import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import { api } from '@/services/api/main'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import useProject from '@/hooks/projects/view'

export default function Settings() {
	const [loading, setLoading] = useState(false)
	const { query, push } = useRouter()

	const { project } = useProject({ repository: query.name && `${query.org}/${query.name}` })

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoading(true)
			const form_data = new FormData(e.currentTarget)
			const data = Object.fromEntries(form_data.entries())

			await api.post('/tasks', data)

			toast.success('Task created!')

			push(`/app/${query.org}/${query.name}`)
		} catch {
			toast.error('Failed to create task')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container>
			<PainelNavbar title='Create New Task' />
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
									required
									disabled={loading}
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
								<p className='mb-4'>A Github issue will be created automatically.</p>
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

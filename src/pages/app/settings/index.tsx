import Container from '@/components/container'
import Content from '@/components/content'
import PanelNavbar from '@/components/panel-navbar'
import themes from '@/constants/themes'
import useMe from '@/hooks/users/me'
import { api } from '@/services/api/main'
import { toastError } from '@/utils/toast-error'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Settings() {
	const [theme, setTheme] = useState('light')
	const { user, loading } = useMe()
	const [submitting, setSubmitting] = useState(false)

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newTheme = e.target.value
		setTheme(newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)
	}

	useEffect(() => {
		setTheme(document.documentElement.getAttribute('data-theme') || 'light')
	}, [])

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setSubmitting(true)
			const form_data = new FormData(e.currentTarget)
			const data = Object.fromEntries(form_data.entries())

			if (data.ai_api_key) {
				await api.post('/users/settings', data)

				toast.success('Settings updated!')
			}
		} catch (error) {
			toastError(error, 'Failed to update settings')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Container>
			<PanelNavbar title='Settings' />
			<Content>
				<div className='flex w-full max-w-7xl mt-4 mb-8'>
					<div className='breadcrumbs text-sm'>
						<ul>
							<li>
								<Link href='/app' as='/app'>
									Projects
								</Link>
							</li>
							<li>Settings</li>
						</ul>
					</div>
				</div>

				<div className='w-full max-w-xl'>
					{!loading && user && (
						<form id='settings-form' onSubmit={submit}>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Select your theme</span>
								</label>
								<select value={theme} onChange={handleThemeChange} className='select select-bordered'>
									{themes.map((theme, i) => (
										<option key={i}>{theme}</option>
									))}
								</select>
							</div>
							{!user.has_access && (
								<div className='form-control'>
									<label className='label'>
										<span className='label-text'>Open AI API Key</span>
									</label>
									<input
										type='text'
										name='ai_api_key'
										id='ai_api_key'
										placeholder='Paste your API key here'
										className='input input-bordered'
										disabled={submitting}
										defaultValue={user.ai_api_key || ''}
									/>
								</div>
							)}
							<div className='form-control mt-6'>
								<button type='submit' className='btn btn-primary'>
									{submitting && <span className='loading loading-spinner'></span>}
									Save
								</button>
							</div>
						</form>
					)}
					{loading && (
						<div>
							<div className='skeleton h-4 w-20 mb-2'></div>
							<div className='skeleton h-12 w-full mb-4'></div>
							<div className='skeleton h-4 w-24 mb-2'></div>
							<div className='skeleton h-12 w-full'></div>
						</div>
					)}
				</div>
			</Content>
		</Container>
	)
}

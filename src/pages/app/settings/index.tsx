import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import themes from '@/constants/themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Settings() {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'light'
		setTheme(savedTheme)
		document.documentElement.setAttribute('data-theme', savedTheme)
	}, [])

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newTheme = e.target.value
		setTheme(newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)
	}

	return (
		<Container>
			<PainelNavbar title='Settings' />
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

				<div className='w-full max-w-7xl'>
					<label className='form-control w-full max-w-xs'>
						<div className='label'>
							<span className='label-text'>Select your theme</span>
						</div>
						<select
							value={theme}
							onChange={handleThemeChange}
							className='select select-bordered w-full max-w-xs'
						>
							{themes.map((theme, i) => (
								<option key={i}>{theme}</option>
							))}
						</select>
					</label>
				</div>
			</Content>
		</Container>
	)
}

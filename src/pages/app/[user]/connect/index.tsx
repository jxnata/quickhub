import { FaGithub } from 'react-icons/fa'

export default function Painel() {
	return (
		<div className='h-screen w-full flex flex-col items-center'>
			<div className='breadcrumbs text-sm'>
				<ul>
					<li>Dashboard</li>
				</ul>
			</div>

			<h1 className='text-4xl font-bold'>Painel</h1>

			<div className='m-auto'>
				<div className='bg-base-200 rounded-box'>
					<div className='card-body'>
						<p className='mb-4'>If a dog chews shoes whose shoes does he choose?</p>
						<div className='card-actions justify-end'>
							<button className='btn btn-primary w-full'>
								<FaGithub />
								Connect your GitHub
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

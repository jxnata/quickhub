import ProjectsTable from '@/components/projects-table'
import { FaPlus } from 'react-icons/fa'

export default function Painel() {
	return (
		<div className='h-screen w-full flex flex-col items-center'>
			<div className='flex w-full justify-between items-end max-w-7xl mt-4 mb-8'>
				<div className='flex flex-col'>
					<div className='breadcrumbs text-sm'>
						<ul>
							<li>Dashboard</li>
						</ul>
					</div>
					<h1 className='text-4xl font-bold'>Painel</h1>
				</div>
				<button className='btn btn-primary'>
					<FaPlus />
					New Project
				</button>
			</div>

			<div className='w-full max-w-7xl'>
				<ProjectsTable />
			</div>
		</div>
	)
}

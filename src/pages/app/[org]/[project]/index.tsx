import Container from '@/components/container'
import ProjectsTable from '@/components/projects-table'
import Task from '@/components/task'
import Link from 'next/link'
import { FaCog, FaPlus } from 'react-icons/fa'

export default function Project() {
	return (
		<Container>
			<div className='flex w-full justify-between items-end max-w-7xl mt-4 mb-8'>
				<div className='flex flex-col'>
					<div className='breadcrumbs text-sm'>
						<ul>
							<li>
								<Link href='/app/[user]/organization' as='/app/jxnata/organization'>
									Organization
								</Link>
							</li>
							<li>
								<Link href='/app/[user]/organization/projects' as='/app/jxnata/organization/projects'>
									Projects
								</Link>
							</li>
							<li>Project name</li>
						</ul>
					</div>
					<h1 className='text-4xl font-bold'>Project Name</h1>
				</div>
				<div className='flex gap-4'>
					<button className='btn btn-primary'>
						<FaPlus />
						Create
					</button>
				</div>
			</div>

			<div className='w-full max-w-7xl flex gap-4'>
				<div className='rounded-lg bg-base-200 w-1/3 select-none'>
					<div className='card-body p-4'>
						<div className='flex gap-2'>
							<span className='text-sm text-neutral-content'>TO-DO</span>
							<div className='badge badge-neutral'>4</div>
						</div>
						<Task />
					</div>
				</div>
				<div className='rounded-lg bg-base-200 w-1/3 select-none'>
					<div className='card-body p-4'>
						<div className='flex gap-2'>
							<span className='text-sm text-neutral-content'>PROGRESS</span>
							<div className='badge badge-neutral'>4</div>
						</div>
					</div>
				</div>
				<div className='rounded-lg bg-base-200 w-1/3 select-none'>
					<div className='card-body p-4'>
						<div className='flex gap-2'>
							<span className='text-sm text-neutral-content'>DONE</span>
							<div className='badge badge-neutral'>4</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

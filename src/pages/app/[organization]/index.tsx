import Container from '@/components/container'
import ProjectsTable from '@/components/projects-table'
import Link from 'next/link'
import { FaCog, FaPlus } from 'react-icons/fa'

export default function Projects() {
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
							<li>Projects</li>
						</ul>
					</div>
					<h1 className='text-4xl font-bold'>Projects</h1>
				</div>
				<div className='flex gap-4'>
					<button className='btn btn-primary'>
						<FaPlus />
						New Project
					</button>
					<Link href={'/app/[user]/settings'} as={`/app/${'jxnata'}/settings`}>
						<button className='btn btn-secondary'>
							<FaCog />
						</button>
					</Link>
				</div>
			</div>

			<div className='w-full max-w-7xl'>
				<ProjectsTable />
			</div>
		</Container>
	)
}

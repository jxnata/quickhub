import useProjects from '@/hooks/projects'
import Row from './row'
import Skeleton from './skeleton'
import Link from 'next/link'

export default function ProjectsTable() {
	const { projects, loading } = useProjects({ skip: 0, limit: 30 })

	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				<thead>
					<tr>
						<th>Project</th>
						<th>Repository</th>
						<th>Tasks</th>
						<th></th>
					</tr>
				</thead>
				{!loading && (
					<tbody>
						{projects.map((project) => (
							<Row key={project._id} project={project} />
						))}
					</tbody>
				)}
				{loading && (
					<tbody>
						{Array.from({ length: 10 }).map((_, index) => (
							<Skeleton key={index} />
						))}
					</tbody>
				)}
				{!loading && projects.length === 0 && (
					<tbody>
						<tr>
							<td colSpan={4} className='text-center'>
								No projects found. Create your first project{' '}
								<Link className='link' href='/app/create'>
									here.
								</Link>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

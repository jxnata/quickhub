import useProjects from '@/hooks/projects'
import Row from './row'
import Skeleton from './skeleton'

export default function ProjectsTable() {
	const { projects, loading } = useProjects({ skip: 0, limit: 30 })

	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				<thead>
					<tr>
						<th>Project</th>
						<th>Repository</th>
						<th>Issues</th>
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
			</table>
		</div>
	)
}

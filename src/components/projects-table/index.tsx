import Row from './row'

export default function ProjectsTable() {
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
				<tbody>
					<Row />
					<Row />
					<Row />
				</tbody>
			</table>
		</div>
	)
}

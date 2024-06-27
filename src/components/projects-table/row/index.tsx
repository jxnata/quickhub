import { Project } from '@/types/api/projects'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function Row({ project }: { project: Project }) {
	return (
		<tr>
			<td>{project.name}</td>
			<td>
				<pre className='text-primary'>
					<code>{project.repository}</code>
				</pre>
			</td>
			<td>
				<span className='badge badge-neutral'>8</span>
			</td>
			<th className='text-end'>
				<Link className='btn btn-sm whitespace-nowrap' href={`/app/${project.repository}`}>
					Open
					<FaArrowRight />
				</Link>
			</th>
		</tr>
	)
}

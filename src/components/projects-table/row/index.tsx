import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function Row() {
	return (
		<tr>
			<td>Project name</td>
			<td>
				<pre className='text-primary'>
					<code>quickhub</code>
				</pre>
			</td>
			<td>
				<span className='badge badge-neutral'>8</span>
			</td>
			<th className='text-end'>
				<Link
					className='btn'
					href={'/app/[user]/[organization]/projects/[project]'}
					as={'/app/jxnata/jxnata/projects/quickhub'}
				>
					Open
					<FaArrowRight />
				</Link>
			</th>
		</tr>
	)
}

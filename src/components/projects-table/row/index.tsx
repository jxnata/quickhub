import { FaArrowRight } from 'react-icons/fa'

export default function Row() {
	return (
		<tr>
			<td>Project name</td>
			<td>
				Zemlak, Daniel and Leannon
				<br />
				<span className='badge badge-ghost badge-sm'>Desktop Support Technician</span>
			</td>
			<td>Purple</td>
			<th className='text-end'>
				<button className='btn'>
					Open
					<FaArrowRight />
				</button>
			</th>
		</tr>
	)
}

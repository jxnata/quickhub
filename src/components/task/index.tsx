import { AiFillMessage } from 'react-icons/ai'
import { BiMessage } from 'react-icons/bi'
import { FaClock, FaRegClock } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { FiMessageCircle } from 'react-icons/fi'

export default function Task() {
	return (
		<div className='w-full rounded-md bg-base-100 p-4'>
			<h3 className='font-bold pb-2'>Title</h3>
			<div className='flex gap-4 mb-2'>
				<small className='flex items-center gap-1'>
					<FaRegClock /> 2024-01-01
				</small>
				•<small className='flex items-center gap-1'>John Doe</small>
			</div>
			<p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<div className='flex gap-2 mb-2'>
				<div className='badge badge-neutral rounded-md'>neutral</div>
				<div className='badge badge-neutral rounded-md'>neutral</div>
			</div>
			<div className='flex w-full justify-between'>
				<span className='flex items-center gap-1'>
					<AiFillMessage /> 3
				</span>
				<div className='avatar-group -space-x-6 rtl:space-x-reverse'>
					<div className='avatar'>
						<div className='w-6'>
							<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
						</div>
					</div>
					<div className='avatar'>
						<div className='w-6'>
							<img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

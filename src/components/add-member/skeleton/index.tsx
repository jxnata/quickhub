export default function Skeleton() {
	return (
		<div className='w-full flex justify-between items-center mt-4'>
			<div className='flex items-center gap-2'>
				<div className='skeleton h-8 w-8 rounded-full'></div>
				<div>
					<div className='skeleton h-4 w-32 mb-1'></div>
					<div className='skeleton h-3 w-24'></div>
				</div>
			</div>
			<div className='skeleton h-8 w-12 rounded-md'></div>
		</div>
	)
}

import Link from 'next/link'

export default function PricingCard({ children, description, price, type, subscription, buttonText, active }: any) {
	return (
		<div className='w-full px-4 md:w-1/2 lg:w-1/3'>
			<div className='relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px] bg-base-200'>
				<span className='mb-3 block text-lg font-semibold text-primary'>{type}</span>
				<h2 className='mb-5 text-[42px] font-bold'>
					{price}
					<span className='text-base font-medium text-body-color dark:text-dark-6'>/ {subscription}</span>
				</h2>
				<p className='mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6'>
					{description}
				</p>
				<div className='mb-9 flex flex-col gap-[14px]'>{children}</div>
				<button className='btn btn-primary w-full'>{buttonText}</button>
			</div>
		</div>
	)
}

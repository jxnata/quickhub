export default function Faq() {
	return (
		<section className='w-full bg-base-100 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]'>
			<div className='mx-auto max-w-7xl px-4'>
				<div className='-mx-4 flex flex-wrap'>
					<div className='w-full px-4'>
						<div className='mx-auto mb-[60px] max-w-[510px] text-center'>
							<span className='mb-2 block text-lg font-semibold text-primary'>FAQ</span>
							<h2 className='mb-3 text-3xl font-bold leading-[1.208] sm:text-4xl md:text-[40px]'>
								Have Any Questions?
							</h2>
							<p className='text-base text-body-color dark:text-dark-6'>
								There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
								in some form.
							</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-8'>
					<div className='collapse collapse-arrow bg-base-200'>
						<input type='radio' name='my-accordion-2' defaultChecked />
						<div className='collapse-title text-xl font-medium'>Click to open this one and close others</div>
						<div className='collapse-content'>
							<p>hello</p>
						</div>
					</div>
					<div className='collapse collapse-arrow bg-base-200'>
						<input type='radio' name='my-accordion-2' />
						<div className='collapse-title text-xl font-medium'>Click to open this one and close others</div>
						<div className='collapse-content'>
							<p>hello</p>
						</div>
					</div>
					<div className='collapse collapse-arrow bg-base-200'>
						<input type='radio' name='my-accordion-2' />
						<div className='collapse-title text-xl font-medium'>Click to open this one and close others</div>
						<div className='collapse-content'>
							<p>hello</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

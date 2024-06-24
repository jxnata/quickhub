import React from 'react'
import PricingCard from './pricing-card'

export default function Pricing() {
	return (
		<section className='pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]'>
			<div className='container mx-auto max-w-7xl px-4'>
				<div className='-mx-4 flex flex-wrap'>
					<div className='w-full px-4'>
						<div className='mx-auto mb-[60px] max-w-[510px] text-center'>
							<span className='mb-2 block text-lg font-semibold text-primary'>Pricing Table</span>
							<h2 className='mb-3 text-3xl font-bold leading-[1.208] sm:text-4xl md:text-[40px]'>Our Pricing Plan</h2>
							<p className='text-base text-body-color dark:text-dark-6'>
								There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
								in some form.
							</p>
						</div>
					</div>
				</div>

				<div className='-mx-4 flex flex-wrap justify-center'>
					<div className='-mx-4 flex flex-wrap'>
						<PricingCard
							type='Personal'
							price='$59'
							subscription='year'
							description='Perfect for using in a personal website or a client project.'
							buttonText='Choose Personal'
						>
							<p>1 User</p>
							<p>All UI components</p>
							<p>Lifetime access</p>
							<p>Free updates</p>
							<p>Use on 1 (one) project</p>
							<p>3 Months support</p>
						</PricingCard>
						<PricingCard
							type='Business'
							price='$199'
							subscription='year'
							description='Perfect for using in a personal website or a client project.'
							buttonText='Choose Business'
							active
						>
							<p>5 User</p>
							<p>All UI components</p>
							<p>Lifetime access</p>
							<p>Free updates</p>
							<p>Use on31 (Three) project</p>
							<p>4 Months support</p>
						</PricingCard>
						<PricingCard
							type='Professional'
							price='$256'
							subscription='year'
							description='Perfect for using in a personal website or a client project.'
							buttonText='Choose Professional'
						>
							<p>Unlimited User</p>
							<p>All UI components</p>
							<p>Lifetime access</p>
							<p>Free updates</p>
							<p>Unlimited project</p>
							<p>12 Months support</p>
						</PricingCard>
					</div>
				</div>
			</div>
		</section>
	)
}

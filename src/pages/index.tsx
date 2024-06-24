import Faq from '@/components/faq'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Pricing from '@/components/pricing'

export default function Home() {
	return (
		<div className='flex flex-col items-center'>
			<Navbar />
			<Hero />
			<Pricing />
			<Faq />
		</div>
	)
}

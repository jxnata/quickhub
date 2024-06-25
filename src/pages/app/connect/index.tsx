import Container from '@/components/container'
import { FaGithub } from 'react-icons/fa'

export default function Painel() {
	return (
		<Container>
			<div className='m-auto w-full max-w-xl'>
				<div className='bg-base-200 rounded-box'>
					<div className='card-body'>
						<p className='mb-4'>If a dog chews shoes whose shoes does he choose?</p>
						<div className='card-actions justify-end'>
							<button className='btn btn-primary w-full'>
								<FaGithub />
								Connect your GitHub
							</button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

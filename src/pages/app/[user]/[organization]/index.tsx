import Container from '@/components/container'

export default function Painel() {
	return (
		<Container>
			<div className='m-auto w-full max-w-xl'>
				<div className='bg-base-200 rounded-box'>
					<div className='card-body'>
						<p className='mb-4'>Select your organization</p>
						<ul className='menu bg-base-300 rounded-box w-full'>
							<li>
								<a>Org 1</a>
							</li>
							<li>
								<a>Org 2</a>
							</li>
							<li>
								<a>Org 3</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</Container>
	)
}

import Container from '@/components/container'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function Auth() {
	const githubAuth = async () => {
		await signIn('github')
	}

	const googleAuth = async () => {
		await signIn('google')
	}

	return (
		<Container>
			<div className='m-auto w-full max-w-md'>
				<div className='bg-base-200 rounded-box'>
					<div className='card-body text-center'>
						<Image src='/logo.svg' alt='quickhub' width={64} height={64} className='mb-6 mx-auto' />
						<p className='mb-4'>Choose a way to sign in</p>
						<div className='card-actions justify-end'>
							<button onClick={githubAuth} className='btn bg-base-300 w-full'>
								<FaGithub />
								Sign in with GitHub
							</button>
							{/* <button onClick={googleAuth} className='btn bg-base-300 w-full'>
								<FaGoogle />
								Sign in with Google
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

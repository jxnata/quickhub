import Container from '@/components/container'
import settings from '@/constants/settings'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function Auth() {
	return (
		<Container>
			<div className='m-auto w-full max-w-md'>
				<div className='bg-base-200 rounded-box'>
					<div className='card-body text-center'>
						<Image src='/logo.svg' alt='quickhub' width={64} height={64} className='mb-6 mx-auto' />
						<p className='mb-4'>Choose a way to sign in</p>
						<div className='card-actions justify-end'>
							{settings.auth_providers.includes('github') && (
								<button onClick={() => signIn('github')} className='btn bg-base-300 w-full'>
									<FaGithub />
									Sign in with GitHub
								</button>
							)}
							{settings.auth_providers.includes('google') && (
								<button onClick={() => signIn('google')} className='btn bg-base-300 w-full'>
									<FaGoogle />
									Sign in with Google
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

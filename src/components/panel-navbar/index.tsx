/* eslint-disable @next/next/no-img-element */
import { auth } from '@/helpers/auth'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function PanelNavbar({ title }: Props) {
	const { data } = useSession()

	if (!data) return null
	if (!data.user) return null

	return (
		<div className='navbar bg-base-200 px-4'>
			<div className='flex-1'>
				{!!title ? (
					<h1 className='text-xl font-bold'>{title}</h1>
				) : (
					<div className='skeleton rounded-md h-8 w-1/3' />
				)}
			</div>
			<div className='flex-none'>
				<div className='dropdown dropdown-end'>
					<div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
						<div className='w-10 rounded-full'>
							<img alt={data.user.name!} src={data.user.image!} />
						</div>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
					>
						<li>
							<a className='justify-between'>
								Profile
								<span className='badge'>New</span>
							</a>
						</li>
						<li>
							<Link href='/app/settings'>Settings</Link>
						</li>
						<li>
							<a onClick={() => signOut()}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

type Props = {
	title?: string
}

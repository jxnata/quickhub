import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
						</svg>
					</div>
					<ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
						<li>
							<a href='#home'>Home</a>
						</li>
						<li>
							<a href='#features'>Features</a>
						</li>
						<li>
							<a href='#pricing'>Pricing</a>
						</li>
					</ul>
				</div>
				<Link href='/' className='ml-4'>
					<Image src='/logo.svg' alt='quickhub' width={64} height={64} />
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					<li>
						<a href='#home'>Home</a>
					</li>
					<li>
						<a href='#features'>Features</a>
					</li>
					<li>
						<a href='#pricing'>Pricing</a>
					</li>
				</ul>
			</div>
			<div className='navbar-end mr-4'>
				<a className='btn'>Login</a>
			</div>
		</div>
	)
}

import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import Task from '@/components/task'
import useProject from '@/hooks/projects/view'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'

export default function Project() {
	const { query } = useRouter()

	const { project } = useProject({ repository: `${query.org}/${query.name}` })

	return (
		<Container>
			<PainelNavbar title={project && project.name} />

			{project && (
				<Content>
					<div className='flex w-full max-w-7xl mt-4 mb-8'>
						<div className='breadcrumbs text-sm'>
							<ul>
								<li>
									<Link href='/app' as='/app'>
										Projects
									</Link>
								</li>
								<li>{project.name}</li>
							</ul>
						</div>
					</div>
					<div className='w-full max-w-7xl flex gap-4'>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>TO-DO</span>
									<div className='badge badge-neutral'>4</div>
								</div>
								<Task />
							</div>
						</div>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>PROGRESS</span>
									<div className='badge badge-neutral'>4</div>
								</div>
							</div>
						</div>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>DONE</span>
									<div className='badge badge-neutral'>4</div>
								</div>
							</div>
						</div>
					</div>
				</Content>
			)}

			{!project && <Skeleton />}
		</Container>
	)
}

const Skeleton = () => {
	return (
		<Container>
			<Content>
				<div className='w-full max-w-7xl flex gap-4 mt-8'>
					<div className='skeleton h-96 w-1/3'></div>
					<div className='skeleton h-96 w-1/3'></div>
					<div className='skeleton h-96 w-1/3'></div>
				</div>
			</Content>
		</Container>
	)
}

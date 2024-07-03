import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import Task from '@/components/task-item'
import useProject from '@/hooks/projects/view'
import useTasks from '@/hooks/tasks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHamburger, FaList, FaPlus, FaUpload } from 'react-icons/fa'

export default function Project() {
	const { query } = useRouter()

	const { project } = useProject({ repository: query && `${query.org}/${query.name}` })
	const { tasks, loading } = useTasks({ project: project?._id })

	return (
		<Container>
			<PainelNavbar title={project && project.name} />

			{project && (
				<Content>
					<div className='flex w-full justify-between items-center max-w-7xl mt-4 mb-8'>
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
						<div className='flex items-center gap-2'>
							<Link href={`/app/${project.repository}/create`} className='btn btn-primary'>
								<FaPlus />
								Create
							</Link>
							<Link href={`/app/${project.repository}/create`} className='btn btn-outline'>
								<FaUpload />
							</Link>
							<button className='btn btn-outline'>
								<FaList />
							</button>
						</div>
					</div>
					<div className='w-full max-w-7xl flex gap-4'>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>TO-DO</span>
									{loading ? (
										<div className='skeleton w-5 h-5' />
									) : (
										<div className='badge badge-neutral'>{tasks.todo.length}</div>
									)}
								</div>
								{tasks.todo.map((task, i) => (
									<Task key={i} task={task} />
								))}
								{loading && <div className='skeleton w-full h-48 rounded-md' />}
							</div>
						</div>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>PROGRESS</span>
									{loading ? (
										<div className='skeleton w-3 h-3' />
									) : (
										<div className='badge badge-neutral'>{tasks.in_progress.length}</div>
									)}
								</div>
								{tasks.in_progress.map((task, i) => (
									<Task key={i} task={task} />
								))}
								{loading && <div className='skeleton w-full h-48 rounded-md' />}
							</div>
						</div>
						<div className='rounded-lg bg-base-200 w-1/3 select-none'>
							<div className='card-body p-4'>
								<div className='flex gap-2'>
									<span className='text-sm text-neutral-content'>DONE</span>
									{loading ? (
										<div className='skeleton w-3 h-3' />
									) : (
										<div className='badge badge-neutral'>{tasks.done.length}</div>
									)}
								</div>
								{tasks.done.map((task, i) => (
									<Task key={i} task={task} />
								))}
								{loading && <div className='skeleton w-full h-48 rounded-md' />}
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

import BacklogTask from '@/components/backlog-task'
import Container from '@/components/container'
import Content from '@/components/content'
import PanelNavbar from '@/components/panel-navbar'
import Task from '@/components/task-item'
import useProject from '@/hooks/projects/view'
import useTasks from '@/hooks/tasks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaList, FaPlus } from 'react-icons/fa'

export default function Project() {
	const { query } = useRouter()

	const { project } = useProject({ repository: query && `${query.org}/${query.name}` })
	const { tasks, loading } = useTasks({ project: project?._id })

	return (
		<Container>
			<PanelNavbar title={project && project.name} />

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
							<div className='drawer drawer-end'>
								<input id='backlog-drawer' type='checkbox' className='drawer-toggle' />
								<div className='drawer-content'>
									<div className='indicator'>
										{tasks && tasks.backlog.length > 0 && (
											<span className='indicator-item badge badge-primary z-0'>
												{tasks.backlog.length}
											</span>
										)}
										<label htmlFor='backlog-drawer' className='drawer-button btn btn-outline'>
											<FaList />
										</label>
									</div>
								</div>
								<div className='drawer-side'>
									<label
										htmlFor='backlog-drawer'
										aria-label='close sidebar'
										className='drawer-overlay'
									></label>
									<div className='bg-base-200 text-base-content min-h-full w-full max-w-96 p-4'>
										<h3 className='text-xl font-bold mb-4'>Backlog Tasks</h3>
										{tasks.backlog.map((task, i) => (
											<BacklogTask key={i} task={task} />
										))}
										{tasks.backlog.length === 0 && (
											<div className='text-center text-neutral-content'>
												No tasks in backlog.
												<br />
												<Link
													href={`/app/${project.repository}/create`}
													className='btn btn-sm btn-primary mt-4'
												>
													Create one
												</Link>
											</div>
										)}
									</div>
								</div>
							</div>
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

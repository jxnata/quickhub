/* eslint-disable @next/next/no-img-element */
import { Task } from '@/types/api/tasks'
import { FaGithub, FaRegClock } from 'react-icons/fa'

export default function TaskItem({ task }: Props) {
	return (
		<div className='w-full rounded-md bg-base-100 p-4 cursor-pointer'>
			<h3 className='font-bold pb-2'>{task.title}</h3>
			<p className='mb-2'>{task.description.substring(0, 80)}...</p>
			<div className='flex gap-2 mb-2'>
				{task.tags.map((tag, i) => (
					<div key={i} className='badge badge-neutral rounded-md'>
						{tag}
					</div>
				))}
			</div>
			<div className='flex w-full justify-between items-center'>
				<div className='flex items-center gap-2'>
					<div className='badge badge-ghost h-7'>
						<a
							className='flex gap-2 items-center my-2'
							href={`https://github.com/${task.project.repository}/issues/${task.issue_id}`}
							target='_blank'
							rel='noreferrer'
						>
							<FaGithub /> #{task.issue_id}
						</a>
					</div>
					<div className='flex gap-1'>
						<small className='flex items-center gap-1'>
							<FaRegClock /> {new Date(task.created_at).toLocaleDateString()}
						</small>
					</div>
				</div>
				<div className='avatar-group -space-x-6 rtl:space-x-reverse'>
					{task.assignees.map((assignee, i) => (
						<div key={i} className='avatar'>
							<div className='w-6'>
								<img src={assignee.image} alt={assignee.username} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

type Props = {
	task: Task
}

/* eslint-disable @next/next/no-img-element */
import useTasks from '@/hooks/tasks'
import { api } from '@/services/api/main'
import { Task, TaskStatus } from '@/types/api/tasks'
import { toastError } from '@/utils/toast-error'
import { useState } from 'react'
import { FaGithub, FaPlusCircle, FaRegClock } from 'react-icons/fa'
import { toast } from 'sonner'

export default function BacklogTask({ task }: Props) {
	const [loading, setLoading] = useState(false)
	const { mutate } = useTasks({ project: task.project._id })

	const changeStatus = async (status: TaskStatus) => {
		try {
			setLoading(true)

			await api.put(`/tasks/${task._id}/status`, { status })

			toast.success('Task updated!')
			mutate()
		} catch (error) {
			toastError(error, 'Failed to update task')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='collapse bg-base-200 rounded-md'>
			<input type='radio' name='backlog-accordion' />
			<div className='collapse-title font-medium bg-base-100 flex items-center p-4'>
				<div className='tooltip tooltip-right z-20' data-tip='Add to panel'>
					<button onClick={() => changeStatus(TaskStatus.TODO)} className='btn btn-ghost btn-circle btn-sm'>
						{loading ? <span className='loading loading-spinner'></span> : <FaPlusCircle />}
					</button>
				</div>
				{task.title}
			</div>
			<div className='collapse-content p-0'>
				<div className='w-full bg-base-100 p-4 pt-0 rounded-b-md'>
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
			</div>
		</div>
	)
}

type Props = {
	task: Task
}

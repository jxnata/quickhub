import { api } from '@/services/api/main'
import { TaskList } from '@/types/api/tasks'
import useSWR from 'swr'

const initial = {
	backlog: [],
	todo: [],
	in_progress: [],
	done: [],
}

const fetcher = (url: string) => api.get<TaskList>(url).then(r => r.data)

const useTasks = ({ project }: Props) => {
	const { data, error, mutate } = useSWR(project ? `/tasks/project/${project}` : null, fetcher)

	return {
		tasks: data?.tasks || initial,
		loading: !data && !error,
		mutate
	}
}

export default useTasks

type Props = {
	project?: string,
}
import { api } from '@/services/api/main'
import { TaskView } from '@/types/api/tasks'
import useSWR from 'swr'

const fetcher = (url: string) => api.get<TaskView>(url).then(r => r.data)

const useTask = ({ _id }: Props) => {

    const { data, error } = useSWR(_id ? `/tasks/${_id}` : null, fetcher)

    return {
        task: data?.task,
        loading: !data && !error,
    }
}

export default useTask

type Props = {
    _id?: string
}
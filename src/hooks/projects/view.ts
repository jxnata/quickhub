import { api } from '@/services/api/main'
import { ProjectView } from '@/types/api/projects'
import useSWR from 'swr'


const fetcher = (url: string) => api.get<ProjectView>(url).then(r => r.data)

const useProject = ({ _id, repository }: Props) => {
    const enabled = !!_id || !!repository

    const { data, error } = useSWR(enabled ? `/projects/${repository && 'repo'}/${_id || repository}` : null, fetcher)

    return {
        project: data?.project,
        loading: !data && !error,
    }
}

export default useProject

type Props = {
    _id?: string
    repository?: string
}
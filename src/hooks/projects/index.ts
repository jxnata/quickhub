import { api } from '@/services/api/main'
import { ProjectList } from '@/types/api/projects'
import useSWR from 'swr'


const fetcher = (url: string) => api.get<ProjectList>(url).then(r => r.data)

const useProjects = ({ skip, limit }: Props) => {
	const { data, error } = useSWR(`/projects?skip=${skip}&limit=${limit}`, fetcher)

	return {
		projects: data?.projects || [],
		loading: !data && !error,
	}
}

export default useProjects

type Props = {
	skip: number,
	limit: number
}
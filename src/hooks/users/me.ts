import { api } from '@/services/api/main'
import { UserResponse } from '@/types/api/users'
import useSWR from 'swr'

const fetcher = (url: string) => api.get<UserResponse>(url).then(r => r.data)

const useMe = () => {
	const { data, error } = useSWR(`/users/me`, fetcher)

	return {
		user: data?.user,
		loading: !data && !error,
	}
}

export default useMe
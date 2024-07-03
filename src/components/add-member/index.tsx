/* eslint-disable @next/next/no-img-element */

import Skeleton from './skeleton'
import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { getOctokit } from '@/helpers/github'
import { useSession } from 'next-auth/react'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { toast } from 'sonner'
import { FaTimes } from 'react-icons/fa'

type User = RestEndpointMethodTypes['users']['getByUsername']['response']['data']

export default function AddMember({ handleMember, members }: Props) {
	const { data: session } = useSession()
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [user, setUser] = useState<User>()

	const handle = (member: string) => {
		handleMember(member)
		setSearchTerm('')
		setUser(undefined)
		document.querySelector<HTMLInputElement>('#search')!.value = ''
	}

	const searchUser = useCallback(async () => {
		try {
			if (!session) return
			if (!session.accessToken) return

			setLoading(true)

			const octokit = getOctokit(session.accessToken)

			const { data } = await octokit.users.getByUsername({ username: searchTerm })

			setUser(data)
		} catch {
			toast.error('Failed to search user')
			setUser(undefined)
		} finally {
			setLoading(false)
		}
	}, [searchTerm, session])

	const debouncedSearch = debounce(async (term) => {
		setSearchTerm(term)
	}, 500)

	useEffect(() => {
		if (!searchTerm) return

		searchUser()
	}, [searchTerm, searchUser])

	return (
		<div className='form-control'>
			<label className='label'>
				<span className='label-text'>Project Members</span>
			</label>
			{members.length > 0 && (
				<div className='w-full my-4 flex gap-2 overflow-x-auto'>
					{members.map((member, i) => (
						<div key={i} className='badge badge-ghost p-4'>
							{member}
							<button type='button' className='ml-2' onClick={() => handle(member)}>
								<FaTimes />
							</button>
						</div>
					))}
				</div>
			)}
			<input
				id='search'
				type='text'
				className='input input-bordered w-full'
				placeholder='Search by github username'
				onChange={(e) => debouncedSearch(e.target.value)}
			/>
			{loading && <Skeleton />}
			{!loading && (
				<>
					{user && (
						<div className='flex items-center justify-between mt-4 bg-base-200 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<div className='avatar w-8'>
									<div className='w-24 rounded-full'>
										<img src={user.avatar_url} alt={user.login} />
									</div>
								</div>
								<div className='flex flex-col'>
									<b className='text-sm'>{user.name}</b>
									<span className='text-xs'>@{user.login}</span>
								</div>
							</div>
							<button type='button' className='btn btn-outline btn-sm' onClick={() => handle(user.login)}>
								Add
							</button>
						</div>
					)}
				</>
			)}
		</div>
	)
}

type Props = {
	handleMember: (user: string) => void
	members: string[]
}

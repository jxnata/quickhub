import Container from '@/components/container'
import Content from '@/components/content'
import PainelNavbar from '@/components/painel-navbar'
import ProjectsTable from '@/components/projects-table'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

export default function Projects() {
	return (
		<Container>
			<PainelNavbar title='Projects' />
			<Content>
				<div className='flex w-full justify-end items-end max-w-7xl my-4'>
					<div className='flex gap-4'>
						<Link href='/app/create' className='btn btn-primary'>
							<FaPlus />
							New Project
						</Link>
					</div>
				</div>

				<div className='w-full max-w-7xl'>
					<ProjectsTable />
				</div>
			</Content>
		</Container>
	)
}

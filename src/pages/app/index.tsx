import Container from '@/components/container'
import Content from '@/components/content'
import PanelNavbar from '@/components/panel-navbar'
import ProjectsTable from '@/components/projects-table'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

export default function Projects() {
	return (
		<Container>
			<PanelNavbar title='Projects' />
			<Content>
				<div className='flex w-full justify-end items-end max-w-7xl my-4'>
					<Link href='/app/create' className='btn btn-primary'>
						<FaPlus />
						New Project
					</Link>
				</div>

				<div className='w-full max-w-7xl'>
					<ProjectsTable />
				</div>
			</Content>
		</Container>
	)
}

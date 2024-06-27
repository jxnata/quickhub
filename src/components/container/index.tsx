export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen w-full flex flex-col items-center bg-base-100 text-base-content'>{children}</div>
	)
}

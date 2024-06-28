import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { useEffect } from 'react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => {
		const theme = localStorage.getItem('theme')
		if (theme) document.documentElement.setAttribute('data-theme', theme)
	}, [])

	return (
		<SessionProvider session={session}>
			<Toaster />
			<Component {...pageProps} />
		</SessionProvider>
	)
}

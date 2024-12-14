import '@/styles/globals.css';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { JSX } from 'react';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>MyTop - наш лучший топ</Head>
			<link rel='icon' href='/favicon.ico' />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link
				rel='preconnect'
				href='https://fonts.gstatic.com'
				crossOrigin='anonymous'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:wght@300..800&display=swap'
				rel='stylesheet'
			/>
			<Component {...pageProps} />
		</>
	);
}

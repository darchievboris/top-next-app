import '@/styles/globals.css';
import {AppProps} from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import {JSX} from 'react';
import {router} from "next/client";
import ym, {YMInitializer} from 'react-yandex-metrika';

export default function App({Component, pageProps}: AppProps): JSX.Element {
    router.events.on('routeChangeComplete', (url: string) => {
        if (typeof window !== 'undefined') {
            ym('hit', url);
        }
    });
    return (
        <>
            <Head>
                <title>MyTop - наш лучший топ</title>
                <link
                    rel='icon'
                    href='/favicon.ico'/>
                <link
                    rel='preconnect'
                    href='https://fonts.googleapis.com'/>
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'/>
                <link
                    rel="preconnect"
                    href="https://mc.yandex.ru"/>
                <link
                    href='https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:wght@300..800&display=swap'
                    rel='stylesheet'/>
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
                <meta
                    property="og:locale"
                    content="ru_RU"/>
            </Head>
            <YMInitializer
                accounts={[]}
                options={{webvisor: true, defer: true}}
                version="2"
            />
            <Component {...pageProps} />
        </>
    );
}

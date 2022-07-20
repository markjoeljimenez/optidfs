import * as Sentry from '@sentry/browser';
import { Head, Html, Main, NextScript } from 'next/document';

process.on('unhandledRejection', (err) => {
	Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
	Sentry.captureException(err);
});

export default function Document() {
	return (
		<Html>
			<Head>
				{process.env.ENV !== 'develop' && (
					<>
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
						/>

						<script
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${process.env.GA_TRACKING_ID}');
							`,
							}}
						/>
					</>
				)}

				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link href="https://fonts.gstatic.com" rel="preconnect" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="font-display text-sm text-gray-700">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

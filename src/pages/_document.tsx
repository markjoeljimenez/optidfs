import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
	Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
	Sentry.captureException(err);
});

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
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

					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;400;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="font-display">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

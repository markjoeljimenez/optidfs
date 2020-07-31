import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as Sentry from '@sentry/browser';
import { NextSeo } from 'next-seo';

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
				</Head>
				<NextSeo
					title="DraftKings NBA Optimizer"
					description="A tool to help you generate the best NBA lineups for DraftKings"
				/>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

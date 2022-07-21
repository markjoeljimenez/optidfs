// Mocks useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: {
	asPath: string;
	pathname: string;
	query: string;
	route: string;
}) {
	useRouter.mockImplementationOnce(() => ({
		...props,
	}));
}

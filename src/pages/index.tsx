import router from 'next/router';
import { getServerSession } from 'next-auth';
import { useEffect } from 'react';

import RightNavigation from '@/components/global/right-navigation';
import { Contests } from '@/containers/Contests';
import { Export } from '@/containers/Export';
import { Optimize } from '@/containers/Optimize';
import { Table } from '@/containers/Table';

import { useAppSelector } from '../hooks';
import { authOptions } from './api/auth/[...nextauth]';

const Index = () => {
	const { contests, global, providers, sports } = useAppSelector(
		(state) => state
	);

	// useEffect(() => {
	// 	if (!global.hasVisited) {
	// 		router.push('/optimize/start/1', undefined, {
	// 			shallow: true,
	// 		});
	// 	}
	// }, [contests.selectedContest, providers.provider, sports.selectedSport]);

	return (
		<div className="relative flex flex-1">
			<div className="h-full flex flex-col p-8 flex-1">
				{/* <div className="flex space-x-4 justify-between">
					<Contests />

					<div className="flex space-x-3">
						<Export />
						<Optimize />
					</div>
				</div>

				<div className="max-h-full overflow-y-hidden mt-6">
					<Table />
				</div> */}
			</div>
			<RightNavigation />
		</div>
	);
};

// export async function getServerSideProps(context: any) {
// 	const session = await getServerSession(
// 		context.req,
// 		context.res,
// 		authOptions
// 	);

// 	console.log(session);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }

export default Index;

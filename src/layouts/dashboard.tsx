import { connect } from 'react-redux';

import Nav from '../components/global/nav';
import SkipLink from '../components/global/skiplink';
import Providers from '../containers/Providers/Providers';
import Sports from '../containers/Sports/Sports';
import Upload from '../containers/Upload/Upload';

export interface ILayoutProps {
	children: React.ReactNode;
	providers: any;
	sports: any;
}

const Dashboard = ({ children, providers, sports }: ILayoutProps) => (
	<div className="md:flex md:min-h-screen text-blue-800">
		<Nav />

		<main className="w-full">
			<div className="border-b border-gray-300">
				<div className="container mx-auto p-8 flex">
					<div className="space-x-4 flex">
						{providers && (
							<>
								<Sports />

								{sports.sport && <Upload />}
							</>
						)}
					</div>
				</div>
			</div>

			{children}
		</main>
	</div>
);

const mapStateToProps = ({ providers, sports }) => ({
	providers,
	sports,
});

export default connect(mapStateToProps)(Dashboard);

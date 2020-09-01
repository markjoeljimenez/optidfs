import { connect } from 'react-redux';
import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';

const BarContainer = ({ draftGroupId }: any) =>
	draftGroupId ? (
		<>
			<Search />
			<Optimize />
		</>
	) : (
		<></>
	);

const mapStateToProps = ({ table }) => ({
	draftGroupId: table.draftGroupId,
});

export default connect(mapStateToProps)(BarContainer);

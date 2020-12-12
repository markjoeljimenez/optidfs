import { connect } from 'react-redux';

import Error from '../../components/error';

interface IErrorContainerProps {
	error: null | string;
}

const ErrorContainer = ({ error }: IErrorContainerProps) => (
	<Error error={error} />
);

const mapStateToProps = ({ error }) => ({
	error,
});

export default connect(mapStateToProps)(ErrorContainer);

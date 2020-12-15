import { connect } from 'react-redux';

import Error from '../../components/error';

export interface IError {
	type: string;
	message: string;
	show: boolean;
}

interface IErrorContainerProps {
	error: null | IError;
}

const ErrorContainer = ({ error }: IErrorContainerProps) => (
	<Error error={error} />
);

const mapStateToProps = ({ error }) => ({
	error,
});

export default connect(mapStateToProps)(ErrorContainer);

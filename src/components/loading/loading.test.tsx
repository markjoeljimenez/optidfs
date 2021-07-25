import renderer from 'react-test-renderer';
import Loading from './loading';

it('renders homepage unchanged', () => {
	const tree = renderer
		.create(
			<Loading loading={true}>
				<p>Test</p>
			</Loading>
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});

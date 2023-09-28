import { useRoutes } from 'react-router-dom';

export const Routes = () => {
	const commonRoutes = [{ path: '/', element: <div>hi</div> }];

	return useRoutes(commonRoutes);
};

import { Optimize } from '@optidfs.rewrite.2/pages';
import { useRoutes } from 'react-router-dom';

export const routes = [{ path: '/', element: <Optimize />, name: 'Optimize' }];

export const Routes = () => {
	return useRoutes(routes);
};

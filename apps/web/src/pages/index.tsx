import { Optimize } from './Optimize';
import { useRoutes } from 'react-router-dom';

export const pages = [{ path: '/', element: <Optimize />, name: 'Optimize' }];

export const Pages = () => {
	return useRoutes(pages);
};

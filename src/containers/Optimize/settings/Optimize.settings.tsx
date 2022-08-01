import OptimizeNumberOfGenerations from './components/Optimize.numberOfGenerations';
import OptimizeStatusFilters from './components/Optimize.statusFilters';

const OptimizeSettings = () => (
	<div className="space-y-6">
		<OptimizeNumberOfGenerations />
		<OptimizeStatusFilters />
	</div>
);

export default OptimizeSettings;
import OptimizeMaximumExposureForAllPlayers from './components/Optimize.maximumExposure';
import OptimizeNumberOfGenerations from './components/Optimize.numberOfGenerations';
import OptimizeStatusFilters from './components/Optimize.statusFilters';

export const OptimizeSettings = () => (
	<div className="space-y-6">
		<OptimizeNumberOfGenerations />
		<OptimizeStatusFilters />
		<OptimizeMaximumExposureForAllPlayers />
	</div>
);

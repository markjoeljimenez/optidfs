import { getOptimizedLineups } from './api/getOptimizedLineups';
import Optimize from './components/Optimize.component';
import IOptimizedLineup from './models/IOptimizedLineup';
import OptimizeReducers, {
	optimizedState,
	setCurrentOptimizedLineup,
} from './redux/Optimize.reducers';

// Api
export { getOptimizedLineups };

// State
export { optimizedState };

// Actions
export { setCurrentOptimizedLineup };

// Reducers
export { OptimizeReducers };

// Interfaces
export type { IOptimizedLineup };

// Components
export default Optimize;

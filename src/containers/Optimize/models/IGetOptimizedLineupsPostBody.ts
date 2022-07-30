import { EProviders, IPlayer } from '@/containers/Players';
import { ISport } from '@/containers/Sports';

import IOptimizeSettings from './IOptimizeSettings';

export interface IGetOptimizedLineupsPostBody {
	players: IPlayer[];
	provider: EProviders;
	settings: IOptimizeSettings;
	sport: ISport;
}

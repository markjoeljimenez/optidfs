import { IPlayer } from '@/containers/Players';
import { EProviders } from '@/containers/Providers';
import { ISport } from '@/containers/Sports';

import IOptimizeSettings from './IOptimizeSettings';

export interface IGetOptimizedLineupsPostBody {
	players: IPlayer[];
	provider: EProviders;
	settings: IOptimizeSettings;
	sport: ISport;
}

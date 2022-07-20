import { useLocalStorage } from 'react-use';

import { IContest } from '@/containers/Contests';
import { ISport } from '@/containers/Sports';

export interface ILocalStorage {
	contest?: IContest;
	provider?: string;
	sport?: ISport;
}

export const useAppLocalStorage = (
	key: string = 'optidfs',
	initialValue?: any
) => useLocalStorage<ILocalStorage>(key, initialValue);

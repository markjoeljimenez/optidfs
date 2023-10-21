import { useAppSelector } from '@optidfs.rewrite.2/api';

/* eslint-disable-next-line */
export interface PagesProps {}

export function Optimize(props: PagesProps) {
	const count = useAppSelector((state) => state.counter.value);

	console.log(count);

	return (
		<div>
			<h1>Welcome to Pages!</h1>
		</div>
	);
}

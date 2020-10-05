import { format } from 'date-fns';

const mock = [
	{
		home: { team: 'MIA', image: '/images/MIA.jpg' },
		away: { team: 'LAL', image: '/images/LAL.jpg' },
		date: format(new Date().getUTCDate(), 'Ka'),
	},

	{
		home: { team: 'BOS', image: '/images/BOS.jpg' },
		away: { team: 'TOR', image: '/images/TOR.jpg' },
		date: format(new Date().getUTCDate(), 'Ka'),
	},
	{
		home: { team: 'MIA', image: '/images/MIA.jpg' },
		away: { team: 'BOS', image: '/images/BOS.jpg' },
		date: format(new Date().getUTCDate(), 'Ka'),
	},
];

const GameListing = () => (
	<div className="flex mt-4 overflow-x-scroll over">
		{mock.map((game) => (
			<div className="rounded shadow-md bg-white flex ml-4 first:ml-0 min-h-7">
				<div className="flex-1 min-w-9 flex">
					<div className="flex-1 w-full relative border-r border-gray-300">
						<div
							style={{
								backgroundPosition: '70% 85%',
								backgroundSize: '225% auto',
								clipPath: 'polygon(100% 0, 0 100%, 0 0)',
								backgroundImage: `url(${game.home.image})`,
							}}
							className="absolute inset-x-0 inset-y-0 bg-no-repeat z-10 rounded-tl rounded-bl"
						/>
						<div
							style={{
								backgroundPosition: '30% 15%',
								backgroundSize: '225% auto',
								clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
								backgroundImage: `url(${game.away.image})`,
							}}
							className="absolute inset-x-0 inset-y-0 bg-no-repeat rounded-bl"
						/>
					</div>
				</div>
				<div className="flex-2 p-4">
					<p>
						<span className="font-black">{game.home.team}</span> @{' '}
						<span className="font-black">{game.away.team}</span>
					</p>
					<p>{game.date}</p>
				</div>
			</div>
		))}
	</div>
);

export default GameListing;

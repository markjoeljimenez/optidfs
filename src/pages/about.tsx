/* eslint-disable react/jsx-one-expression-per-line */
import Panel from '../templates/panel';

const About = () => (
	<Panel>
		<div style={{ maxWidth: '35rem' }}>
			<h2>What is this?</h2>

			<p>
				This tool aims to help you generate the best possible lineups
				for DraftKings daily contests.
			</p>

			<h2>Features:</h2>

			<ul>
				<li>
					<p>
						Utilizes{' '}
						<a
							href="https://github.com/DimaKudosh/pydfs-lineup-optimizer"
							target="_blank"
							rel="noopener noreferrer"
						>
							pydfs-lineup-optimizer
						</a>{' '}
						to generate lineups
					</p>
				</li>
				<li>
					<p>
						Requests straight from DraftKings&apos; API; no
						exporting/importing CSVs
					</p>
				</li>
				<li>
					<p>Generate more than one optimized lineup</p>
				</li>
				<li>
					<p>Filter by player, team, and position</p>
				</li>
			</ul>

			<h2>Todo:</h2>

			<ul>
				<li>
					<p>
						Implement backend architecture (account registration,
						SQL database)
					</p>
				</li>
				<li>
					<p>
						Implement statistics/history page of past submitted
						lineups
					</p>
				</li>
				<li>
					<p>Integrate more sports (MLB, NFL, NHL, etc)</p>
				</li>
				<li>
					<p>
						Implement more features from{' '}
						<a
							href="https://github.com/DimaKudosh/pydfs-lineup-optimizer"
							target="_blank"
							rel="noopener noreferrer"
						>
							pydfs-lineup-optimizer
						</a>
						:
						<ul>
							<li>
								<p>Lock/remove players</p>
							</li>
							<li>
								<p>DraftKings late-swap</p>
							</li>
							<li>
								<p>Max/min exposure and randomness</p>
							</li>
							<li>
								<p>Custom rules</p>
							</li>
						</ul>
					</p>
				</li>
				<li>
					<p>
						Eventually expand to other fantasy sports apps such as
						Yahoo!, FanDuel, etc.
					</p>
				</li>
			</ul>

			<h2>Can I contribute to this project?</h2>

			<p>Yes you can! This project is open-source on Github!</p>
			<p>Here are a few links:</p>
			<ul>
				<li>
					<p>
						<a
							href="https://github.com/markjoeljimenez/draftkings-optimizer"
							target="_blank"
							rel="noopener noreferrer"
						>
							draftkings-optimizer (React)
						</a>
					</p>
				</li>
				<li>
					<p>
						<a
							href="https://github.com/markjoeljimenez/draftkings-optimizer.backend"
							target="_blank"
							rel="noopener noreferrer"
						>
							draftkings-optimizer.backend (Python)
						</a>
					</p>
				</li>
			</ul>

			<h2>About me</h2>
			<p>
				My name&apos;s Mark Jimenez and I&apos;m a front-end developer
				living in Toronto, ON developing websites with an optimized and
				accessibility driven mindset.
			</p>
			<p>
				Check out my online portfolio{' '}
				<a
					href="https://markjoeljimenez.netlify.app/"
					target="_blank"
					rel="noopener noreferrer"
				>
					here
				</a>
				.
			</p>
		</div>
	</Panel>
);

export default About;

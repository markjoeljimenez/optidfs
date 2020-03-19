import React from 'react';

interface IPanelProps {
	children: React.ReactNode;
	heading?: string;
}
const Panel = ({ children, heading }: IPanelProps) => (
	<section className="panel">
		{heading ? (
			<h1 className="panel__heading">{heading}</h1>
		) : <></>}
		{children}
	</section>
);

export default Panel;

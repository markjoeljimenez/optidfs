interface ISkipLinkProps {
	text: string;
}

const SkipLink = ({ text }: ISkipLinkProps) => (
	<a className="skip-link" href="#main">
		{text}
	</a>
);

export default SkipLink;

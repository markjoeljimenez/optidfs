interface ISkipLinkProps {
	text: string;
}

const SkipLink = ({ text }: ISkipLinkProps) => (
	<a href="#main" className="skip-link">
		{text}
	</a>
);

export default SkipLink;

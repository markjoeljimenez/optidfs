interface ISkipLinkProps {
	text: string;
}

export default ({ text }: ISkipLinkProps) => (
	<a href="#main" className="skip-link">
		{text}
	</a>
);

interface IFieldset {
	legend: string;
	className?: string;
	children: React.ReactNode;
}

const Fieldset = ({ children, className, legend }: IFieldset) => (
	<fieldset className={className}>
		<legend className="block text-sm font-medium text-gray-700">
			{legend}
		</legend>

		{children}
	</fieldset>
);

export default Fieldset;

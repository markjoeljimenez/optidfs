interface IFieldset {
	legend: string;
	className?: string;
	children: React.ReactNode;
}

const Fieldset = ({ legend, className, children }: IFieldset) => (
	<fieldset className={className}>
		<legend className="block text-sm font-medium text-gray-700">
			{legend}
		</legend>

		{children}
	</fieldset>
);

export default Fieldset;

import Image from 'next/image';

const Donate = () => (
	<form
		action="https://www.paypal.com/cgi-bin/webscr"
		method="post"
		target="_top"
	>
		<input name="cmd" type="hidden" value="_donations" />
		<input name="business" type="hidden" value="DG67QWH46T6SC" />
		<input name="item_name" type="hidden" value="Supporting the dev" />
		<input name="currency_code" type="hidden" value="CAD" />
		<input
			alt="Donate with PayPal button"
			name="submit"
			src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
			title="PayPal - The safer, easier way to pay online!"
			type="image"
		/>
		<Image
			alt="Donate"
			height={1}
			src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
			width={1}
		/>
	</form>
);

export default Donate;

const Donate = () => (
	<form
		action="https://www.paypal.com/cgi-bin/webscr"
		method="post"
		target="_top"
	>
		<input type="hidden" name="cmd" value="_donations" />
		<input type="hidden" name="business" value="DG67QWH46T6SC" />
		<input type="hidden" name="item_name" value="Supporting the dev" />
		<input type="hidden" name="currency_code" value="CAD" />
		<input
			type="image"
			src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
			name="submit"
			title="PayPal - The safer, easier way to pay online!"
			alt="Donate with PayPal button"
		/>
		<img
			alt=""
			src="https://www.paypal.com/en_CA/i/scr/pixel.gif"
			width="1"
			height="1"
		/>
	</form>
);

export default Donate;

const { colors, maxWidth, inset } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.tsx'],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	theme: {
		fontFamily: {
			display: ['Nunito', 'sans-serif'],
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			...colors,
			indigo: {
				...colors.indigo,
				1000: '#242040',
				1100: '#06050a',
			},
		},
		maxWidth: {
			...maxWidth,
			logo: '14rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		},
		inset: {
			...inset,
			'1/2': '50%',
		},
		extend: {},
	},
	variants: {},
	plugins: [],
};

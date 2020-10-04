const {
	colors,
	maxWidth,
	inset,
	maxHeight,
	flex,
	minWidth,
} = require('tailwindcss/defaultTheme');

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
			// xl: '1280px',
		},
		colors: {
			...colors,
			indigo: {
				...colors.indigo,
				1000: '#242040',
				1100: '#06050a',
			},
		},
		maxHeight: {
			...maxHeight,
			20: '20rem',
		},
		minWidth: {
			...minWidth,
			'1/2': '50%',
		},
		maxWidth: {
			...maxWidth,
			logo: '14rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		},
		// inset: {
		// 	...inset,
		// 	'1/2': '50%',
		// 	'1/1': '100%',
		// },
		flex: {
			...flex,
			2: 2,
			3: 3,
		},
		extend: {
			gridTemplateColumns: {
				'table-sm': '5rem 1fr 1fr 3rem',
				'table-md': '3rem 9rem 3fr 4fr 3fr 2fr 3fr 2fr 3rem',
			},
		},
	},
	variants: {},
	plugins: [],
};

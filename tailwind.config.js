const {
	colors,
	maxWidth,
	inset,
	maxHeight,
	flex,
	minWidth,
	height,
	minHeight,
} = require('tailwindcss/defaultTheme');

module.exports = {
	purge: {
		content: ['./src/**/*.tsx'],
		safelist: [
			'bg-green-600',
			'text-green-100',
			'bg-red-600',
			'text-red-100',
			'bg-yellow-600',
			'text-yellow-100',
		],
	},
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	theme: {
		fontFamily: {
			display: ['Inter', 'sans-serif'],
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
		},
		// colors: {
		// 	...colors,
		// 	indigo: {
		// 		...colors.indigo,
		// 		1000: '#242040',
		// 		1100: '#06050a',
		// 	},
		// },
		// height: {
		// 	...height,
		// 	'1/2': '50%',
		// },
		minHeight: {
			...minHeight,
			5: '5rem',
			7: '7rem',
		},
		maxHeight: {
			...maxHeight,
			none: 'none',
			0: '0',
			5: '5rem',
			10: '10rem',
			20: '20rem',
		},
		minWidth: {
			...minWidth,
			'1/2': '50%',
			5: '5rem',
			9: '9rem',
			10: '10rem',
			nav: '12rem',
			dropdown: '30rem',
			profilePicture: '72px',
		},
		maxWidth: {
			...maxWidth,
			'logo-sm': '8rem',
			'logo-md': '14rem',
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
				'table-md': '5rem 3fr 5fr 6.5fr 9fr 5fr 4fr 4fr 4fr 4rem',
				'custom-stacking-md': '4rem 4rem 4fr 1fr 3.25rem',
			},
			animation: {
				enter: 'enter 200ms ease-out',
				'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
				leave: 'leave 150ms ease-in forwards',
			},
			keyframes: {
				enter: {
					'0%': { transform: 'scale(0.9)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				leave: {
					'0%': { transform: 'scale(1)', opacity: 1 },
					'100%': { transform: 'scale(0.9)', opacity: 0 },
				},
				'slide-in': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
	},
	variants: {
		margin: ['responsive', 'first', 'hover', 'focus'],
		borderWidth: ['last'],
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};

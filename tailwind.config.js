module.exports = {
	purge: ['./src/**/*.tsx'],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			transparent: 'transparent',
			black: '#000',
			white: '#fff',
			grey: {
				100: '#f7fafc',
				900: '#1a202c',
			},
		},
		extend: {},
	},
	variants: {},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			green: '#38c193',
			red: '#f0613a',
			white: '#ffffff',
			black: '#000000',
			gray: '#4f5a6b',
			blue: '#385b8a',
			grayblue: '#8794a8',
			whiteblue: '#eff1f2',
			blueaccent: '#6483ad',
			bluewhite: '#cadbe3',
			yellowburn: '#e2a55e',
			grayash: '#eae2d7',
			orangeburn: '#cf7041'
		}
	},
	plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {

			// Primary color
			'primary-600': '#000733',
			'primary-500': '#1C2671',
			'primary-400': '#28359F',
			'primary-300': '#3748CD',
			'primary-200': '#606ED7',
			'primary-100': '#8E97E3',
			'primary-50': '#EBEDFF',

			// Succes color
			'success-600': '#101B09',
			'success-500': '#30521B',
			'success-400': '#50892D',
			'success-300': '#70BF3F',
			'success-200': '#99D276',
			'success-100': '#C2E4AD',
			'success-50': '#EBF6E4',

			// Warning color
			'warning-600': '#1D1808',
			'warning-500': '#564718',
			'warning-400': '#8F7728',
			'warning-300': '#CCAD47',
			'warning-200': '#D7BF70',
			'warning-100': '#E7D9A9',
			'warning-50': '#F7F2E2',

			// Danger color
			'danger-600': '#1F0B06',
			'danger-500': '#5C2011',
			'danger-400': '#99361D',
			'danger-300': '#A63A1F',
			'danger-200': '#E27E66',
			'danger-100': '#EEB2A3',
			'danger-50': '#F9E5E0 ',

			// Neutral color
			'neutral-600': '#111114',
			'neutral-500': '#32343B',
			'neutral-400': '#545662',
			'neutral-300': '#525460',
			'neutral-200': '#9D9FAB',
			'neutral-100': '#C4C5CD',
			'neutral-50': '#EBECEE',

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily: {
			spaceGrotesk: ['Space Grotesk', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: { primary: '#ffffff' },
      backgroundColor: {
        primary: '#161616',
        secondary: '#313131',
        button: '#000000',
        'button-hover': '#212121',
      },
      padding: { page: defaultTheme.spacing['8'] },
    },
  },
  plugins: [],
}
export default config

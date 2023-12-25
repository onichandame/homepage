import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
  },
  plugins: [],
}
export default config

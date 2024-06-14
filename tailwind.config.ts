import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // backgroundImage: {
      //   gradient: "url('./src/assets/images/empty_box.png')",
      // },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(-45deg)',
          },
          '50%': {
            transform: 'rotate(-360deg)',
            'border-radius': '50%',
          },
          '100%': {
            transform: 'rotate(-45deg)',
          },
        },
      },
      animation: {
        spin: 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config

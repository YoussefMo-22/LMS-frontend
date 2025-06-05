module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          100: '#e9ebf3',
          200: '#dde1ed',
          300: '#b9c2db',
          400: '#1e3a8a',
          500: '#1b347c',
          600: '#182e6e',
          700: '#172c68',
          800: '#122353',
          900: '#0d1a3e',
          950: '#0b1430',
        },
        secondary: {
          100: '#eff6ff',
          200: '#e7f2fe',
          300: '#cee3fd',
          400: '#60a5fa',
          500: '#5695e1',
          600: '#4d84c8',
          700: '#487cbc',
          800: '#3a6396',
          900: '#2b4a70',
          950: '#223a58',
        },
        dark: {
          100: '#e9eaeb',
          200: '#dddfe1',
          300: '#babdc1',
          400: '#1f2937',
          500: '#1c2532',
          600: '#19212c',
          700: '#171f29',
          800: '#131921',
          900: '#0e1219',
          950: '#0b0e13',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          body: ['Poppins', 'sans-serif'],
          heading: ['Poppins', 'sans-serif'],
        },
        fontSize: {
          h1: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px
          h2: ['2rem', { lineHeight: '1.2', fontWeight: '600' }],   // 32px
          h3: ['1.5rem', { lineHeight: '1.2', fontWeight: '400' }], // 24px
          h4: ['1.25rem', { lineHeight: '1.2', fontWeight: '400' }],// 20px
          h5: ['1rem', { lineHeight: '1.2', fontWeight: '400' }],   // 16px
          body: ['0.75rem', { lineHeight: '1.2', fontWeight: '300' }], // 12px
        },
      },
    },
  },
  plugins: [],
}

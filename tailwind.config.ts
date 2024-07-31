import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "xsm": "440px",
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        "2xl": "1536px",
      },
    },
    screens: {
      "xsm": "440px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        themecolorprimary: 'rgb(var(--theme-color1), <alpha-value>)',
        themecolorsecondary: 'rgb(var(--theme-color2), <alpha-value>)',
      },
      content: {
        'iconCoopers': 'url("/icone-coopers.png")',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        settingAsDoneHide: {
          '0%': { transform: 'scale(1)', opacity: '1'  },
          '25%': { transform: 'scale(1.1)', opacity: '1'  },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        deletingTask: {
          '0%': { transform: 'scaleY(1)' },
          '90%': { transform: 'scaleY(0.1)', opacity: '0.1'},
          '100%': { transform: 'scaleY(0)'},
        }
      },
      animation: {
        settingAsDoneHide: 'settingAsDoneHide .6s ease-in-out 1',
        settingAsDoneShow: 'settingAsDoneHide .6s ease-in-out reverse 1',
        deletingTask: 'deletingTask .6s ease 1',
      }
    },
  },
  plugins: [],
};
export default config;

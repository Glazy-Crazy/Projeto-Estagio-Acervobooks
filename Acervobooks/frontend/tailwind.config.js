/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './src/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0891b2', // ciano escuro (cyan-600)
          light: '#06b6d4',   // ciano claro (cyan-500)
          dark: '#164e63',    // ciano muito escuro (cyan-900)
        },
        // Cores semânticas para padronizar o projeto inteiro.
        // Tema: Biblioteca Digital com Controle de Empréstimos
        // Altere aqui para rebrandings/temas e toda a UI acompanhará.
        success: {
          DEFAULT: '#16a34a', // verde 600
          light: '#22c55e',   // verde 500
          dark: '#166534',    // verde 800
        },
        warning: {
          DEFAULT: '#f59e0b', // amber 500
          light: '#fbbf24',   // amber 400
          dark: '#b45309',    // amber 700
        },
        danger: {
          DEFAULT: '#dc2626', // red 600
          light: '#ef4444',   // red 500
          dark: '#991b1b',    // red 800
        },
        info: {
          DEFAULT: '#3b82f6', // blue 500
          light: '#60a5fa',   // blue 400
          dark: '#1e40af',    // blue 800
        },
        neutral: {
          light: '#f0f0f0',  // cinza bem claro
          DEFAULT: '#6b7280', // cinza médio (gray-500)
          dark: '#1f2937',   // cinza escuro (gray-800)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
      },
    },
  },

  plugins: [],
  darkMode: 'class'
};

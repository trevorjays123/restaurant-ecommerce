/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global UI Colors
        primary: {
          DEFAULT: '#E64A19',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        surface: '#FFFFFF',
        background: '#FAFAFA',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        border: '#E5E5E5',
        
        // Nigerian Cuisine Colors
        nigerian: {
          orange: '#E64A19',
          brown: '#8B4513',
          cream: '#FFF8E7',
          green: '#2E7D32',
          suya: '#C0392B',
          jollof: '#E67E22',
          gold: '#D4A574',
        },
        
        // Continental Cuisine Colors
        continental: {
          navy: '#0B1E33',
          gold: '#BF9E7B',
          burgundy: '#722F37',
          cream: '#F5F0E6',
          white: '#FFFFFF',
          charcoal: '#2C2C2C',
        },
        
        // Fast Food Colors
        fastfood: {
          red: '#D32F2F',
          yellow: '#FBC02D',
          charcoal: '#212121',
          orange: '#F57C00',
          cream: '#FFFDE7',
        },
        
        // Status Colors
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      
      fontFamily: {
        // Display fonts
        display: ['TASA Orbiter', 'Poppins', 'sans-serif'],
        african: ['TASA Orbiter', 'Poppins', 'sans-serif'],
        elegant: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        'sans-elegant': ['Montserrat', 'sans-serif'],
        fun: ['Bebas Neue', 'Montserrat Black', 'sans-serif'],
        
        // Body fonts
        sans: ['Inter', 'Open Sans', 'sans-serif'],
        body: ['Inter', 'Open Sans', 'sans-serif'],
      },
      
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.4' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      maxWidth: {
        'screen-xl': '1440px',
        'content': '1200px',
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      animation: {
        // Nigerian cuisine animations
        'steam': 'steam 4s ease-in-out infinite',
        'pepper-float': 'float 3s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        
        // Continental animations
        'shine': 'shine 2s ease-in-out infinite',
        'wine-pour': 'pour 3s ease-in-out',
        'elegant-fade': 'elegant-fade 0.8s ease-out',
        
        // Fast food animations
        'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
        'flame': 'flame 0.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        
        // UI animations
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-in',
        'scale-in': 'scale-in 0.2s ease-out',
        'ripple': 'ripple 0.6s linear',
        
        // Scroll indicator
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
      
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(5deg)' },
        },
        'pulse-warm': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '50%, 100%': { transform: 'translateX(200%)' },
        },
        pour: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        'elegant-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        flame: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)' },
          '50%': { transform: 'scale(1.1) rotate(2deg)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [],
};

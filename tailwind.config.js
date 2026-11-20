/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakhi: {
          bg: '#FFF6F5',            // canvas blush background
          card: '#FFFFFF',          // clean white card
          border: '#F6D9D4',        // soft petal border
          ring: '#FFDFD7',          // maternal halo ring
          berry: '#8C2432',         // deep berry/burgundy heading
          charcoal: '#3A282B',      // warm text primary
          muted: '#806669',         // muted text secondary
          coral: {
            DEFAULT: '#FA6A48',     // vibrant hero CTA coral from reference image
            hover: '#EE5A36',
            active: '#DC4C28',
            light: '#FFF0EC',
            border: '#FDC4B5',
          },
          petal: {
            light: '#FFD3DA',
            DEFAULT: '#FFADC0',
            dark: '#F4829F',
            shadow: 'rgba(244, 130, 159, 0.25)',
          }
        },
        artocea: {
          primary: '#3A282B',
          secondary: '#806669',
          base: '#FFF6F5',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        primary: ['"Plus Jakarta Sans"', 'Inter', 'Outfit', '"GC Gudlak"', 'Helixa', 'Manrope', '"Noto Sans Telugu"', 'sans-serif'],
        gudlak: ['"Plus Jakarta Sans"', 'Inter', 'Outfit', 'sans-serif'],
        helixa: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        times: ['"Times New Roman"', 'Georgia', 'serif'],
        serif: ['"Times New Roman"', '"Noto Serif Telugu"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Outfit', '"GC Gudlak"', 'Helixa', 'Manrope', '"Noto Sans Telugu"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'xs': ['13px', { lineHeight: '20px' }],
        'sm': ['16px', { lineHeight: '24px' }],
        'base': ['18px', { lineHeight: '26px' }],
        'lg': ['20px', { lineHeight: '28px' }],
        'xl': ['23px', { lineHeight: '32px' }],
        '2xl': ['28px', { lineHeight: '36px' }],
        '3xl': ['36px', { lineHeight: '45px' }],
        '4xl': ['40px', { lineHeight: '48px' }],
        'display': ['65px', { lineHeight: '73.1px' }],
      },
      borderRadius: {
        'sakhi': '16px',
        'sakhi-sm': '8px',
        'sakhi-lg': '24px',
        'sakhi-full': '9999px',
        artocea: '12px',
      },
      boxShadow: {
        'sakhi-card': '0 4px 24px -2px rgba(140, 36, 50, 0.05), 0 2px 8px -2px rgba(140, 36, 50, 0.03)',
        'sakhi-hover': '0 12px 32px -4px rgba(250, 106, 72, 0.20)',
        'sakhi-button': '0 4px 18px -2px rgba(250, 106, 72, 0.38)',
        'mindcloud-sm': 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 4px 12px -6px',
        'mindcloud-md': 'rgba(140, 36, 50, 0.06) 0px 1px 2px 0px, rgba(140, 36, 50, 0.1) 0px 8px 24px -4px',
        'mindcloud-lg': '0px 14px 34px -4px rgba(140, 36, 50, 0.12), 0px 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'mindcloud-dark': 'rgba(0, 0, 0, 0.35) 0px 16px 36px -4px, rgba(246, 217, 212, 0.15) 0px 0px 0px 1px',
        'mindcloud-coral': '0 8px 28px -4px rgba(250, 106, 72, 0.35)',
      },
      animation: {
        'float-slow': 'float 14s ease-in-out infinite',
        'float-medium': 'float 9s ease-in-out infinite',
        'sway': 'sway 6s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(8deg)' },
        },
        sway: {
          '0%': { transform: 'translateX(-12px) rotate(-6deg)' },
          '100%': { transform: 'translateX(12px) rotate(6deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}

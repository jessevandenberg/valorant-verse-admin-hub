import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'rgb(var(--border) / <alpha-value>)',
				input: 'rgb(var(--input) / <alpha-value>)',
				ring: 'rgb(var(--ring) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
					foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
					foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
					foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
					foreground: 'rgb(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
					foreground: 'rgb(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
					foreground: 'rgb(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'rgb(var(--card) / <alpha-value>)',
					foreground: 'rgb(var(--card-foreground) / <alpha-value>)'
				},
				sidebar: {
					DEFAULT: 'rgb(var(--sidebar-background) / <alpha-value>)',
					foreground: 'rgb(var(--sidebar-foreground) / <alpha-value>)',
					primary: 'rgb(var(--sidebar-primary) / <alpha-value>)',
					'primary-foreground': 'rgb(var(--sidebar-primary-foreground) / <alpha-value>)',
					accent: 'rgb(var(--sidebar-accent) / <alpha-value>)',
					'accent-foreground': 'rgb(var(--sidebar-accent-foreground) / <alpha-value>)',
					border: 'rgb(var(--sidebar-border) / <alpha-value>)',
					ring: 'rgb(var(--sidebar-ring) / <alpha-value>)'
				},
				// Valorant specific colors
				valorant: {
					red: '#FF4656',
					dark: '#0F1419',
					light: '#1E2328',
					accent: '#F94555',
					white: '#FFFBF5'
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px #FF4656' },
					'50%': { boxShadow: '0 0 20px #FF4656, 0 0 30px #FF4656' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'valorant-gradient': 'linear-gradient(135deg, #0F1419 0%, #1E2328 50%, #FF4656 100%)'
			}
		}
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;

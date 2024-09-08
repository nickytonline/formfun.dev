/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        "screen-minus-nav": "calc(100svh - var(--top-nav-height))",
      },
    },
  },
  plugins: [],
};

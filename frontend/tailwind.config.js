/** @type {import('tailwindcss').Config} */
export default {
  // Đảm bảo đường dẫn content này phải chính xác để Tailwind quét class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
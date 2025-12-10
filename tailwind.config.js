/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'iphone_in_hand': "url('src/assets/images/other-imgs/iphone_in_hand.png')",
        'multiple_iphone': "url('src/assets/images/other-imgs/multiple_iphone.png')",
      }
    },
  },
  plugins: [],
}
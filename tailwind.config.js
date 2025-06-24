// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.66, 0, 0, 1) infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(220, 38, 38, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)" },
        },
      },
    },
  },
  plugins: [],
};

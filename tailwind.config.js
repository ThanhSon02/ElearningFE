/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            "2md": "820px",
        },
        extend: {
            height: {
                18: "4.5rem",
            },
            boxShadow: {
                "cart-b-shad":
                    "0 -2px 4px rgba(0,0,0,.08), 0 -4px 12px rgba(0,0,0,.08)",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // shadcn/ui components
    flowbite.content(),
  ],
  safelist: [
    "bg-[#066b5e]/20",
    "hover:bg-[#066b5e]",
    "text-[#066b5e]",
    "checked:bg-[#066b5e]",
    "#066b5e",

    "bg-[#5147A3]/20",
    "hover:bg-[#5147A3]",
    "text-[#5147A3]",
    "checked:bg-[#5147A3]",
    "#5147A3",

    "bg-[#2a5fc1]/20",
    "hover:bg-[#2a5fc1]",
    "text-[#2a5fc1]",
    "checked:bg-[#2a5fc1]",
    "#2a5fc1",

    // Change here
    "bg-[#2b5591]",
    "bg-[#2b5591]/20",
    "hover:bg-[#2b5591]",
    "text-[#2b5591]",
    "checked:bg-[#2b5591]",
    "#2b5591",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-hero-pattern":
          "url('/amin-ul-miulk-law-firm/bg/home-banner-image-1.png')",
        "sidebar-snow": "url('/assets/sidebar/img-1.jpg')",
        "sidebar-office": "url('/assets/sidebar/img-2.jpg')",
        "sidebar-pattern": "url('/assets/sidebar/img-3.jpg')",
        "sidebar-bubble": "url('/assets/sidebar/img-4.jpg')",
        "home-hero-section-bg-image":
          "url('/amin-ul-miulk-law-firm/bg/hero_bg_1_1.jpg')",
        "home-services-section-bg-image":
          "url('/amin-ul-miulk-law-firm/bg/service-3-bg.png')",
        "home-prices-card-bg-image":
          "url('/amin-ul-miulk-law-firm/shapes/price-default.png')",
        "home-cta-bg-image":
          "url('/amin-ul-miulk-law-firm/cta/legal-law-justice-concept.jpg')",
        "service-blog-bg-image":
          "url('/amin-ul-miulk-law-firm/service/bg_im.png')",
        "hero-section-gradient":
          "linear-gradient(107.98deg, #000000 0.81%, rgba(0, 0, 0, 0) 72.1%)",
        "hero-section-gradient-mobile":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
        "blue-gradient": `linear-gradient(270deg, rgba(0, 88, 126, 0) 0%, rgba(0, 88, 126, 0.28) 70.5%),
           linear-gradient(152.25deg, rgba(0, 0, 0, 0.5) 17.24%, rgba(0, 0, 0, 0) 68.17%)`,
        "home-overlay-1":
          "url('/fujairah-freezone/overlay/home-overlay-1.svg')",
        "home-overlay-2":
          "url('/fujairah-freezone/overlay/home-overlay-2.svg')",
        "home-overlay-3": "url('/fujairah-freezone/overlay/overlay-3.svg')",
        "home-overlay-4": "url('/fujairah-freezone/overlay/overlay-4.svg')",
        "home-overlay-5": "url('/fujairah-freezone/overlay/overlay-5.svg')",
        "overlay-dot-shape":
          "url('/fujairah-freezone/overlay/overlay-side-half-dots-shape.svg')",
      },
      fontFamily: {
        "poppins-extra-light": ["var(--font-poppins-extra-light)"],
        "poppins-light": ["var(--font-poppins-light)"],
        "poppins-rg": ["var(--font-poppins-rg)"],
        "poppins-md": ["var(--font-poppins-md)"],
        "poppins-sb": ["var(--font-poppins-sb)"],
        "poppins-black": ["var(--font-poppins-black)"],
        "poppins-bold": ["var(--font-poppins-bold)"],
        // Law Firm (FE)
        "playfair-display": ["var(--font-playfair-display)"],
        "roboto-rg": ["var(--font-roboto-rg)"],
        "libre-baskerville": ["var(--font-libre-baskerville)"],
        "source-serif": ["var(--font-source-serif)"],
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
        right: "3px 0 5px -1px rgba(0, 0, 0, 0.1)",
        "top-only":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        header: "0px 4px 8px -1px #0D0D1205",
        // Fujairah Free Zone
        "custom-top": "0px -12px 80px 0px #00000099",
        "card-custom": "0px 12px 4px 0px #00000040",
        "card-custom-small": "0px 4px 4px 0px #00000040",
        "custom-three-sides": "9px 10px 12px 0px #00000040",
        "custom-blue": "0px 4px 4px 0px #00587E80",
      },
      colors: {
        dark: {
          "weight-100": "#f4f4f4",
          "weight-200": "#cbd1d7",
          "weight-300": "#707383",
          "weight-350": "#7f8290",
          "weight-400": "#212734",
          "weight-500": "#212529",
          "weight-550": "#495057",
          "weight-600": "#282529",
        },
        light: {
          "weight-400": "#878a99",
          "weight-450": "#9fa1ad",
          "weight-500": "#2b5591", // Change here
          "weight-550": "#ced4da",
          "weight-800": "#F4F6F8",
          "weight-850": "#ebedf3",
          "weight-900": "#FFFFFF",
        },
        accent: {
          "yankees-blue": "#2b5591", // Change here
          "indigo-blue": "#364574",
          "light-blue": "#548cf3",
          "light-blue-400": "#406AAF",
          "light-yellow": "#f7b84b",
          "light-green": "#0ab39c",
        },
        // Bin Yaber (F-E)
        orange: {
          50: "#567584",
          200: "#033147",
          400: "#B1BFC6",
          500: "#FE7437",
        },
        black: {
          100: "#DFE1E7",
          300: "#525252",
          400: "#272835",
          500: "#0D0D12",
        },
        // Dynamic Colors
        primary: "var(--primary-color)",
        "primary-hover": "var(--primary-hover-color)",
        secondary: "var(--secondary-color)",
        "dark-color": "var(--text-dark-color)",
        "light-color": "var(--text-light-color)",
      },
      backgroundColor: {
        dark: {
          "dencity-50": "#494d51",
          "dencity-100": "#31363C",
          "dencity-200": "#292E32",
          "dencity-220": "#2f343a",
          "dencity-250": "#292e33",
          "dencity-300": "#262a2f",
          "dencity-350": "#7f8290",
          "dencity-400": "#202328",
          "dencity-500": "#25282C",
          "dencity-600": "#1A1D21",
        },
        light: {
          "dencity-100": "#e1e1e3",
          "dencity-200": "#9fa1ad",
          "dencity-400": "#e6eefd",
          "dencity-700": "#eff2f7",
          "dencity-800": "#f3f3f9",
          "dencity-850": "#f9fbfc",
          "dencity-900": "#FFFFFF",
        },
        custom: {
          "blue-100": "#e1ebfd",
          "blue-200": "#dff0fa",
          "blue-300": "#5A6895",
          "blue-400": "#293e4c",
          "blue-500": "#3577F1",
          "blue-550": "#299CDB",
          "blue-600": "#3d4d82",
          "green-50": "#DAF4F0",
          "green-100": "#293E4C",
          "green-400": "#0ab39c",
          "green-450": "#1D3A3A",
          "green-500": "#099885",
          "yellow-100": "#fef4e4",
          "yellow-400": "#484236",
          "orange-50": "#567584",
          "orange-200": "#033147",
          "orange-400": "#B1BFC6",
          "orange-500": "#0D0D12",
        },
        // Bin Yaber (F-E)
        white: "#FFFFFF",
        grey: "#F6F8FA",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
      },
      gridColumn: {
        14: "14",
        15: "15",
        16: "16",
      },
      gridColumnEnd: {
        14: "14",
        15: "15",
        16: "16",
      },
      gridColumnStart: {
        14: "14",
        15: "15",
        16: "16",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      perspective: {
        1000: "1000px",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
        "y-0": "rotateY(0deg)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    flowbite.plugin(),
  ],
};

export default config;

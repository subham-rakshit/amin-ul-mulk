import localFont from "next/font/local";

export const poppinsELi = localFont({
  src: "../app/assets/fonts/poppinsELi.ttf",
  variable: "--font-poppins--extra-light",
  weight: "200",
});

export const poppinsLi = localFont({
  src: "../app/assets/fonts/poppinsLi.ttf",
  variable: "--font-poppins-light",
  weight: "300",
});

export const poppinsRg = localFont({
  src: "../app/assets/fonts/poppinsRg.ttf",
  variable: "--font-poppins-rg",
  weight: "400",
});

export const poppinsMd = localFont({
  src: "../app/assets/fonts/poppinsMd.ttf",
  variable: "--font-poppins-md",
  weight: "500",
});

export const poppinsSb = localFont({
  src: "../app/assets/fonts/poppinsSb.ttf",
  variable: "--font-poppins-sb",
  weight: "600",
});

export const poppinsBo = localFont({
  src: "../app/assets/fonts/poppinsBo.ttf",
  variable: "--font-poppins-bold",
  weight: "700",
});

export const poppinsBl = localFont({
  src: "../app/assets/fonts/poppinsBl.ttf",
  variable: "--font-poppins-black",
  weight: "900",
});

// Law Firm (FE)
export const playfairDisplay = localFont({
  src: "../app/assets/fonts/playfairDisplay.ttf",
  variable: "--font-playfair-display",
});
export const robotoRg = localFont({
  src: "../app/assets/fonts/robotoRg.ttf",
  variable: "--font-roboto-rg",
});

export const sourceSerif = localFont({
  src: "../app/assets/fonts/sourceSerif.ttf",
  variable: "--font-source-serif",
});
export const libreBaskerville = localFont({
  src: "../app/assets/fonts/libreBaskerville.ttf",
  variable: "--font-libre-baskerville",
});

export const allFonts = {
  poppinsELi,
  poppinsLi,
  poppinsRg,
  poppinsMd,
  poppinsSb,
  poppinsBo,
  poppinsBl,
  playfairDisplay,
  robotoRg,
  sourceSerif,
  libreBaskerville,
};

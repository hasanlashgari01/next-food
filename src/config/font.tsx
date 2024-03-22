import localFont from "next/font/local";

const iranYekan = localFont({
  src: [
    {
      path: "../assets/fonts/IranYekan/iranyekan-thin.woff",
      weight: "200",
      style: "Thin",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-light.woff",
      weight: "300",
      style: "Light",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-regular.woff",
      weight: "400",
      style: "Regular",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-medium.woff",
      weight: "500",
      style: "Medium",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-bold.woff",
      weight: "700",
      style: "Bold",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-extrabold.woff",
      weight: "750",
      style: "ExtraBold",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-black.woff",
      weight: "900",
      style: "Black",
    },
    {
      path: "../assets/fonts/IranYekan/iranyekan-extrablack.woff",
      weight: "950",
      style: "ExtraBlack",
    },
  ],
});

const dana = localFont({
  src: [
    {
      path: "../assets/fonts/Dana/DanaFaNum-UltraLight.woff2",
      weight: "100",
      style: "UltraLight",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Light.woff2",
      weight: "200",
      style: "Light",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Thin.woff2",
      weight: "300",
      style: "Thin",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Regular.woff2",
      weight: "400",
      style: "Regular",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Medium.woff2",
      weight: "500",
      style: "Medium",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-DemiBold.woff2",
      weight: "650",
      style: "DemiBold",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Bold.woff2",
      weight: "700",
      style: "Bold",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-ExtraBold.woff2",
      weight: "750",
      style: "ExtraBold",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Black.woff2",
      weight: "900",
      style: "Black",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Black.woff2",
      weight: "950",
      style: "ExtraBlack",
    },
  ],
});

export { dana, iranYekan };

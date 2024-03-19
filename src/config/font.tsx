import localFont from "next/font/local";

const yekanBakh = localFont({
  src: [
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-Thin.woff2",
      weight: "200",
      style: "Thin",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-Light.woff2",
      weight: "300",
      style: "Light",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-Regular.woff2",
      weight: "400",
      style: "Regular",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-SemiBold.woff2",
      weight: "600",
      style: "SemiBold",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-Bold.woff2",
      weight: "800",
      style: "Bold",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-ExtraBold.woff2",
      weight: "850",
      style: "ExtraBold",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-Black.woff2",
      weight: "900",
      style: "Black",
    },
    {
      path: "../assets/fonts/YekanBakh/YekanBakh-ExtraBlack.woff2",
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
      weight: "700",
      style: "DemiBold",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-Bold.woff2",
      weight: "800",
      style: "Bold",
    },
    {
      path: "../assets/fonts/Dana/DanaFaNum-ExtraBold.woff2",
      weight: "850",
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

export { dana, yekanBakh };

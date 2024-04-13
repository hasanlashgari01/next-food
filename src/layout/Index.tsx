"use client";

import { Providers } from "@/app/providers";
import Header from "./Header/Header";

const Index = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Providers>
        <Header />
      </Providers>
      {children}
    </>
  );
};

export default Index;

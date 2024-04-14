"use client";

import Header from "./Header/Header";

const Index = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Index;

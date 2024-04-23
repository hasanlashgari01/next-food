import Hero from "@/components/templates/Header/Hero";
import Navbar from "@/components/templates/Header/Navbar/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default function Home() {
  if (cookies().get("province")) {
    return redirect("/service");
  }

  return (
    <div>
      <header>
        <Navbar />
        <Hero />
      </header>
    </div>
  );
}

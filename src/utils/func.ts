import { usePathname } from "next/navigation";

const recursivePath = () => {
  const pathname = usePathname();

  return pathname.split("/").slice(-1).toString();
};

export { recursivePath };


"use client";

import { useRef } from "react";

interface MenuItemProps {
  id: string;
  title: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, title }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  const centerElem = () => {
    const container = document.querySelector(".hideScrollbar") as HTMLElement;
    const menu = document.getElementById("menu") as HTMLElement;
    const elem = document.getElementById(id) as HTMLElement;

    container.scrollTo({ left: elem.offsetLeft - container.offsetLeft, behavior: "smooth" });

    Array.from(menu.children).forEach(item => {
      const elem = item as HTMLElement;
      elem.id === id ? elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }) : null;
    });
  };

  return (
    <li className="cursor-pointer text-center dark:text-white" id={id} onClick={centerElem}>
      <div className="whitespace-nowrap">{title}</div>
    </li>
  );
};

export default MenuItem;

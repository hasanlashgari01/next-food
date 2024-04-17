"use client";

interface MenuItemProps {
  id: string;
  title: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, title }) => {
  const centerElem = () => {
    const container = document.querySelector(".hideScrollbar") as HTMLElement;
    const menu = document.getElementById("menu") as HTMLElement;
    const elem = document.getElementById(id) as HTMLElement;

    container.scrollTo({
      left: elem.offsetLeft - (container.offsetLeft + container.offsetWidth / 2),
      behavior: "smooth",
    });

    const laptopSize = window.innerWidth >= 1024;
    Array.from(menu.children).forEach(item => {
      const elem = item as HTMLElement;
      elem.id === id
        ? window.scrollTo({ top: laptopSize ? elem.offsetTop - 120 : elem.offsetTop - 160, behavior: "smooth" })
        : null;
    });
  };

  return (
    <li className="relative min-w-32 cursor-pointer text-center dark:text-white" id={id} onClick={centerElem}>
      <span className="whitespace-nowrap max-md:text-sm">{title}</span>
    </li>
  );
};

export default MenuItem;

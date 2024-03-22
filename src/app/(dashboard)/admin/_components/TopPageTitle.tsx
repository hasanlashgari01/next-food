import React from "react";

interface TitleProps {
  title: string;
}

const TopPageTitle: React.FC<TitleProps> = ({ title }) => {
  return (
    <h3 className="text-base font-semibold leading-loose text-primary-900 max-xs:hidden md:text-3xl lg:text-2xl dark:text-white">
      {title}
    </h3>
  );
};

export default TopPageTitle;

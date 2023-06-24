import { PropsWithChildren } from "react";

type MenuItemProps = {
  onClick: () => void;
};

export const MenuItem = ({
  onClick,
  children,
}: PropsWithChildren<MenuItemProps>) => {
  return (
    <button
      className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

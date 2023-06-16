import { MouseEvent } from "react";
import { CloseButtonProps } from "./CloseButton.types";
import close from "./close.svg";

const sizeToClassMap = {
  sm: "h-4",
  md: "h-6",
  lg: "h-8",
};

export const CloseButton = (props: CloseButtonProps) => {
  const { onClick, size = "md" } = props;

  return (
    <button
      test-id="closeButton"
      className="select-none outline-none rounded-full transition duration-150 hover:elevation-2 transform hover:scale-110"
      onClick={onClick}
    >
      <img className={`w-auto ${sizeToClassMap[size]}`} src={close} alt="" />
    </button>
  );
};

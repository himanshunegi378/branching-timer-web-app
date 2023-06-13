import { MouseEvent } from "react";
import { CloseButtonProps } from "./CloseButton.types";
import close from "./close.svg";

export const CloseButton = (props: CloseButtonProps) => {
  const { onClick } = props;
  return (
    <button
      test-id="closeButton"
      className="select-none outline-none rounded-full transition duration-150 hover:elevation-2 transform hover:scale-110"
      onClick={onClick}
    >
      <img className="h-6 w-auto" src={close} alt="" />
    </button>
  );
};

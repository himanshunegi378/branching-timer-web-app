import { MouseEvent } from "react";

export type CloseButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "md" | "lg";
};

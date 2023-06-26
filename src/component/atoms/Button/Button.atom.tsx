import { MouseEvent, PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonColor = "primary" | "secondary";
type ButtonVariant = "solid" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export const Button = ({
  children,
  className,
  onClick,
  size = "md",
  color = "primary",
  variant = "solid",
}: PropsWithChildren<ButtonProps>) => {
  const buttonClasses = clsx(
    "button",
    {
      primary: color === "primary",
      secondary: color === "secondary",
      solid: variant === "solid",
      outline: variant === "outline",
      "px-2 py-1/2": size === "sm",
      "px-3 py-1": size === "md",
      "px-4 py-2": size === "lg",
    },
    className
  );
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

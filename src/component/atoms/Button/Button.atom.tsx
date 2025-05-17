import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger';
type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  onClick,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  fullWidth = false,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const buttonClasses = clsx(
    'button',
    'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500':
        color === 'primary' && variant === 'solid',
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500':
        color === 'secondary' && variant === 'solid',
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500':
        color === 'success' && variant === 'solid',
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500':
        color === 'danger' && variant === 'solid',

      'border-2 bg-transparent': variant === 'outline',
      'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500':
        color === 'primary' && variant === 'outline',
      'border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500':
        color === 'secondary' && variant === 'outline',
      'border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500':
        color === 'success' && variant === 'outline',
      'border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500':
        color === 'danger' && variant === 'outline',

      'bg-transparent': variant === 'ghost',
      'text-blue-600 hover:bg-blue-50 focus:ring-blue-500':
        color === 'primary' && variant === 'ghost',
      'text-gray-600 hover:bg-gray-50 focus:ring-gray-500':
        color === 'secondary' && variant === 'ghost',
      'text-green-600 hover:bg-green-50 focus:ring-green-500':
        color === 'success' && variant === 'ghost',
      'text-red-600 hover:bg-red-50 focus:ring-red-500':
        color === 'danger' && variant === 'ghost',

      'px-3 py-1 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
      'w-full': fullWidth,
    },
    className
  );

  return (
    <AnimatePresence>
      {/* @ts-ignore */}
      <motion.button
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        className={buttonClasses}
        onClick={onClick}
        layout
        {...rest}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
};

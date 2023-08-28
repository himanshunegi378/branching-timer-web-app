import { PropsWithChildren } from 'react';

export const TrelloLayout = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>) => {
  return <div className={`flex gap-8 h-full ${className}`}>{children}</div>;
};

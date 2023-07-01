import { PropsWithChildren } from "react";


export const TrelloItem = ({
    children, className,
}: PropsWithChildren<{ className: string; }>) => {
    return (
        <div className={`flex flex-col overflow-visible ${className}`}>
            {children}
        </div>
    );
};

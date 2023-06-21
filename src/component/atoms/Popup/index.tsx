import { useEffect, useLayoutEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";

type PopupProps = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  onClose: () => void;
};

export const Popup = ({ isOpen, anchorEl, children, onClose }: PopupProps) => {
  const id = useRef(
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );
  const popupRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useLayoutEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onCloseRef.current();
      }
    };

    if (isOpen && anchorEl && popupRef.current) {
      const popper = createPopper(anchorEl, popupRef.current, {
        placement: "bottom-start",
        strategy: "fixed",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        popper.destroy();
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [anchorEl, isOpen]);

  const additionClassNames = isOpen ? "" : "invisible pointer-events-none";
  return (
    <div
      ref={popupRef}
      className={`fixed bg-white shadow-lg rounded-lg p-2 ${additionClassNames}`}
      id={id.current}
      role="tooltip"
      aria-hidden="true"
      tabIndex={-1}
    >
      {children}
      {/* <div id="arrow" data-popper-arrow></div> */}
    </div>
  );
};

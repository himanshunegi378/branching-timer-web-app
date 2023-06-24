export type PopupProps = {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  onClose: () => void;
};

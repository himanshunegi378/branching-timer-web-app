export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode | (() => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
}
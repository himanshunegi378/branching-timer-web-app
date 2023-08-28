import { PropsWithChildren } from 'react';
import { PopupProps } from '../../atoms/Popup/PopupProps';
import { Popup } from '../../atoms/Popup';

export const Menu = ({
  isOpen,
  anchorEl,
  children,
  onClose,
}: PropsWithChildren<PopupProps>) => {
  return (
    <Popup isOpen={isOpen} anchorEl={anchorEl} onClose={onClose}>
      <div className='bg-white shadow rounded border'>{children}</div>
    </Popup>
  );
};

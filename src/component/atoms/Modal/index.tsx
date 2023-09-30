import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ModalProps } from './ModalProps';
import { createPortal } from 'react-dom';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRootElRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    // create modal-root container outside of the root div if not exists

    const createOrGetModalRoot = () => {
      let modalRoot = document.getElementById(
        'modal-root'
      ) as HTMLDivElement | null;
      if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
      }
      return modalRoot;
    };
    modalRootElRef.current = createOrGetModalRoot();
  }, []);
  if (!isOpen || !modalRootElRef.current) return null;

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
      <div
        className='absolute w-full h-full bg-gray-900 opacity-50'
        onClick={onClose}
      ></div>
      <div className='bg-white w-1/2 p-4 rounded-lg z-50'>
        {typeof children === 'function' ? children() : children}
      </div>
    </div>,
    modalRootElRef.current
  );
};

export default Modal;

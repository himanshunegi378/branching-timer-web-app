import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ModalProps } from './ModalProps';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  style = {},
}) => {
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

  if (!modalRootElRef.current) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-0 left-0 w-full h-full max-h-full flex justify-center items-center z-50`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className={`absolute w-full h-full bg-gray-900`}
            onClick={onClose}
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className={`bg-white w-1/2 p-4 rounded-lg z-50 ${className}`}
            style={style}
          >
            {typeof children === 'function' ? children() : children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRootElRef.current
  );
};

export default Modal;

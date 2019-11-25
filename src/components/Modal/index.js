import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import { MdClose } from 'react-icons/md';

import { FullScreen } from './styles';

export default function Modal({
  open,
  title,
  icon,
  success,
  footerButtons,
  children,
  closeAction,
}) {
  const modal = useRef();

  // Handle the key press close modal on 'ESC' event.
  const handleKeyUp = useCallback(
    e => {
      const keys = {
        27: () => {
          e.preventDefault();
          closeAction();
          window.removeEventListener('keyup', handleKeyUp, false);
        },
      };

      if (keys[e.keyCode]) {
        keys[e.keyCode]();
      }
    },
    [closeAction]
  );

  // Handle the mouse click on overlay to close modal.
  const handleOutsideClick = useCallback(
    e => {
      if (modal.current && modal.current.parentNode === e.target) {
        closeAction();
        document.removeEventListener('click', handleOutsideClick, false);
      }
    },
    [closeAction]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleKeyUp, handleOutsideClick, open]);

  const modalAnimation = {
    hidden: {
      opacity: 0,
      y: -120,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const overlayAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    transition: {
      staggerChildren: 3,
    },
  };
  return (
    <AnimatePresence>
      {open && (
        <FullScreen
          success={!!success}
          open={open ? 1 : 0}
          footerButtons={!!footerButtons}
          exit="hidden"
          animate="visible"
          initial="hidden"
          variants={modalAnimation}
        >
          <motion.div
            ref={modal}
            exit="hidden"
            animate="visible"
            initial="hidden"
            variants={overlayAnimation}
          >
            <header>
              {icon && icon}
              <h3>{title}</h3>
              {children[0]}
            </header>
            {children[1]}
            <button
              className="btn__transparent"
              type="button"
              onClick={() => closeAction()}
            >
              <MdClose size={28} />
            </button>
          </motion.div>
        </FullScreen>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  success: PropTypes.bool,
  footerButtons: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  closeAction: PropTypes.func,
};

Modal.defaultProps = {
  icon: undefined,
  success: false,
  footerButtons: false,
  closeAction: null,
};

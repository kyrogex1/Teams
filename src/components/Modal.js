import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

export default function Modal({ open, children, onClose }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (open) {
      setShowContent(true);
    }
  }, [open]);

  return ReactDom.createPortal(
    <CSSTransition in={open} timeout={300} classNames="cssT-modal-overlay">
      <div
        className={`modal-overlay ${showContent ? "" : "d-none"}`}
        onClick={onClose}
      >
        <CSSTransition
          in={open}
          timeout={300}
          classNames="cssT-modal-dialog-box"
          onExited={() => setShowContent(false)}
        >
          <div
            className="modal-dialog-box overflow-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Close button on the top right */}
            <button
              className="btn position-absolute top-0 end-0 fs-4"
              onClick={onClose}
            >
              &times;
            </button>
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
}

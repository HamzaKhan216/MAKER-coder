import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Optional title for better accessibility and common use cases
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Handle closing on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the modal content for improved accessibility when it opens
      modalContentRef.current?.focus();
    } else {
      // Clean up the event listener when the modal is closed or unmounted
      document.removeEventListener('keydown', handleEscape);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]); // Dependencies ensure effect runs when isOpen or onClose changes

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  // Handle clicks on the backdrop to close the modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click originated directly on the backdrop div, not on the modal content itself
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    // Backdrop overlay: fixed, full screen, semi-transparent, centered content
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={handleBackdropClick}
      aria-modal="true" // Indicates that the element is a modal dialog
      role="dialog"   // Defines the element as a dialog
      // Conditionally set aria-labelledby if a title is provided for screen readers
      {...(title ? { 'aria-labelledby': 'modal-title' } : {})}
    >
      {/* Modal content container: relative for close button, styled for appearance */}
      <div
        ref={modalContentRef}
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-in-out"
        tabIndex={-1} // Makes the div programmatically focusable but not part of natural tab order
      >
        {/* Close button: absolute positioning within the modal content */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
          aria-label="Close modal" // Accessible label for the button
        >
          {/* SVG for a simple 'X' icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Optional title for the modal */}
        {title && (
          <h2 id="modal-title" className="mb-4 text-2xl font-semibold text-gray-900">
            {title}
          </h2>
        )}

        {/* Main content of the modal */}
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Optional title for the modal header
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Clean up on unmount
    };
  }, [isOpen]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicks inside the modal content from closing the modal
  };

  return (
    // Overlay: Handles closing the modal when clicking outside the content area
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Modal Content Container: Prevents clicks from propagating to the overlay */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto"
        onClick={handleContentClick}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          {title && <h2 id="modal-title" className="text-xl font-semibold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body: Renders the children prop */}
        <div className="p-4">
          {children}
        </div>

        {/* 
          Optional Modal Footer:
          You can uncomment and use this section for action buttons (e.g., Save, Cancel).
        */}
        {/*
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => console.log('Action performed!')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
        */}
      </div>
    </div>
  );
};

export default Modal;

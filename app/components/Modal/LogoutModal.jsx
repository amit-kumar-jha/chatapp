export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">Confirm Logout</h2>
        <p className="mb-6 text-center">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="button-secondary-modal">
            Cancel
          </button>
          <button onClick={onConfirm} className="button-primary-modal">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

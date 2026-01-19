import { useState } from "react";

export default function ConfirmationModal({ isOpen, onClose, registrationId }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-green-600">
          Registration Successful 🎉
        </h2>

        <p className="mt-3 text-center text-gray-600">
          Your registration has been completed successfully.
        </p>

        {/* Registration ID */}
        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">Your Registration ID</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            {registrationId}
          </p>

          <button
            onClick={handleCopy}
            className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {copied ? "Copied!" : "Copy ID"}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={()=>window.location.href="/allevents?id=1"}
          className="mt-6 w-full rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// AddUserModal.jsx
import {  useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import WebsiteLoader from "../Loader/WebsiteLoader";

export default function AddUserModal({ open, setOpen, onAddUser }) {
   
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (!email || !password || !event) {
      alert("All fields are required!");
      return;
    }
setLoading(true);

    onAddUser({
      email,
      password,
      role: event,
    });

    // setOpen(false);
    // setEmail("");
    // setPassword("");
    // setEvent("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={() => setOpen(false)}
    >
        {
            loading && <WebsiteLoader/>
        }
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        <div className="space-y-4">

          {/* Email Input */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border rounded-lg p-2"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg p-2 pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Event Dropdown */}
          <div>
            <label className="block font-medium mb-1">Event</label>
            <select
              className="w-full border rounded-lg p-2"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            >
              <option value="">Select event</option>
              <option value="techno">Techno</option>
              <option value="sports">Sport</option>
              <option value="cultural">Cultural</option>
              <option value="event_convener">Event Conevener</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}

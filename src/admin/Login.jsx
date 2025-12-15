import { useState } from "react";
import image1 from "../../logo.svg";
import AdminLogin from "../api-files/AdminAPIs/AdminLogin";
// import { ToastContainer, toast } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formdata={"email":email,"password":password};
    const res=await AdminLogin(formdata);
    // console.log(res);
    if(res.message==="Successfully logged in"){
      // toast.success("Login Successful");
      window.location.href="/admin_dashboard";
    }
    else{
      setError(res.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* <ToastContainer /> */}

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 mb-4">
            <img
              src={image1}
              alt="MII Foundation Logo"
              className="w-full h-full object-contain rounded-5"
            />
          </div>
          <h1 className="text-2xl font-bold text-black">MoonStone - 2026</h1>
          <p className="text-gray-600 mt-2">Admin Panel Access</p>
        </div>

        {/* Card */}
        <div className="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Sign in to Admin Panel</h2>
            <p className="text-gray-500 text-sm">
              Enter your credentials to access the MoonStone admin
              dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 p-3 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default Login;

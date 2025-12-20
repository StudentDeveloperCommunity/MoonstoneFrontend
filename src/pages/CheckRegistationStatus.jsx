import { useState } from "react";
import GetRegistrationStatus from "../api-files/RegisertAPIs/GetRegistartionStatus";
import WebsiteLoader from "../Loader/WebsiteLoader";

export default function CheckRegistationStatus({ isOpen, onClose }) {
  const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notfound, setnotfound] = useState(false);
  const [data, setData] = useState({});

  if (!isOpen) return null;

  async function findreg() {
    setLoading(true);
    const form = { id: Search };
    const res = await GetRegistrationStatus(form);
    // console.log(res)
    if (res?.success) {
      setData(res?.data?.[0]);
      setnotfound(false)
    } else {
      setData({});
      setnotfound(true)
    }
    setLoading(false);
  }

  // 🔹 Status Badge Color Logic
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "declined":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const closemodal=()=>{
    setData([])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {loading && <WebsiteLoader />}

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h1 className="text-black text-center font-bold text-xl">
          Check Registration Status
        </h1>

        {/* Search Section */}
        <section className="w-full flex justify-center px-4 mt-6">
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter Registration ID"
              className="h-[44px] w-full px-4 rounded-lg text-black outline-none border-2"
            />

            <button
              onClick={findreg}
              className="h-[44px] px-6 rounded-lg bg-slate-800 text-white hover:bg-slate-950 transition"
            >
              Search
            </button>
          </div>
        </section>

        {/* 🔹 Registration Details */}
        {Object.keys(data).length>=1 && (
          <div className="mt-6 rounded-lg border p-4 space-y-3">
            <div className="flex space-x-2 items-center">
              <span className="font-medium text-gray-600">Status</span>
              <span
                className={`px-3 py-1 text-sm capitalize font-semibold rounded-full border ${getStatusBadge(
                  data.approved
                )}`}
              >
                {data.approved}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p><span className="font-semibold">Name:</span> {data.LeadName}</p>
              <p><span className="font-semibold">Event:</span> {data.eventID?.title}</p>
              <p><span className="font-semibold">Email:</span> {data.LeadEmail}</p>
              <p><span className="font-semibold">Fee:</span> ₹{data.fee}</p>
            </div>
          </div>
        )}

        {notfound && <h1 className="text-red-500 font-bold text-xl text-center mt-3">Invalid Resistration ID!</h1>}


        {/* Close Button */}
        <button
          onClick={closemodal}
          className="mt-6 w-full rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

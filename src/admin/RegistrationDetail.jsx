import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../NwConfig";
import FetchRegisterEvent from "../api-files/RegisertAPIs/FetchRegisteredEvent";
import RegistrationUpdate from "../api-files/RegisertAPIs/RegistrationUpdate";
import { DeleteRegistration } from "../api-files/RegisertAPIs/DeleteRegistration";
import { Trash2 } from "lucide-react";

export default function RegistrationDetail({ userRole }) {
  const [registrations, setRegistrations] = useState([
  {
    _id: "1",
    LeadName: "Taha",
    LeadEnroll: "MC123",
    LeadEmail: "taha@gmail.com",
    LeadMobileNumber: "9876543210",
    event_type: "techno",
    event_title: "Hackathon 2025",
    fee: 200,
    approved: "approved",
    paymentFile: "uploads/pay1.png",
    members: [
      { name: "Aman", enroll: "EN123" },
      { name: "Riya", enroll: "EN456" },
    ],
  },
  {
    _id: "2",
    LeadName: "Rahul",
    LeadEnroll: "MC456",
    LeadEmail: "rahul@gmail.com",
    LeadMobileNumber: "9876543211",
    event_type: "sports",
    event_title: "Cricket League",
    fee: 150,
    approved: "pending",
    paymentFile: "uploads/pay2.png",
    members: [],
  },
]);


  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewImage, setPreviewImage] = useState(null);
  const [utrNumber, setutrNumber] = useState(null);

  /* ---------------- FILTERED DATA ---------------- */
  const filteredRegistrations = useMemo(() => {
  return registrations.filter((r) => {
    // For club admins, always filter by their event type
    if (["techno", "cultural", "sports"].includes(userRole)) {
      if (r?.event_type !== userRole) return false;
    } else if (userRole === 'admin' && eventFilter !== "all" && r?.event_type !== eventFilter) {
      return false;
    }

    if (statusFilter !== "all" && r?.approved !== statusFilter) return false;

    return true;
  });
}, [registrations, eventFilter, statusFilter, userRole]);


  /* ---------------- STATS ---------------- */
  const stats = useMemo(() => {
    // Filter registrations based on user role
    const relevantRegistrations = ["techno", "cultural", "sports"].includes(userRole) 
      ? registrations.filter(r => r?.event_type === userRole)
      : registrations;
    
    const approvedRegs = relevantRegistrations.filter(
      (r) => r?.approved === "approved"
    );

    return {
      totalAmount: approvedRegs.reduce((sum, r) => sum + r?.fee, 0),
      total: relevantRegistrations.length,
      approved: approvedRegs.length,
      pending: relevantRegistrations.filter((r) => r?.approved === "pending").length,
      rejected: relevantRegistrations.filter((r) => r?.approved === "rejected").length,
    };
}, [registrations, userRole]);


  /* ---------------- ACTIONS ---------------- */
  const updateStatus = async(id, status) => {
    setLoading(true);
    // console.log(id, status);
    const data={ registrationId:id, status:status }
    const res=await RegistrationUpdate(data)
    console.log(res)
    if(res?.success){
      setRegistrations((prev) =>
    prev.map((r) =>
      r?._id === id ? { ...r, approved: status } : r
    )
  );
      setLoading(false);
    }
    else{
      alert("Failed to update status");
    }
    setLoading(false);
  
};

const [loading, setLoading] = useState(false);

  const deleteRegistration = async(id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }
    
    setLoading(true);
    const data = { registrationId: id };
    const res = await DeleteRegistration(data);
    
    if (res?.success) {
      setRegistrations((prev) => prev.filter((r) => r?._id !== id));
      alert('Registration deleted successfully');
    } else {
      alert('Failed to delete registration');
    }
    setLoading(false);
  };
async function fetchRegistrations() {
  setLoading(true)
  const data={ userRole:userRole}
  const res=await FetchRegisterEvent(data)
  // console.log(res)
  if(res?.success){
    setRegistrations(res?.data)
    setLoading(false)
  }
  setLoading(false)
}

useEffect(()=>{
fetchRegistrations()
},[])
  return (
    <div className="p-6 space-y-6">

     

      {/* -------- STATS -------- */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Total Amount" value={`₹${stats.totalAmount}`} />
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Approved" value={stats.approved} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Rejected" value={stats.rejected} />
      </div>

      {/* -------- FILTERS -------- */}
      <div className="flex gap-4 bg-gray-100 p-4 rounded-lg">
        { userRole === 'admin' &&
        <select
          className="p-2 rounded"
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="techno">Techno</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
        </select>
}
        {["techno", "cultural", "sports"].includes(userRole) && (
          <div className="p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Showing: </span>
            <span className="font-medium capitalize">{userRole} Events</span>
          </div>
        )}

        <select
          className="p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* -------- TABLE -------- */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <Th>Lead</Th>
              <Th>Registration ID</Th>
              <Th>Event</Th>
              <Th>Members</Th>
              <Th>Fee</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
               <Th>Action</Th>
            </tr>
          </thead>

          <tbody>
            {filteredRegistrations?.map((r) => (
              <tr key={r?._id} className="border-t hover:bg-gray-50">
                <Td>
                  <p className="font-semibold">{r?.LeadName}</p>
                  <p className="text-sm text-gray-500">{r?.LeadEmail}</p>
                  {userRole === 'admin' && <p className="text-xs text-gray-400">{r?.LeadMobileNumber}</p>}
                </Td>

                <Td>
                  <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{r?._id}</p>
                </Td>

                <Td>
                  <p className="font-medium">{r?.eventID?.title}</p>
                  <span className="text-xs capitalize text-gray-500">
                    {r?.event_type}
                  </span>
                </Td>

                <Td>
                  {r?.members.length
                    ? r?.members.map((m, i) => (
                        <div key={i}>{m.name} ({m.enroll})</div>
                      ))
                    : "Single Person Event"}
                </Td>

                <Td>₹{r?.fee}</Td>

                <Td>
                  <StatusBadge status={r?.approved} />
                </Td>

                <Td>
                  <button
                    onClick={() => {
                      const imagePath = r?.paymentFile?.startsWith('uploads/') ? r?.paymentFile : `uploads/${r?.paymentFile}`;
                      setPreviewImage(`${API_URL}/${imagePath}`);
                      setutrNumber(r?.utrNumber);
                    }}
                    className="text-blue-600 underline"
                  >
                    View
                  </button>
                </Td>

                  <Td className="space-x-2">
{userRole === 'admin' && (
  <div className="flex gap-2">
    <select
      onChange={(e) => {
        if (e.target.value && e.target.value !== r?.approved) {
          updateStatus(r?._id, e.target.value);
          e.target.value = ''; // Reset select
        }
      }}
      className="px-2 py-1 border rounded text-sm"
      defaultValue=""
    >
      <option value="" disabled>Change Status</option>
      <option value="approved">Approve</option>
      <option value="pending">Pending</option>
      <option value="rejected">Reject</option>
    </select>
    <button
      onClick={() => deleteRegistration(r?._id)}
      className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1"
      title="Delete Registration"
    >
      <Trash2 size={14} />
      Delete
    </button>
  </div>
)}
{["techno", "cultural", "sports"].includes(userRole) && (
  <div className="flex gap-2">
    <select
      onChange={(e) => {
        if (e.target.value && e.target.value !== r?.approved) {
          updateStatus(r?._id, e.target.value);
          e.target.value = ''; // Reset select
        }
      }}
      className="px-2 py-1 border rounded text-sm"
      defaultValue=""
    >
      <option value="" disabled>Change Status</option>
      <option value="approved">Approve</option>
      <option value="pending">Pending</option>
      <option value="rejected">Reject</option>
    </select>
    <button
      onClick={() => deleteRegistration(r?._id)}
      className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1"
      title="Delete Registration"
    >
      <Trash2 size={14} />
      Delete
    </button>
    <div className="text-xs text-gray-500 italic self-center">
      Club Admin
    </div>
  </div>
)}
                  </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* -------- IMAGE MODAL -------- */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <h1 className="mb-4 font-semibold">UTR Number: {utrNumber}</h1>
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
            <img src={previewImage} alt="Payment" className="max-h-[80vh]" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};


const StatCard = ({ label, value }) => (
  <div className="bg-white shadow rounded p-4 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const Th = ({ children }) => (
  <th className="p-3 text-left">{children}</th>
);

const Td = ({ children }) => (
  <td className="p-3">{children}</td>
);

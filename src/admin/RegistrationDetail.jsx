import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../NwConfig";
import FetchRegisterEvent from "../api-files/RegisertAPIs/FetchRegisteredEvent";
import RegistrationUpdate from "../api-files/RegisertAPIs/RegistrationUpdate";
import { DeleteRegistration } from "../api-files/RegisertAPIs/DeleteRegistration";
import EventFetcher from "../api-files/EventAPIs/EventFetcher";
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

  const [clubFilter, setClubFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewImage, setPreviewImage] = useState(null);
  const [utrNumber, setutrNumber] = useState(null);
  const [events, setEvents] = useState([]);

  // Filter events based on club selection
  const filteredEvents = useMemo(() => {
    let filtered;

    if (userRole === "admin") {
      // Master admin: filter by selected club
      filtered =
        clubFilter === "all"
          ? events
          : events.filter((event) => event.eventType === clubFilter);
    } else {
      // Club admin: already filtered by backend, just use events as-is
      filtered = events;
    }

    return filtered;
  }, [events, clubFilter, userRole]);

  /* ---------------- FILTERED DATA ---------------- */
  const filteredRegistrations = useMemo(() => {
    let filtered = registrations;

    // For club admins, always filter by their event type
    if (["techno", "cultural", "sports"].includes(userRole)) {
      filtered = filtered.filter((r) => r?.event_type === userRole);

      // Apply event filter for club admins too
      if (eventFilter !== "all") {
        filtered = filtered.filter((r) => r?.eventID?._id === eventFilter);
      }
    } else if (userRole === "admin") {
      // For master admin, apply club filter first
      if (clubFilter !== "all") {
        filtered = filtered.filter((r) => r?.event_type === clubFilter);
      }

      // Then apply specific event filter
      if (eventFilter !== "all") {
        filtered = filtered.filter((r) => r?.eventID?._id === eventFilter);
      }
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r?.approved === statusFilter);
    }

    return filtered;
  }, [registrations, clubFilter, eventFilter, statusFilter, userRole]);

  /* ---------------- STATS ---------------- */
  const stats = useMemo(() => {
    // Use filtered registrations for stats
    const relevantRegistrations = filteredRegistrations;

    const approvedRegs = relevantRegistrations.filter(
      (r) => r?.approved === "approved",
    );

    return {
      totalAmount: approvedRegs.reduce((sum, r) => sum + (r?.fee || 0), 0),
      total: relevantRegistrations.length,
      approved: approvedRegs.length,
      pending: relevantRegistrations.filter((r) => r?.approved === "pending")
        .length,
      rejected: relevantRegistrations.filter((r) => r?.approved === "rejected")
        .length,
    };
  }, [filteredRegistrations]);

  /* ---------------- ACTIONS ---------------- */
  const updateStatus = async (id, status) => {
    setLoading(true);
    // console.log(id, status);
    const data = { registrationId: id, status: status };
    const res = await RegistrationUpdate(data);
    console.log(res);
    if (res?.success) {
      setRegistrations((prev) =>
        prev.map((r) => (r?._id === id ? { ...r, approved: status } : r)),
      );
      setLoading(false);
    } else {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  const deleteRegistration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    setLoading(true);
    const data = { registrationId: id };
    const res = await DeleteRegistration(data);

    if (res?.success) {
      setRegistrations((prev) => prev.filter((r) => r?._id !== id));
      alert("Registration deleted successfully");
    } else {
      alert("Failed to delete registration");
    }
    setLoading(false);
  };
  async function fetchRegistrations() {
    setLoading(true);
    try {
      const data = { userRole: userRole };
      const res = await FetchRegisterEvent(data);
      // console.log(res)
      if (res?.success) {
        setRegistrations(res?.data);
        setLoading(false);
      } else {
        console.error("Registrations API failed:", res?.message);
        setRegistrations([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
      setRegistrations([]);
      setLoading(false);
    }
  }

  async function fetchEvents() {
    try {
      // Fetch events based on user role
      const res = await EventFetcher({ role: userRole });
      if (res?.success) {
        // The response has 'events' not 'data'
        setEvents(res?.events || []);
      } else {
        console.error("Events API failed:", res?.message);
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
  }

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);

  // Reset event filter when club filter changes
  useEffect(() => {
    setEventFilter("all");
  }, [clubFilter]);
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
        {userRole === "admin" && (
          <>
            {/* Filter 1: Club Selection (Master Admin Only) */}
            <select
              className="p-2 rounded"
              value={clubFilter}
              onChange={(e) => setClubFilter(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="techno">Techno</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
            </select>
          </>
        )}

        {["techno", "cultural", "sports"].includes(userRole) && (
          /* Filter 1: Club Display (Club Admin - Read Only) */
          <div className="p-2 bg-white rounded">
            <span className="text-sm text-gray-600">Club: </span>
            <span className="font-medium capitalize">{userRole}</span>
          </div>
        )}

        {/* Filter 2: Status Selection (All Admins) */}
        <select
          className="p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Filter 3: Event/Program Selection (All Admins) */}
        <select
          className="p-2 rounded"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="all">All Programs</option>
          {filteredEvents.length > 0 && (
            <optgroup
              label={`Available ${userRole === "admin" ? (clubFilter === "all" ? "All" : clubFilter) : userRole} Programs`}
            >
              {filteredEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      {/* -------- TABLE -------- */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <Th className="text-center">Lead</Th>
              <Th className="text-center">Registration ID</Th>
              <Th className="text-center">UTR Number</Th>
              <Th className="text-center min-w-[180px]">Event</Th>
              <Th className="text-center">Members</Th>
              <Th className="text-center">Fee</Th>
              <Th className="text-center">Status</Th>
              <Th className="text-center">Payment</Th>
              <Th className="text-center">Action</Th>
            </tr>
          </thead>

          <tbody>
            {filteredRegistrations?.length > 0 ? (
              filteredRegistrations?.map((r) => (
                <tr key={r?._id} className="border-t hover:bg-gray-50">
                  <Td>
                    <p className="font-semibold">{r?.LeadName}</p>
                    <p className="text-sm text-gray-500">{r?.LeadEmail}</p>
                    {userRole === "admin" && (
                      <p className="text-xs text-gray-400">
                        {r?.LeadMobileNumber}
                      </p>
                    )}
                  </Td>

                  <Td>
                    <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                      {r?._id}
                    </p>
                  </Td>

                  <Td>
                    <p className="text-xs font-mono bg-blue-50 px-2 py-1 rounded text-blue-700 font-semibold">
                      {r?.utrNumber || "N/A"}
                    </p>
                  </Td>

                  <Td className="text-center">
                    <p className="font-medium">{r?.eventID?.title}</p>
                    <span className="text-xs capitalize text-gray-500">
                      {r?.event_type}
                    </span>
                  </Td>

                  <Td>
                    {r?.members.length
                      ? r?.members.map((m, i) => (
                          <div key={i}>
                            {m.name} ({m.enroll})
                          </div>
                        ))
                      : "Single Person Event"}
                  </Td>

                  <Td className="text-center font-medium">₹{r?.fee}</Td>

                  <Td className="text-center">
                    <StatusBadge status={r?.approved} />
                  </Td>

                  <Td className="text-center">
                    <button
                      onClick={() => {
                        const imagePath = r?.paymentFile?.startsWith("uploads/")
                          ? r?.paymentFile
                          : `uploads/${r?.paymentFile}`;
                        setPreviewImage(`${API_URL}/${imagePath}`);
                        setutrNumber(r?.utrNumber);
                      }}
                      className="text-blue-600 underline whitespace-nowrap"
                    >
                      View
                    </button>
                  </Td>

                  <Td className="text-center space-x-2">
                    {userRole === "admin" && (
                      <div className="flex gap-2 justify-center">
                        <select
                          onChange={(e) => {
                            if (
                              e.target.value &&
                              e.target.value !== r?.approved
                            ) {
                              updateStatus(r?._id, e.target.value);
                              e.target.value = ""; // Reset select
                            }
                          }}
                          className="px-2 py-1 border rounded text-sm"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Change Status
                          </option>
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
                      <div className="flex gap-2 justify-center items-center">
                        <select
                          onChange={(e) => {
                            if (
                              e.target.value &&
                              e.target.value !== r?.approved
                            ) {
                              updateStatus(r?._id, e.target.value);
                              e.target.value = ""; // Reset select
                            }
                          }}
                          className="px-2 py-1 border rounded text-sm"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Change Status
                          </option>
                          <option value="approved">Approve</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Reject</option>
                        </select>
                        <button
                          onClick={() =>
                            alert(
                              "This feature is only available for Master admin. Kinly contact him to take this action.",
                            )
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1"
                          title="Delete Registration"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                        <div className="text-xs text-gray-500 italic">
                          Club Admin
                        </div>
                      </div>
                    )}
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-medium">No entries found</p>
                    <p className="text-sm text-gray-400">
                      {eventFilter !== "all"
                        ? "No registrations found for the selected event and filters."
                        : statusFilter !== "all"
                          ? "No registrations found for the selected status."
                          : "No registrations found for the selected filters."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
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

const Th = ({ children, className = "" }) => (
  <th
    className={`p-3 font-semibold text-black whitespace-nowrap ${className}`}
  >
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td className={`p-3 align-middle ${className}`}>{children}</td>
);

import { useEffect, useState, useMemo, useCallback, memo } from "react";
// Helper to format time in 12-hour format with AM/PM
function formatTime12Hour(time24) {
  if (!time24) return "";
  const [hour, minute] = time24.split(":");
  let h = parseInt(hour, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${minute} ${ampm}`;
}
import EventAdd from "../api-files/EventAPIs/EventAdd";
import WebsiteLoader from "../Loader/WebsiteLoader";
import EventFetcher from "../api-files/EventAPIs/EventFetcher";
import { API_URL } from "../NwConfig";
import EventDelete from "../api-files/EventAPIs/EventDelete";
import defaultEventImage from "../assets/events/default-event-image.webp";
import EventForm from "./EventForm";
import Pagination from "../components/Pagination";

export default function ProgramAndEvents({ userRole }) {
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState({}); // Track edit mode for each event
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("all");

  const isAllSelected = itemsPerPage === "all";
  const currentItemsPerPage = isAllSelected
    ? events.length || 1
    : Number(itemsPerPage);
  const totalPages = Math.ceil(events.length / currentItemsPerPage) || 1;
  const startIndex = (page - 1) * currentItemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + currentItemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value);
    setPage(1);
  };

  const toggleEditMode = (index) => {
    setEditMode((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Memoized field readonly check
  const isFieldReadOnly = useCallback((index) => {
    const event = events[index];

    // Always allow editing for new events (no id)
    if (!event.id) {
      return false;
    }

    // For club admins, only allow editing events of their own type
    if (
      ["techno", "cultural", "sports"].includes(userRole) &&
      event.eventType !== userRole
    ) {
      return true;
    }

    // For existing events, only allow editing when in edit mode
    return !editMode[index];
  }, [events, userRole, editMode]);

  // Memoized event update function to prevent unnecessary re-renders
  const updateEvent = useCallback((index, field, value) => {
    setEvents((prev) => {
      const updated = [...prev];
      updated[index][field] = value;

      // ⭐ FIX: If eventCategory = "single", auto set participants = 1
      if (field === "eventCategory" && value === "single") {
        updated[index].minParticipants = 1;
        updated[index].maxParticipants = 1;
      }

      // ⭐ FIX: Ensure eventType never becomes null for non-admin users
      if (field === "eventType" && userRole !== "admin") {
        updated[index].eventType = userRole;
      }

      return updated;
    });
  }, [userRole]);

  const handleImageUpload = (index, file) => {
    if (!file) {
      return;
    }

    const maxSize = 4 * 1024 * 1024; // 4MB in bytes

    if (file.size > maxSize) {
      alert("File size must be less than 4MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const updated = [...events];
      updated[index].image = file;
      updated[index].imagePreview = reader.result;
      updated[index].imageChanged = true;
      setEvents(updated);
    };
    reader.onerror = (error) => {
      if (process.env.NODE_ENV !== "production") {
        console.error("FileReader error:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const addNewEvent = () => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents([
      {
        image: null,
        imagePreview: null,
        imageChanged: false,
        backendImagePath: "",
        title: "",
        description: "",
        eventType:
          userRole === "admin"
            ? ""
            : ["techno", "cultural", "sports"].includes(userRole)
              ? userRole
              : userRole,
        eventCategory: "single",
        minParticipants: 1, // ⭐ default for single
        maxParticipants: 1, // ⭐ default for single
        eventDate: "",
        eventTime: "",
        fee: "",
        event_at: "",
        convener: "",
        convener_number: "",
        organised_by: "",
        student_cordinator: "",
        student_number: "",
        id: null, // Ensure id field is present
        addedAt: timestamp, // ⭐ Track when event was added
      },
    ].concat(events));
  };

  const deleteEvent = async (index, event) => {
    // Check if it's an empty/new event (no valid ID)
    const hasValidId =
      (event.id && event.id !== null && event.id !== undefined) ||
      (event._id && event._id !== null && event._id !== undefined);

    if (!hasValidId) {
      if (window.confirm("Are You Sure You Want To Delete This New Event?")) {
        // Remove from local state only (client-side delete)
        setEvents(events.filter((_, i) => i !== index));
        alert("New event deleted successfully!");
      }
      return;
    }

    if (window.confirm("Are You Sure You Want To Delete This Event?")) {
      setLoading(true);

      const eventId = event.id || event._id;
      const newevent = {
        id: eventId,
        image: typeof event.image === "object"
          ? event.image.name
          : event.image,
      };

      try {
        const res = await EventDelete(newevent);

        // Check if it's an axios error (has response property)
        if (res && res.response) {
          alert(
            `Error deleting event: ${res.response.data?.message || "Please try again."}`,
          );
          setLoading(false);
          return;
        }

        if (res?.success) {
          setEvents(events.filter((_, i) => i !== index));
          setLoading(false);
          alert("Event deleted successfully!");
        } else {
          alert(res?.message || "Error Deleting Event!!");
          setLoading(false);
        }
      } catch (error) {
        alert("Error deleting event. Please try again.");
        setLoading(false);
      }
    }
  };
  const [loading, setLoading] = useState(false);
  // Memoized formatDate function
  const formatDate = useMemo(() => (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  }, []);

  // Memoized event mapping function
  const mapEvent = useCallback((event) => {
    const backendImagePath = event.image || "";
    const imagePreview = backendImagePath ? `${API_URL}/${backendImagePath}` : null;

    return {
      ...event,
      backendImagePath,
      image: null,
      imagePreview,
      imageChanged: false,
      eventDate: formatDate(event.eventDate),
      event_at: event.event_at || "",
      convener: event.convener || "",
      convener_number: event.convener_number || "",
      organised_by: event.organised_by || "",
      student_cordinator: event.student_cordinator || "",
      student_number: event.student_number || "",
      eventCategory: event.eventCategory || "single",
      minParticipants: event.minParticipants || 1,
      maxParticipants: event.maxParticipants || 1,
      fee: event.fee || "",
      eventTime: event.eventTime || "",
      lastRegistrationDate: event.lastRegistrationDate ? new Date(event.lastRegistrationDate).toISOString().split("T")[0] : "",
      description: event.description || "",
      title: event.title || "",
      eventType: event.event_type || event.eventType || "",
      id: event._id || event.id,
    };
  }, [formatDate]);

  const urlToFile = async (url, filename) => {
    try {
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        console.error(
          `Failed to fetch image: ${response.status} ${response.statusText}`,
        );
        return null;
      }

      const blob = await response.blob();
      return new File([blob], filename, {
        type: blob.type,
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const geteventsinfo = async () => {
    setLoading(true);

    // Revoke any stale object URLs to avoid broken previews
    events.forEach((event) => {
      if (event.imagePreview && event.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(event.imagePreview);
      }
    });

    // Clear corrupted state first
    setEvents([]);

    const data = { role: userRole };
    const res = await EventFetcher(data);
    if (res?.success && res?.events?.length > 0) {
      // Use simple map instead of Promise.all for better performance
      const mappedEvents = res.events.map(mapEvent);
      setEvents(mappedEvents);
    } else {
      // Don't show dummy events - keep empty state
      setEvents([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    geteventsinfo();
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleSubmit = async () => {
    setLoading(true);

    // Validation first - only validate events that have been modified or are new
    for (let i = 0; i < events.length; i++) {
      const e = events[i];

      // Skip validation for events that are completely empty (except for new events being submitted)
      if (!e.title && !e.description && !e.image && !e.eventDate) {
        continue;
      }

      // Basic validation with reasonable requirements
      // Image rules:
      // - New events (no id) must have an uploaded image
      // - Existing events do NOT require re-uploading image unless user changed it
      const isNewEvent = !e.id;
      const hasAnyImage = !!e.image || !!e.imagePreview || !!e.backendImagePath;
      if (isNewEvent && !hasAnyImage) {
        alert(`Event #${i + 1}: Image is required`);
        setLoading(false);
        return;
      }
      if (!isNewEvent && e.imageChanged && !e.image) {
        alert(`Event #${i + 1}: Please select an image file`);
        setLoading(false);
        return;
      }

      if (!e.title || e.title.trim().length < 5) {
        alert(`Event #${i + 1}: Title must be at least 5 characters`);
        setLoading(false);
        return;
      }
      if (!e.description || e.description.trim().length < 10) {
        alert(`Event #${i + 1}: Description must be at least 10 characters`);
        setLoading(false);
        return;
      }
      if (!e.eventDate) {
        alert(`Event #${i + 1}: Event date is required`);
        setLoading(false);
        return;
      }
      if (!e.eventTime) {
        alert(`Event #${i + 1}: Event time is required`);
        setLoading(false);
        return;
      }
      if (
        (userRole === "admin" ||
          ["techno", "cultural", "sports"].includes(userRole)) &&
        !e.eventType
      ) {
        alert(`Event #${i + 1}: Event type must be selected`);
        setLoading(false);
        return;
      }
      if (!e.eventCategory) {
        alert(`Event #${i + 1}: Event category must be selected`);
        setLoading(false);
        return;
      }
      if (!e.fee || e.fee < 0) {
        alert(`Event #${i + 1}: Fee must be 0 or greater`);
        setLoading(false);
        return;
      }
      if (!e.event_at || e.event_at.trim().length < 2) {
        alert(`Event #${i + 1}: Event location is required (min 2 characters)`);
        setLoading(false);
        return;
      }
      if (!e.convener || e.convener.trim().length < 2) {
        alert(`Event #${i + 1}: Convener name is required (min 2 characters)`);
        setLoading(false);
        return;
      }
      if (!e.convener_number || !/^[0-9]{10}$/.test(e.convener_number)) {
        alert(
          `Event #${i + 1}: Convener number must be a valid 10-digit number`,
        );
        setLoading(false);
        return;
      }
      if (!e.organised_by || e.organised_by.trim().length < 2) {
        alert(
          `Event #${i + 1}: Organized by field is required (min 2 characters)`,
        );
        setLoading(false);
        return;
      }
      if (!e.student_cordinator || e.student_cordinator.trim().length < 2) {
        alert(
          `Event #${i + 1}: Student coordinator name is required (min 2 characters)`,
        );
        setLoading(false);
        return;
      }
      if (!e.student_number || !/^[0-9]{10}$/.test(e.student_number)) {
        alert(
          `Event #${i + 1}: Student number must be a valid 10-digit number`,
        );
        setLoading(false);
        return;
      }
    }

    // If all good → submit final data
    const finalEvents = events.map((event) => ({
      ...event,
      eventType: event.eventType || userRole,
    }));

    // Only send events that have actual data (not completely empty)
    const eventsToSubmit = finalEvents.filter(
      (event) =>
        event.title || event.description || event.image || event.eventDate,
    );

    if (eventsToSubmit.length === 0) {
      alert("No events to submit. Please add at least one event with data.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("user", userRole);

    // Append all event data and images
    eventsToSubmit.forEach((event, index) => {
      if (event.id) {
        formData.append(`events[${index}][_id]`, event.id);
      }
      formData.append(`events[${index}][title]`, event.title || "");
      formData.append(`events[${index}][description]`, event.description || "");
      formData.append(`events[${index}][eventDate]`, event.eventDate || "");
      formData.append(`events[${index}][eventTime]`, event.eventTime || "");
      formData.append(`events[${index}][lastRegistrationDate]`, event.lastRegistrationDate || "");
      formData.append(
        `events[${index}][eventCategory]`,
        event.eventCategory || "",
      );
      formData.append(`events[${index}][fee]`, event.fee || "");
      formData.append(`events[${index}][eventType]`, event.eventType || "");
      formData.append(
        `events[${index}][minParticipants]`,
        event.minParticipants || 1,
      );
      formData.append(
        `events[${index}][maxParticipants]`,
        event.maxParticipants || 1,
      );
      formData.append(`events[${index}][event_at]`, event.event_at || "");
      formData.append(`events[${index}][convener]`, event.convener || "");
      formData.append(
        `events[${index}][convener_number]`,
        event.convener_number || "",
      );
      formData.append(
        `events[${index}][organised_by]`,
        event.organised_by || "",
      );
      formData.append(
        `events[${index}][student_cordinator]`,
        event.student_cordinator || "",
      );
      formData.append(
        `events[${index}][student_number]`,
        event.student_number || "",
      );

      // Append images with proper field name format
      // Only upload when user actually selected a new image
      if (event.imageChanged && event.image && typeof event.image !== "string") {
        const eventType = event.eventType || userRole;
        formData.append(`eventimages[${index}][${eventType}]`, event.image);
      }
    });

    const res = await EventAdd(formData);

    // Check if it's an axios error (has response property)
    if (res && res.response) {
      alert(
        `Error adding events: ${res.response.data?.message || "Please try again."}`,
      );
      setLoading(false);
      return;
    }

    // Check for successful response
    if (res && res.success === true) {
      alert("Events added successfully!");
      setLoading(false);
      // Refresh events from backend to get the latest data
      await geteventsinfo();
    } else {
      alert(`Error adding events: ${res?.message || "Please try again."}`);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Program and Events Management
      </h1>
      <p className="mb-6 capitalize">User Role: {userRole}</p>

      {/* Add New Event Button */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={addNewEvent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
        >
          + Add New Event
        </button>
        {(userRole === "admin" ||
          ["techno", "cultural", "sports"].includes(userRole)) && (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Changes
          </button>
        )}
      </div>

      {/* Display All Events */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-500">
            <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
            <p className="mb-4">There are no events to display. Click "Add New Event" to create your first event.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="text-sm text-gray-600">
              Showing {events.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + paginatedEvents.length, events.length)} of {events.length} events
            </p>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 font-medium" htmlFor="events-per-page">
                Per page
              </label>
              <select
                id="events-per-page"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          {paginatedEvents.map((event, pageIndex) => {
            const index = startIndex + pageIndex;

            return (
          <div
            key={event.id || `new-event-${index}`}
            className={`border p-6 mb-6 bg-white rounded-lg shadow-md ${editMode[index] ? "border-blue-500 border-2" : ""}`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Event #{index + 1}
                  {event.id && (
                    <span className="ml-2 text-sm text-gray-500">
                      (ID: {event.id})
                    </span>
                  )}
                  {!event.id && (
                    <span className="ml-2 text-sm text-orange-600">
                      New Event
                    </span>
                  )}
                  {event.addedAt && (
                    <span className="ml-2 text-xs text-blue-500">
                      Added: {event.addedAt}
                    </span>
                  )}
                </h2>
                {event.id && !editMode[index] && (
                  <span className="text-sm text-orange-600 font-medium">
                    Click Edit to modify
                  </span>
                )}
                {!event.id && !editMode[index] && (
                  <span className="text-sm text-blue-600 font-medium">
                    Ready to edit
                  </span>
                )}
                {editMode[index] && (
                  <span className="text-sm text-blue-600 font-medium">
                    Editing Mode
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {event.id &&
                  (userRole === "admin" ||
                    (["techno", "cultural", "sports"].includes(userRole) &&
                      event.eventType === userRole)) && (
                    <>
                      {!editMode[index] ? (
                        <button
                          onClick={() => toggleEditMode(index)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleEditMode(index)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              await handleSubmit();
                              // Exit edit mode after successful save
                              setEditMode((prev) => ({
                                ...prev,
                                [index]: false,
                              }));
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                          >
                            Save
                          </button>
                        </>
                      )}
                    </>
                  )}

                {(userRole === "admin" ||
                  (["techno", "cultural", "sports"].includes(userRole) &&
                    event.eventType === userRole)) && (
                  <button
                    onClick={() => deleteEvent(index, event)}
                    className={`px-3 py-1 text-white rounded text-sm ${
                      !event.id
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    title={
                      !event.id
                        ? "Delete new event (local only)"
                        : "Delete saved event"
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <EventForm
              event={event}
              index={index}
              isFieldReadOnly={isFieldReadOnly}
              updateEvent={updateEvent}
              handleImageUpload={handleImageUpload}
              formatTime12Hour={formatTime12Hour}
            />
          </div>
            );
          })}

          {!isAllSelected && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
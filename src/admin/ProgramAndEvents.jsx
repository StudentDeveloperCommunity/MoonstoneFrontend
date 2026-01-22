import { useEffect, useState } from "react";
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
import defaultEventImage from "../assets/events/Gemini_Generated_Image_yfmm0ryfmm0ryfmm (1).webp";

export default function ProgramAndEvents({ userRole }) {
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState({}); // Track edit mode for each event

  const toggleEditMode = (index) => {
    setEditMode((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isFieldReadOnly = (index) => {
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
  };

  const updateEvent = (index, field, value) => {
    const updated = [...events];

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

    setEvents(updated);
  };

  const handleImageUpload = (index, file) => {
    console.log("Image upload called:", index, file);
    if (!file) {
      console.log("No file selected");
      return;
    }

    const maxSize = 4 * 1024 * 1024; // 4MB in bytes

    if (file.size > maxSize) {
      alert("File size must be less than 4MB!");
      return;
    }

    console.log("Processing file:", file.name, "Size:", file.size);
    const reader = new FileReader();
    reader.onload = () => {
      console.log("FileReader loaded, updating events");
      const updated = [...events];
      updated[index].image = file;
      updated[index].imagePreview = reader.result;
      updated[index].imageChanged = true;
      setEvents(updated);
      console.log("Image uploaded successfully");
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
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
    console.log("=== DELETE FUNCTION STARTED ===");
    console.log("Delete function called with:", { index, event });
    console.log("Event ID:", event.id);
    console.log("Event _id:", event._id);
    console.log("Full event object:", JSON.stringify(event, null, 2));

    // Check if it's an empty/new event (no valid ID)
    const hasValidId =
      (event.id && event.id !== null && event.id !== undefined) ||
      (event._id && event._id !== null && event._id !== undefined);

    if (!hasValidId) {
      console.log(
        "Detected new event (no valid ID) - using client-side delete",
      );
      if (window.confirm("Are You Sure You Want To Delete This New Event?")) {
        // Remove from local state only (client-side delete)
        setEvents(events.filter((_, i) => i !== index));
        alert("New event deleted successfully!");
      }
      return;
    }

    console.log("Detected saved event (has ID) - using backend delete");
    if (window.confirm("Are You Sure You Want To Delete This Event?")) {
      setLoading(true);

      const eventId = event.id || event._id;
      const newevent = {
        id: eventId,
        eventType: event.eventType,
        image:
          event.image && typeof event.image === "object"
            ? event.image.name
            : event.image,
      };
      console.log(
        "Final event data being sent:",
        JSON.stringify(newevent, null, 2),
      );
      console.log("Event ID being sent:", eventId);

      try {
        const res = await EventDelete(newevent);
        console.log("Delete response received:", res);

        // Check if it's an axios error (has response property)
        if (res && res.response) {
          console.error(
            "Delete API Error:",
            res.response.status,
            res.response.data,
          );
          alert(
            `Error deleting event: ${res.response.data?.message || "Please try again."}`,
          );
          setLoading(false);
          return;
        }

        if (res?.success) {
          console.log("Delete successful, removing event from list");
          setEvents(events.filter((_, i) => i !== index));
          setLoading(false);
          alert("Event deleted successfully!");
        } else {
          console.error("Delete failed - no success flag:", res);
          alert(res?.message || "Error Deleting Event!!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Delete function error:", error);
        alert("Error deleting event. Please try again.");
        setLoading(false);
      }
    }
  };
  const [loading, setLoading] = useState(false);
  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  }

  const urlToFile = async (url, filename) => {
    try {
      console.log("Fetching image from:", url);
      const response = await fetch(url);

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
      const mappedEvents = await Promise.all(
        res.events.map(async (event) => {
          // IMPORTANT:
          // Do NOT fetch existing images as blobs here.
          // In production, /uploads may not send CORS headers, so fetch() will fail.
          // For preview, a direct <img src="..."> works fine without CORS.
          const backendImagePath = event.image || "";
          const imagePreview = backendImagePath ? `${API_URL}/${backendImagePath}` : null;

          return {
            ...event,
            backendImagePath,
            // Only set a File when user uploads a new one
            image: null,
            imagePreview,
            imageChanged: false,
            eventDate: formatDate(event.eventDate),
            // Ensure all required fields are present with fallbacks
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
            // Preserve the original event type
            eventType: event.event_type || event.eventType || "",
            // Preserve the ID
            id: event._id || event.id,
          };
        }),
      );

      // Show ALL events (don't filter incomplete ones)
      console.log("Final mapped events:", mappedEvents);
      setEvents(mappedEvents);
    } else {
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
          minParticipants: 1,
          maxParticipants: 1,
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
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    geteventsinfo();
  }, []);
  const handleSubmit = async () => {
    console.log("handleSubmit function called");
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

    console.log("FINAL EVENTS BEFORE SUBMISSION:", finalEvents);

    // Only send events that have actual data (not completely empty)
    const eventsToSubmit = finalEvents.filter(
      (event) =>
        event.title || event.description || event.image || event.eventDate,
    );

    console.log(
      "Submitting events:",
      eventsToSubmit.length,
      "out of",
      finalEvents.length,
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
    console.log("EventAdd response:", res);

    // Check if it's an axios error (has response property)
    if (res && res.response) {
      console.error("API Error:", res.response.status, res.response.data);
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
      console.error("Unexpected response:", res);
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
            onClick={() => {
              console.log("Submit button clicked");
              handleSubmit();
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Changes
          </button>
        )}
      </div>

      {/* Display All Events */}
      {events.map((event, index) => (
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
                    📝 New Event
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
                  🔒 Click Edit to modify
                </span>
              )}
              {!event.id && !editMode[index] && (
                <span className="text-sm text-blue-600 font-medium">
                  ✏️ Ready to edit
                </span>
              )}
              {editMode[index] && (
                <span className="text-sm text-blue-600 font-medium">
                  ✏️ Editing Mode
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
                            console.log(
                              "Save button clicked for event:",
                              event,
                            );
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
                  onClick={() => {
                    console.log("Delete button clicked for event:", event);
                    deleteEvent(index, event);
                  }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: IMAGE */}
            <div>
              <div>
                <label className="block font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  required={!event.id}
                  disabled={isFieldReadOnly(index)}
                  onChange={(e) => {
                    if (!isFieldReadOnly(index)) {
                      handleImageUpload(index, e.target.files[0]);
                    }
                  }}
                  className="mb-4"
                />
              </div>

              {(event.imagePreview || (!event.imagePreview && !event.image)) && (
                <img
                  src={event.imagePreview || defaultEventImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = defaultEventImage;
                  }}
                />
              )}
            </div>

            {/* RIGHT SECTION */}
            <div className="max-h-[360px] overflow-y-auto pr-2">
              {/* TITLE */}
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                readOnly={isFieldReadOnly(index)}
                minLength={10}
                maxLength={100}
                value={event.title}
                onChange={(e) => updateEvent(index, "title", e.target.value)}
              />

              {/* DESCRIPTION */}
              <label className="block font-medium mb-2">Description</label>
              <textarea
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                rows={3}
                required
                readOnly={isFieldReadOnly(index)}
                minLength={30}
                maxLength={500}
                value={event.description}
                onChange={(e) =>
                  updateEvent(index, "description", e.target.value)
                }
              />

              <label className="block font-medium mb-2">
                Registration Fees
              </label>
              <input
                type="number"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                min={50}
                readOnly={isFieldReadOnly(index)}
                max={50000}
                value={event.fee}
                onChange={(e) => updateEvent(index, "fee", e.target.value)}
              />

              <label className="block font-medium mb-2">
                Event Conducted At
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                minLength={5}
                readOnly={isFieldReadOnly(index)}
                maxLength={50}
                value={event.event_at || ""}
                onChange={(e) => updateEvent(index, "event_at", e.target.value)}
                placeholder="Enter event location (e.g., Main Auditorium)"
              />

              <label className="block font-medium mb-2">Event Convener</label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                readOnly={isFieldReadOnly(index)}
                minLength={5}
                maxLength={50}
                value={event.convener || ""}
                onChange={(e) => updateEvent(index, "convener", e.target.value)}
              />

              <label className="block font-medium mb-2">
                Event Convener Mobile Number
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                minLength={10}
                readOnly={isFieldReadOnly(index)}
                maxLength={10}
                value={event.convener_number || ""}
                onChange={(e) =>
                  updateEvent(index, "convener_number", e.target.value)
                }
              />

              <label className="block font-medium mb-2">
                Event Organised By
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                minLength={5}
                readOnly={isFieldReadOnly(index)}
                maxLength={50}
                value={event.organised_by || ""}
                onChange={(e) =>
                  updateEvent(index, "organised_by", e.target.value)
                }
              />

              <label className="block font-medium mb-2">
                Event Student Cordinator
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                minLength={4}
                readOnly={isFieldReadOnly(index)}
                maxLength={50}
                value={event.student_cordinator || ""}
                onChange={(e) =>
                  updateEvent(index, "student_cordinator", e.target.value)
                }
              />

              <label className="block font-medium mb-2">
                Event Student Cordinator Number
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                required
                minLength={10}
                readOnly={isFieldReadOnly(index)}
                maxLength={10}
                value={event.student_number || ""}
                onChange={(e) =>
                  updateEvent(index, "student_number", e.target.value)
                }
              />

              {/* EVENT DATE */}
              <label className="block font-medium mb-2">Event Date</label>
              <input
                type="date"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                value={event.eventDate || ""}
                readOnly={isFieldReadOnly(index)}
                required
                onChange={(e) =>
                  updateEvent(index, "eventDate", e.target.value)
                }
              />


              {/* EVENT TIME */}
              <label className="block font-medium mb-2">Event Time</label>
              <input
                type="time"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                value={event.eventTime || ""}
                readOnly={isFieldReadOnly(index)}
                required
                onChange={(e) =>
                  updateEvent(index, "eventTime", e.target.value)
                }
              />
              {/* Display formatted time */}
              {event.eventTime && (
                <div className="text-xs text-gray-600 mb-4">
                  <b>12-hour format:</b> {formatTime12Hour(event.eventTime)}
                </div>
              )}

              {/* LAST REGISTRATION DATE */}
              <label className="block font-medium mb-2">Last Registration Date</label>
              <input
                type="date"
                className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                value={event.lastRegistrationDate || ""}
                readOnly={isFieldReadOnly(index)}
                onChange={(e) => updateEvent(index, "lastRegistrationDate", e.target.value)}
              />

              {/* EVENT TYPE — ADMIN AND CLUB ADMINS */}
              {(userRole === "admin" ||
                ["techno", "cultural", "sports"].includes(userRole)) && (
                <div className="mb-4">
                  <label className="block font-medium mb-2">
                    Select Event Type
                  </label>
                  <div className="space-y-2">
                    {["techno", "cultural", "sports"].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`eventType_${index}`}
                          value={type}
                          checked={event.eventType === type}
                          disabled={
                            isFieldReadOnly(index) ||
                            (["techno", "cultural", "sports"].includes(
                              userRole,
                            ) &&
                              type !== userRole)
                          }
                          onChange={() =>
                            !isFieldReadOnly(index) &&
                            !(
                              ["techno", "cultural", "sports"].includes(
                                userRole,
                              ) && type !== userRole
                            ) &&
                            updateEvent(index, "eventType", type)
                          }
                        />
                        <span
                          className={`capitalize ${["techno", "cultural", "sports"].includes(userRole) && type !== userRole ? "text-gray-400" : ""}`}
                        >
                          {type}
                          {["techno", "cultural", "sports"].includes(
                            userRole,
                          ) &&
                            type === userRole &&
                            " (Your Club)"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-admin and non-club admin auto event type */}
              {!(
                userRole === "admin" ||
                ["techno", "cultural", "sports"].includes(userRole)
              ) && (
                <div className="p-2 bg-gray-100 capitalize rounded text-sm text-gray-700">
                  Event Type: <b>{userRole}</b>
                </div>
              )}

              {/* ⭐ NEW SECTION: EVENT CATEGORY (Single / Team) */}
              <div className="mt-4">
                <label className="block font-medium mb-2">Event Category</label>

                <div className="space-y-2">
                  {["single", "team"].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`eventCategory_${index}`}
                        required
                        disabled={isFieldReadOnly(index)}
                        value={cat}
                        checked={event.eventCategory === cat}
                        onChange={() =>
                          !isFieldReadOnly(index) &&
                          updateEvent(index, "eventCategory", cat)
                        }
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ⭐ SHOW PARTICIPANTS INPUTS BASED ON CATEGORY */}
              {event.eventCategory === "team" ? (
                <div className="mt-4">
                  <label className="block font-medium">
                    Team Size (Min-Max Participants)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="2"
                      max="10"
                      required
                      readOnly={isFieldReadOnly(index)}
                      className={`w-1/2 p-2 border rounded ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                      placeholder="Min"
                      value={event.minParticipants}
                      onChange={(e) =>
                        updateEvent(index, "minParticipants", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min={event.minParticipants || 2}
                      max="20"
                      required
                      readOnly={isFieldReadOnly(index)}
                      className={`w-1/2 p-2 border rounded ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
                      placeholder="Max"
                      value={event.maxParticipants}
                      onChange={(e) =>
                        updateEvent(index, "maxParticipants", e.target.value)
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <label className="block font-medium">Participants</label>
                  <input
                    type="text"
                    value="Single Participant"
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
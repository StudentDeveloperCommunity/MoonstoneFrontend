import { memo, useCallback } from "react";
import defaultEventImage from "../assets/events/default-event-image.webp";

const EventForm = memo(({ 
  event, 
  index, 
  isFieldReadOnly, 
  updateEvent, 
  handleImageUpload,
  formatTime12Hour 
}) => {
  const handleInputChange = useCallback((field, value) => {
    if (!isFieldReadOnly(index)) {
      updateEvent(index, field, value);
    }
  }, [isFieldReadOnly, updateEvent]);

  return (
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
          onChange={(e) => handleInputChange("title", e.target.value)}
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
          onChange={(e) => handleInputChange("description", e.target.value)}
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
          onChange={(e) => handleInputChange("fee", e.target.value)}
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
          onChange={(e) => handleInputChange("event_at", e.target.value)}
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
          onChange={(e) => handleInputChange("convener", e.target.value)}
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
          onChange={(e) => handleInputChange("convener_number", e.target.value)}
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
          onChange={(e) => handleInputChange("organised_by", e.target.value)}
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
          onChange={(e) => handleInputChange("student_cordinator", e.target.value)}
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
          onChange={(e) => handleInputChange("student_number", e.target.value)}
        />

        {/* EVENT DATE */}
        <label className="block font-medium mb-2">Event Date</label>
        <input
          type="date"
          className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
          value={event.eventDate || ""}
          readOnly={isFieldReadOnly(index)}
          required
          onChange={(e) => handleInputChange("eventDate", e.target.value)}
        />

        {/* EVENT TIME */}
        <label className="block font-medium mb-2">Event Time</label>
        <input
          type="time"
          className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
          value={event.eventTime || ""}
          readOnly={isFieldReadOnly(index)}
          required
          onChange={(e) => handleInputChange("eventTime", e.target.value)}
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
          onChange={(e) => handleInputChange("lastRegistrationDate", e.target.value)}
        />

        {/* EVENT TYPE */}
        <label className="block font-medium mb-2">Event Type</label>
        <select
          className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
          value={event.eventType || ""}
          disabled={isFieldReadOnly(index)}
          onChange={(e) => handleInputChange("eventType", e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="techno">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
        </select>

        {/* EVENT CATEGORY */}
        <label className="block font-medium mb-2">Event Category</label>
        <select
          className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
          value={event.eventCategory || "single"}
          disabled={isFieldReadOnly(index)}
          onChange={(e) => handleInputChange("eventCategory", e.target.value)}
        >
          <option value="single">Single Participant</option>
          <option value="team">Team Event</option>
        </select>

        {/* PARTICIPANTS - Show only for team events */}
        {event.eventCategory === "team" && (
          <>
            <label className="block font-medium mb-2">Min Participants</label>
            <input
              type="number"
              className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
              min={1}
              max={50}
              value={event.minParticipants || 1}
              readOnly={isFieldReadOnly(index)}
              onChange={(e) => handleInputChange("minParticipants", parseInt(e.target.value))}
            />

            <label className="block font-medium mb-2">Max Participants</label>
            <input
              type="number"
              className={`w-full p-2 border rounded mb-4 ${isFieldReadOnly(index) ? "bg-gray-100" : ""}`}
              min={1}
              max={50}
              value={event.maxParticipants || 1}
              readOnly={isFieldReadOnly(index)}
              onChange={(e) => handleInputChange("maxParticipants", parseInt(e.target.value))}
            />
          </>
        )}

        {/* PARTICIPANTS - Show for single events (fixed at 1) */}
        {event.eventCategory === "single" && (
          <>
            <label className="block font-medium mb-2">Participants</label>
            <input
              type="text"
              value="Single Participant"
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </>
        )}
      </div>
    </div>
  );
});

EventForm.displayName = 'EventForm';

export default EventForm;

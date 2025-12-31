import { useEffect, useState } from "react";
import EventAdd from "../api-files/EventAPIs/EventAdd";
import WebsiteLoader from "../Loader/WebsiteLoader";
import EventFetcher from "../api-files/EventAPIs/EventFetcher";
import { API_URL } from "../NwConfig";
import { form } from "framer-motion/client";
import EventDelete from "../api-files/EventAPIs/EventDelete";

export default function ProgramAndEvents({ userRole }) {
  const [events, setEvents] = useState([]);

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
  if (!file) return;

  const maxSize = 4 * 1024 * 1024; // 2MB in bytes

  if (file.size > maxSize) {
    alert("File size must be less than 4MB!");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const updated = [...events];
    updated[index].image = file;
    updated[index].imagePreview = reader.result;
    setEvents(updated);
  };
  reader.readAsDataURL(file);
};


  const addNewEvent = () => {
  setEvents([
    ...events,
    {
      image: null,
      imagePreview: null,
      title: "",
      description: "",
      eventType: (userRole === "admin" || userRole ==="event_convener") ? "" : userRole,
      eventCategory: "single",
      minParticipants: 1,   // ⭐ default for single
      maxParticipants: 1,   // ⭐ default for single
      eventDate: "",
      eventTime: "",
      fee:"",
      event_at:"",
      convener:"",
      convener_number:"",
      organised_by:"",
      student_cordinator:"",
      student_number:"",
      id:null,
    },
  ]);
};


  const deleteEvent = async(index,event) => {
    if(window.confirm("Are You Sure You Want To Delete This Event?")){
      setLoading(true)
      const newevent={id:event.id,eventType:event.eventType,image:event.image.name}
      // console.log(newevent)
      const res=await EventDelete(newevent)
      // console.log(res)
      if(res?.success){
        setEvents(events.filter((_, i) => i !== index));
        setLoading(false)
      }
      else{
        alert("Error Deleting Event!!")
        setLoading(false)
      }
    }
  };
const [loading,setLoading]=useState(false);
function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}

const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
};

async function geteventsinfo() {
  setLoading(true);
  const data={role:userRole};
  const res = await EventFetcher(data);
  // console.log("Fetched Events:", res);  
  if (res?.success && res?.events?.length > 0) {
  const mappedEvents = await Promise.all(
    res.events.map(async (event) => {
      let imageFile = null;
      let imagePreview = null;

      if (event.image) {
        const imageUrl = `${API_URL}/${event.image}`;
        const filename = event.image.split("/").pop();

        // 🔥 Convert backend image URL → REAL File
        imageFile = await urlToFile(imageUrl, filename);
        imagePreview = URL.createObjectURL(imageFile);
      }

      return {
        ...event,

        // actual File stored here 👇
        image: imageFile,

        // preview for UI
        imagePreview,

        eventDate: formatDate(event.eventDate),
      };
    })
  );

  setEvents(mappedEvents);
}
else{
    setEvents([{
      image: null,
      imagePreview: null,
      title: "",
      description: "",
      eventType: (userRole === "admin" || userRole==="event_convener") ? "" : userRole,
      eventCategory: "single", // ⭐ NEW FIELD
      minParticipants: 1,
      maxParticipants: 1,
      eventDate: "",
    eventTime: "",
      fee:"",
      event_at:"",
      convener:"",
      convener_number:"",
      organised_by:"",
      student_cordinator:"",
      student_number:"",
      id:null,
    }]);
  }

  setLoading(false);
}

useEffect(()=>{
    geteventsinfo()
},[])
  const handleSubmit = async() => {
    setLoading(true);
  for (let i = 0; i < events.length; i++) {
    const e = events[i];

    if (!e.image) {
      alert(`Event #${i + 1}: Image is required`);
      return;
    }
    if (e.title.trim().length < 10 || e.title.trim().length > 50) {
      alert(`Event #${i + 1}: Title must be at least 10 and atmost 50 characters`);
      return;
    }
    if (e.description.trim().length < 30 || e.description.trim().length > 500) {
      alert(`Event #${i + 1}: Description must be at least 30 and atmost 500 characters`);
      return;
    }
    if (!e.eventDate) {
      alert(`Event #${i + 1}: Event date is required`);
      return;
    }
    if (!e.eventTime) {
      alert(`Event #${i + 1}: Event time is required`);
      return;
    }
    if ((userRole === "admin" || userRole==="event_convener") && !e.eventType) {
      alert(`Event #${i + 1}: Event type must be selected`);
      return;
    }
    if (e.fee < 50 || e.fee > 50000) {
        alert(`Event #${i + 1}: Minimum Fees must be alteast 50 and atmost 50000`);
        return;
      }
    if (e.event_at.trim().length < 5 || e.event_at.trim().length > 50) {
        alert(`Event #${i + 1}: Minimum event At must be alteast 5 and atmost 50 charcters long`);
        return;
      }
      if (e.convener.trim().length < 5 || e.convener.trim().length > 50) {
        alert(`Event #${i + 1}: Minimum Convener  must be alteast 5 and Atmost 50 charcters long`);
        return;
      }
      if (e.convener_number.trim().length < 10 || e.convener_number.trim().length > 10) {
        alert(`Event #${i + 1}: Minimum Convener Number must be alteast and Atmost 10 charcters long`);
        return;
      }
      if (e.organised_by.trim().length < 5 || e.organised_by.trim().length > 50 ) {
        alert(`Event #${i + 1}: Minimum Organised By must be alteast 5 and Atmost 50 charcters long`);
        return;
      }
      if (e.student_cordinator.trim().length < 4 || e.student_cordinator.trim().length > 50) {
        alert(`Event #${i + 1}: Minimum Student Cordinator must be alteast 4 and Atmost 50 charcters long`);
        return;
      }
      if (e.student_number.trim().length < 10 || e.student_number.trim().length > 10) {
        alert(`Event #${i + 1}: Minimum Student Number must be alteast and Atmost 10 charcters long`);
        return;
      }
      

    // Team validation
    if (e.eventCategory === "team") {
      if (e.minParticipants < 1) {
        alert(`Event #${i + 1}: Minimum participants must be at least 1`);
        return;
      }
      if (e.maxParticipants < e.minParticipants) {
        alert(`Event #${i + 1}: Maximum participants must be >= minimum participants`);
        return;
      }
    }
  }

  // If all good → submit final data
  const finalEvents = events.map(event => ({
    ...event,
    eventType: event.eventType || userRole,
  }));

//   console.log("FINAL EVENTS LIST:", finalEvents);
const formData=new FormData()
events.forEach((event, index) => {
    if (event.id) {
  formData.append(`events[${index}][_id]`, event.id);
}
    formData.append(`events[${index}][title]`, event.title);
    formData.append(`events[${index}][description]`, event.description);
    formData.append(`events[${index}][eventDate]`, event.eventDate);
    formData.append(`events[${index}][eventTime]`, event.eventTime);
    formData.append(`events[${index}][eventCategory]`, event.eventCategory);
    formData.append(`events[${index}][fee]`, event.fee);
    // auto-set eventType for non-admins
    formData.append(`events[${index}][eventType]`, event.eventType || userRole);

      formData.append(`events[${index}][minParticipants]`, event.minParticipants);
      formData.append(`events[${index}][maxParticipants]`, event.maxParticipants);
      formData.append(`events[${index}][event_at]`, event.event_at);
      formData.append(`events[${index}][convener]`, event.convener);
      formData.append(`events[${index}][convener_number]`, event.convener_number);
      formData.append(`events[${index}][organised_by]`, event.organised_by);
      formData.append(`events[${index}][student_cordinator]`, event.student_cordinator);
      formData.append(`events[${index}][student_number]`, event.student_number);

    // file (multer expects a file)
    formData.append(`eventimages[${index}][${event.eventType}]`, event.image);
  });
  formData.append(`user`, userRole);
  const res=await EventAdd(formData);
//   console.log(res);
if(res?.success){
    alert("Events added successfully!");
    setLoading(false);
}
else{
    alert("Error adding events. Please try again.");
    setLoading(false);
}
};


  return (
    <div className="p-6">
        {
            loading && <WebsiteLoader/>
        }
      <h1 className="text-2xl font-semibold mb-4">Program and Events Management</h1>
      <p className="mb-6 capitalize">User Role: {userRole}</p>

      {events.map((event, index) => (
        <div key={index} className="border p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Event #{index + 1}</h2>

            {(events.length > 1 && (userRole==="admin" || userRole==="event_convener")) && (
              <button
                onClick={() => deleteEvent(index,event)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: IMAGE */}
            <div>
              {
                (userRole==="admin" || userRole==="event_convener") && 
              
              <div>
              <label className="block font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                className="mb-4"
              />
              </div>
}

              {event.imagePreview && (
                <img
                  src={event.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded border"
                />
              )}
            </div>

            {/* RIGHT SECTION */}
            <div className="max-h-[360px] overflow-y-auto pr-2">
              {/* TITLE */}
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                minLength={10}
                maxLength={100}
                value={event.title}
                onChange={(e) => updateEvent(index, "title", e.target.value)}
              />

              {/* DESCRIPTION */}
              <label className="block font-medium mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows={3}
                required
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                minLength={30}
                maxLength={500}
                value={event.description}
                onChange={(e) => updateEvent(index, "description", e.target.value)}
              />

              <label className="block font-medium mb-2">Registration Fees</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-4"
                required
                min={50}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                max={50000}
                value={event.fee}
                onChange={(e) => updateEvent(index, "fee", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Conducted At</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                minLength={5}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                maxLength={50}
                value={event.event_at}
                onChange={(e) => updateEvent(index, "event_at", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Convener</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                minLength={5}
                maxLength={50}
                value={event.convener}
                onChange={(e) => updateEvent(index, "convener", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Convener Mobile Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                minLength={10}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                maxLength={10}
                value={event.convener_number}
                onChange={(e) => updateEvent(index, "convener_number", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Organised By</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                minLength={5}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                maxLength={50}
                value={event.organised_by}
                onChange={(e) => updateEvent(index, "organised_by", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Student Cordinator</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                required
                minLength={4}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                maxLength={50}
                value={event.student_cordinator}
                onChange={(e) => updateEvent(index, "student_cordinator", e.target.value)}
              />

              <label className="block font-medium mb-2">Event Student Cordinator Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4" 
                required
                minLength={10}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                maxLength={10}
                value={event.student_number}
                onChange={(e) => updateEvent(index, "student_number", e.target.value)}
              />

              {/* EVENT DATE */}
<label className="block font-medium mb-2">Event Date</label>
<input
  type="date"
  className="w-full p-2 border rounded mb-4"
  value={event.eventDate}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
  required
  onChange={(e) => updateEvent(index, "eventDate", e.target.value)}
/>

{/* EVENT TIME */}
<label className="block font-medium mb-2">Event Time</label>
<input
  type="time"
  className="w-full p-2 border rounded mb-4"
  value={event.eventTime}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
  required
  onChange={(e) => updateEvent(index, "eventTime", e.target.value)}
/>


              {/* EVENT TYPE — ADMIN ONLY */}
              {(userRole === "admin" || userRole==="event_convener") && (
                <div className="mb-4">
                  <label className="block font-medium mb-2">Select Event Type</label>
                  <div className="space-y-2">
                    {["techno", "cultural", "sports"].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`eventType_${index}`}
                          value={type}
                          checked={event.eventType === type}
                          onChange={() => updateEvent(index, "eventType", type)}
                        />
                        <span className="capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-admin auto event type */}
              {(userRole !== "admin" || userRole==="event_convener") && (
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
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                        value={cat}
                        checked={event.eventCategory === cat}
                        onChange={() => updateEvent(index, "eventCategory", cat)}
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ⭐ SHOW ONLY IF "team" SELECTED */}
              {event.eventCategory === "team" && (
                <div className="mt-4">
                  <label className="block font-medium">Minimum Participants</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                    className="w-full p-2 border rounded mb-3"
                    value={event.minParticipants}
                    onChange={(e) =>
                      updateEvent(index, "minParticipants", e.target.value)
                    }
                  />

                  <label className="block font-medium">Maximum Participants</label>
                  <input
                    type="number"
                    min={event.minParticipants || 1}
                    max={20}
                    required
                    className="w-full p-2 border rounded"
                    value={event.maxParticipants}
                                readOnly={!(userRole==="admin" || userRole==="event_convener")}
                    onChange={(e) =>
                      updateEvent(index, "maxParticipants", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </div>

         
        </div>
      ))}
      {
        (userRole==="admin" || userRole==="event_convener") && <div className="w-full  flex justify-between">
 <button
            onClick={addNewEvent}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            + Add New Event
          </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Changes
      </button>
      </div>
      }
      
    </div>
  );
}

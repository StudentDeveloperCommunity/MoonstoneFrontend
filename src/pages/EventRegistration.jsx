import React, { useState } from "react";
import eventImg from "../assets/events/event-2.avif";
import { useLocation } from "react-router-dom";
import { API_URL } from "../NwConfig";
import RegisterToEvent from "../api-files/RegisertAPIs/RegiseterToEvent";
import WebsiteLoader from "../Loader/WebsiteLoader";
import { ArrowBigDown, ArrowBigRight } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

export default function EventRegistration() {
  const location = useLocation();
  const event = location.state?.event || {};
  const [form, setForm] = useState({
    leadName: "",
    leadEnroll: "",
    leadEmail: "",
    leadPhone: "",
    utrNumber: "",
    eventType: event?.eventType || "",
    eventfee: event?.fee || "",
    eventId: event?.id || "",
  });

  const [members, setMembers] = useState(() => {
  if (event?.maxParticipants > 1) {
    return Array.from(
      { length: event.minParticipants - 1 },
      () => ({ name: "", enroll: "" })
    );
  }
  return [];
});

const onMemberChange = (index, field) => (e) => {
  let val = e.target.value;

  if (field === "name") {
    val = val.slice(0, 20);
  }

  setMembers((prev) =>
    prev.map((m, i) =>
      i === index ? { ...m, [field]: val } : m
    )
  );
};


const addMember = () => {
  if (members.length < event.maxParticipants - 1) {
    setMembers((prev) => [...prev, { name: "", enroll: "" }]);
  }
};

const deleteMember = (index) => {
  if (members.length > event.minParticipants - 1) {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  }
};



  
  
  // console.log(event);
  const [paymentFile, setPaymentFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [registration_id, setregistration_id] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^[6-9]\d{9}$/;

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const onChange = (key) => (e) => {
    let val = e.target.value;

    if (key === "leadPhone") {
      val = val.replace(/\D/g, "").slice(0, 10);
    }
    if (key.endsWith("Name")) {
      val = val.slice(0, 20);
    }

    setField(key, val);
  };

  /** --------------- FILE VALIDATION (1 MB LIMIT) ----------------- */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        paymentFile: "File must be less than 1 MB",
      }));
      setPaymentFile(null);
      return;
    }

    setErrors((prev) => ({ ...prev, paymentFile: null }));
    setPaymentFile(file);
  };

  /** ------------------------ VALIDATIONS ------------------------- */
  const validate = () => {
    const e = {};
members.forEach((m, i) => {
  if (m.name && m.name.length > 20) {
    errors[`member_${i}`] = "Max 20 characters";
  }
});
    if (!form.leadName.trim()) e.leadName = "Name is required";
    else if (form.leadName.trim().length > 20) e.leadName = "Max 20 characters";

    ["m2Name", "m3Name", "m4Name"].forEach((k) => {
      if (form[k] && form[k].trim().length > 20) e[k] = "Max 20 characters";
    });

    if (!form.leadEmail.trim()) e.leadEmail = "Email is required";
    else if (!emailRegex.test(form.leadEmail)) e.leadEmail = "Invalid email address";

    if (!form.leadPhone.trim()) e.leadPhone = "Phone is required";
    else if (!phoneRegex.test(form.leadPhone)) e.leadPhone = "Enter valid Indian mobile";

    if (!paymentFile) e.paymentFile = "Payment screenshot required";

    if (!form.utrNumber.trim()) e.utrNumber = "UTR number required";
    if(form.utrNumber.trim().length<22) e.utrNumber="Enter valid UTR number";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async(e) => {
  e.preventDefault();
  if (!validate()) return;
  setLoading(true);

  console.log("Team Lead:", form);
  console.log("Members:", members);
  console.log("Payment File:", paymentFile);

  const formData = new FormData();
  formData.append("LeadName", form.leadName);
  formData.append("LeadEnroll", form.leadEnroll);
  formData.append("LeadEmail", form.leadEmail);
  formData.append("LeadMobileNumber", form.leadPhone);
  formData.append("utrNumber", form.utrNumber);
  formData.append("event_type", form.eventType);
  formData.append("fee", form.eventfee);
  formData.append("eventID", form.eventId);
  formData.append("members", JSON.stringify(members));
  formData.append("paymentFile", paymentFile);
    const res=await RegisterToEvent(formData);
    // console.log(res);
    if(res?.success){
      setLoading(false);
      setShowModal(true)
      setregistration_id(res?.data?._id)
      // alert("Registration successful!");
    }
    else{
      setLoading(false);
      alert("Registration failed. Please try again.");
    }
    // setLoading(false);
  // alert("Registration validated successfully with payment details");
};


  function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}

  return (
    <div className="w-full min-h-screen mt-12 bg-white px-6 py-10 flex flex-col items-center">
      {/* Header */}
      {
        loading && <WebsiteLoader/>
      }
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        registrationId={registration_id}
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-black">Event Registration</h1>
        <p className="text-gray-500 text-sm mt-1">
          Please enter your details to complete your registration
        </p>
      </div>

      {/* Event Details */}
      <div className="w-full max-w-3xl mt-8 bg-gray-50 rounded-xl p-6 shadow-sm flex  md:flex-row flex-col gap-6">
        <img
          src={`${API_URL}/${event?.image || eventImg}`}
          className="rounded-lg w-48 h-48 object-cover"
          alt="event"
        />
        <div className="flex flex-col  gap-2">
          <Detail label="Event name:" value={event?.title} />
          <Detail label="Event details:" value={event?.description} />
          <Detail label="Event Date And Time:" value={`${formatDate(event?.eventDate)} - ${event?.eventTime}`} />
          <Detail label="Registration Fee:" value={`₹${event?.fee}/- `} />
          <Detail label="Team size:" value={`Minimum : ${event?.minParticipants} Maximum : ${event?.maxParticipants}`} />
        </div>
      </div>

      {/* Form Sections */}
      <form className="w-full max-w-3xl mt-10 flex flex-col gap-8">

        {/* Team Lead */}
        <FormSection title="Team Lead">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" required name="leadName" value={form.leadName} onChange={onChange("leadName")} placeholder="Enter your full name" maxLength={20} error={errors.leadName} />
            <Input label="Enrollment No." required name="leadEnroll" value={form.leadEnroll} onChange={onChange("leadEnroll")} placeholder="Enter enrollment no." />
            <Input label="Email Address" required type="email" name="leadEmail" value={form.leadEmail} onChange={onChange("leadEmail")} placeholder="Enter email address" error={errors.leadEmail} />
            <Input label="Contact Number" required type="tel" name="leadPhone" value={form.leadPhone} onChange={onChange("leadPhone")} placeholder="Enter valid contact no." error={errors.leadPhone} />
          </div>
        </FormSection>

       {members.map((member, i) => (
  <FormSection title={`Member ${i + 2}`} key={i}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Full Name"
        value={member.name}
        onChange={onMemberChange(i, "name")}
        placeholder="Enter full name"
        maxLength={20}
      />
      <Input
        label="Enrollment No."
        value={member.enroll}
        onChange={onMemberChange(i, "enroll")}
        placeholder="Enter enrollment no."
      />
    </div>

    {/* DELETE BUTTON */}
    {members.length > event.minParticipants - 1 && (
      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={() => deleteMember(i)}
          className="text-sm text-red-600 hover:underline"
        >
          ❌ Remove Member
        </button>
      </div>
    )}
  </FormSection>
))}


{event?.maxParticipants > 1 &&
 members.length < event.maxParticipants - 1 && (
  <div className="flex justify-center">
    <button
      type="button"
      onClick={addMember}
      className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90"
    >
      + Add Member
    </button>
  </div>
)}

{/* --------------------------Go To Payemnt Button------------------------------ */}

<div  className="bg-black text-white text-center rounded-lg p-3">

          <p className="text-sm font-medium mb-2">Pay The Registration fees Here</p>

          <a href="https://mineportal.netlify.app" target="_black" className="w-full bg-green-600  text-white py-3 rounded-lg flex justify-center items-center gap-3 cursor-pointer hover:opacity-90 transition">
            Go To Payment Page <ArrowBigRight />
          </a>


          
        </div>

        {/* -------------- PAYMENT SECTION ---------------- */}
        <FormSection title="Payment Details">

          <p className="text-sm font-medium mb-2">Upload Payment Screenshot</p>

          <label className="w-full bg-[#0A1128] text-white py-3 rounded-lg flex justify-center items-center gap-3 cursor-pointer hover:opacity-90 transition">
            <span>⬆ Upload File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {errors.paymentFile && (
            <p className="text-red-600 text-xs mt-1">{errors.paymentFile}</p>
          )}

          {paymentFile && (
            <p className="text-xs mt-2 text-green-600">
              File selected: {paymentFile.name}
            </p>
          )}

          <div className="mt-4">
            <Input
              label="UTR Number"
              name="utrNumber"
              placeholder="Enter valid UTR number"
              value={form.utrNumber}
              onChange={onChange("utrNumber")}
              error={errors.utrNumber}
            />
          </div>
        </FormSection>

        {/* Submit */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            className="px-10 py-3 rounded-lg text-white font-medium 
            bg-gradient-to-r from-blue-900 via-purple-600 to-red-600 
            hover:opacity-90 transition"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------ */

function Detail({ label, value }) {
  return (
    <p className="text-sm text-gray-600">
      <span className="font-bold text-gray-700">{label}</span>{" "}
      <span className="text-black ">{value}</span>
    </p>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="border rounded-xl p-5 bg-gray-50 shadow-sm">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, placeholder, required, type = "text", name, value, onChange, maxLength, error }) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <label className="text-sm text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm
        focus:ring-2 focus:ring-black focus:outline-none"
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
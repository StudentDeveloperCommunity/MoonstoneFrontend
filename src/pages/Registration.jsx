import React, { useState } from "react";
import eventImg from "../assets/events/event-2.avif";

export default function EventRegistration() {
  const [form, setForm] = useState({
    leadName: "",
    leadEnroll: "",
    leadEmail: "",
    leadPhone: "",
    m2Name: "",
    m2Enroll: "",
    m3Name: "",
    m3Enroll: "",
    m4Name: "",
    m4Enroll: "",
    utrNumber: "",
  });

  const [paymentFile, setPaymentFile] = useState(null);
  const [errors, setErrors] = useState({});

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

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Registration validated successfully with payment details");
  };

  return (
    <div className="w-full border-2 min-h-screen bg-white px-6 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-black">Event Registration</h1>
        <p className="text-gray-500 text-sm mt-1">
          Please enter your details to complete your registration
        </p>
      </div>

      {/* Event Details */}
      <div className="w-full max-w-3xl mt-8 bg-gray-50 rounded-xl p-6 shadow-sm flex gap-6">
        <img
          src={eventImg}
          className="rounded-lg w-48 h-48 object-cover"
          alt="event"
        />
        <div className="flex flex-col gap-2">
          <Detail label="Event name:" value="Campus Kombat" />
          <Detail label="Event details:" value="12 Feb 2026 | V-Block 126" />
          <Detail label="Organised by:" value="Developers’ Community" />
          <Detail label="Registration Fee:" value="₹150/- per person" />
          <Detail label="Team size:" value="1-4 members in a Team" />
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

        {/* Member 2 */}
        <FormSection title="Member 2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" name="m2Name" value={form.m2Name} onChange={onChange("m2Name")} placeholder="Enter full name" maxLength={20} error={errors.m2Name} />
            <Input label="Enrollment No." name="m2Enroll" value={form.m2Enroll} onChange={onChange("m2Enroll")} placeholder="Enter enrollment no." />
          </div>
        </FormSection>

        {/* Member 3 */}
        <FormSection title="Member 3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" name="m3Name" value={form.m3Name} onChange={onChange("m3Name")} placeholder="Enter full name" maxLength={20} error={errors.m3Name} />
            <Input label="Enrollment No." name="m3Enroll" value={form.m3Enroll} onChange={onChange("m3Enroll")} placeholder="Enter enrollment no." />
          </div>
        </FormSection>

        {/* Member 4 */}
        <FormSection title="Member 4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" name="m4Name" value={form.m4Name} onChange={onChange("m4Name")} placeholder="Enter full name" maxLength={20} error={errors.m4Name} />
            <Input label="Enrollment No." name="m4Enroll" value={form.m4Enroll} onChange={onChange("m4Enroll")} placeholder="Enter enrollment no." />
          </div>
        </FormSection>

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
      <span className="font-semibold text-gray-700">{label}</span>{" "}
      <span className="text-black">{value}</span>
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

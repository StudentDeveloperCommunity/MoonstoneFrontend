import { useParams } from "react-router-dom";
export default function EventDetails() {
  const { id } = useParams();

  return (
    <section className="min-h-screen bg-gray-900 text-white pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Event Details</h1>

        <p className="opacity-80 mb-6">
          Event ID: <span className="font-semibold">{id}</span>
        </p>

        <div className="bg-gray-800 rounded-2xl p-6">
          <p className="text-lg">
            This is a placeholder details page.  
            We’ll connect real event data next.
          </p>

          <button className="mt-6 px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}

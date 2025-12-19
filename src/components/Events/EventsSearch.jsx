/* =====================================================
   Aadi | Events Search Bar
   ===================================================== */

   export default function EventsSearch({ search, setSearch }) {
    return (
      <section className="w-full flex justify-center px-4 mt-8">
        <div
          className="
            max-w-[956px] w-full
            flex flex-col sm:flex-row
            gap-[15px]
          "
        >
          {/* Aadi | Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event"
            className="
              h-[44px] w-full
              px-4
              rounded-lg
              bg-white text-black
              outline-none
              placeholder-gray-500
            "
          />
  
          {/* Aadi | Search Button */}
          <button
            className="
              h-[44px]
              px-6
              rounded-lg
              bg-white text-black
              font-medium
              hover:bg-gray-200
              transition
              whitespace-nowrap
            "
          >
            Search
          </button>
        </div>
      </section>
    );
  }
  
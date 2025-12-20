/* =====================================================
   Aadi | Events Filters (Pill Buttons)
   ===================================================== */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
   const filters = [
    { key: "all", label: "All" },
    { key: "cultural", label: "Cultural" },
    { key: "techno", label: "Techno" },
    { key: "sports", label: "Sports" },
    // { key: "non-tech", label: "Non-tech" },
  ];

  const idToFilterMap = {
  1: "techno",
  2: "sports",
  3: "cultural",
};
  
  export default function EventsFilters({ filter, setFilter }) {
    const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id && idToFilterMap[id]) {
      setFilter(idToFilterMap[id]);
    }
  }, [searchParams, setFilter]);
    return (
      <section className="w-full flex justify-center mt-6 px-4">
        <div className="flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium
                transition-all duration-300
                ${
                  filter === item.key 
                    ? "bg-white text-black shadow-md"
                    : "bg-gray-800 text-white border border-white/20 hover:bg-gray-700"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
    );
  }
  
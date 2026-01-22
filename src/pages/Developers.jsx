import OfficeCatMan from '../assets/logo/Office cat man 😼.jpeg';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Mail, Phone } from 'lucide-react';

// Data for Developers
const developerData = [
    {
        id: 1,
        name: "Dr. Prashant Panse",
        role: "Mentor",
        department: "Computer Science Department",
        email: "gmail.com",
        category: "Mentors",
        image: ""
    },
    // Project Lead
    {
        id: 100,
        name: "Avdhesh Bhadoriya",
        role: "Project Lead",
        department: "Information Technology",
        email: "avdheshbhadoriya@gmail.com",
        category: "Project Lead",
        image: OfficeCatMan
    },
    {
        id: 5,
        name: "John Doe",
        role: "Frontend",
        department: "CSE",
        email: "john@code.com",
        category: "Frontend Developers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    // --- Backend Developers ---
    {
        id: 7,
        name: "John Doe",
        role: "Backend",
        department: "Computer Science Department",
        email: "university.edu",
        category: "Backend Developers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shilpa"
    },
    {
        id: 8,
        name: "John Doe",
        role: "Backend",
        department: "Computer Science Department",
        email: "university.edu",
        category: "Backend Developers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shilpa"
    },
    {
        id: 9,
        name: "John Doe",
        role: "Backend",
        department: "Computer Science Department",
        email: "university.edu",
        category: "Backend Developers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shilpa"
    },
    // --- Deployers ---
    {
        id: 10,
        name: "John Doe",
        role: "Backend",
        department: "Computer Science Department",
        email: "shilpa@university.edu",
        category: "Deployers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shilpa"
    },
    {
        id: 11,
        name: "John Doe",
        role: "Deployer",
        department: "Computer Science Department",
        email: "university.edu",
        category: "Deployers",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shilpa"
    },
    
    {
    id: 13,
    name: "Dr.Sanket Gupta",
    role: " Mentor",
    department: "Computer Science Department",
    email: "@university.edu",
    category: "Mentors",
    image: ""
},
{
    id: 14,
    name: "Dr. Kailash C. Bandu",
    role: "Mentor",
    department: "Information Technology Department",
    email: "@university.edu",
    category: "Mentors",
    image: ""
},
];

const categories = ["Mentors", "Project Lead", "Frontend Developers", "Backend Developers", "Deployers"];

export default function Developers() {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDevelopers = developerData.filter(dev =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() > 0.5 ? "1px" : "2px",
                            height: Math.random() > 0.5 ? "1px" : "2px",
                            left: `${Math.random() * 98}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0.35,
                            animation: `twinkle ${2 + Math.random() * 3}s infinite alternate,`,
                        }}
                    />
                ))}
            </div>

            {/* PAGE CONTENT */}
            <section className="relative w-full text-white pb-32">

                {/* SPACE BELOW FIXED NAVBAR */}
                <div className="pt-28 container mx-auto px-4 max-w-7xl">

                    {/* --- HERO SECTION --- */}
                    <div className="relative w-full max-w-6xl mx-auto rounded-tl-[20px] rounded-tr-[60px] rounded-br-[20px] rounded-bl-[60px] bg-black overflow-hidden border border-gray-700/50 shadow-2xl mb-12">
                        {/* Decorative Rings */}
                        <div className="hidden sm:block absolute right-0 top-0 h-full w-1/2 lg:w-1/3 overflow-hidden pointer-events-none opacity-20">
                            <div className="absolute -right-20 -top-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full border-[30px] border-gray-600/30"></div>
                            <div className="absolute -right-10 -top-10 w-48 h-48 sm:w-80 sm:h-80 rounded-full border-[20px] border-gray-500/30"></div>
                        </div>

                        <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-center min-h-[180px]">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                Developer's Page
                            </h1>
                            <p className="text-gray-400 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
                                Meet the minds behind the magic — a passionate team of developers turning vision into seamless digital experiences.
                            </p>
                        </div>
                    </div>

                    {/* --- SEARCH SECTION --- */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                        <div className="relative w-full max-w-2xl group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-gray-500 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by department or designation.."
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/30 transition-all border border-transparent placeholder-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                            Search
                        </button>
                    </div>

                    {/* --- DEVELOPER CATEGORIES --- */}
                    <div className="space-y-16">
                        {categories.map((category) => {
                            const categoryDevs = filteredDevelopers.filter(dev => dev.category === category);
                            if (categoryDevs.length === 0) return null;

                            return (
                                <div key={category} className="w-full">
                                    <div className="inline-block mb-8">
                                        <div className="px-6 py-2 rounded-full border border-gray-600 bg-gray-900/40 backdrop-blur-md text-gray-200 font-semibold tracking-wide shadow-lg">
                                            {category}
                                        </div>
                                    </div>

                                    {/* Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {categoryDevs.map((dev) => (
                                            <div
                                                key={dev.id}
                                                className="group relative bg-white rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(100,180,255,0.4)] border border-transparent hover:border-blue-400/50 flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-4 min-h-[220px]"
                                            >
                                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shrink-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                                                    {dev.image ? (
                                                        <img
                                                            src={dev.image}
                                                            alt={dev.name}
                                                            className="w-full h-full object-cover object-top"
                                                            onError={e => { e.target.style.display = 'none'; }}
                                                        />
                                                    ) : (
                                                        <span className="text-3xl font-bold text-gray-500 select-none">
                                                            {dev.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-black font-bold text-lg leading-tight truncate">{dev.name}</h3>
                                                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                                                        {dev.role}
                                                    </span>

                                                    <div className="mt-3 text-gray-600 text-sm space-y-1">
                                                        <p className="text-xs text-gray-500 mb-1 truncate">{dev.department}</p>
                                                        <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer truncate">
                                                            <Mail className="w-3.5 h-3.5 shrink-0" />
                                                            <span className="text-xs truncate">{dev.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer truncate">
                                                            {/* <Phone className="w-3.5 h-3.5 shrink-0" /> */}
                                                            <span className="text-xs truncate">{dev.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}


                        
                    </div>

                </div>
            </section>

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
            `}</style>
        </>
    );
}


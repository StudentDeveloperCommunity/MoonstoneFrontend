import {
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import WebsiteLoader from "../Loader/WebsiteLoader"
import RegisterStats from "../api-files/RegisertAPIs/RegisterStats";

export function DashboardOverview({ setActiveSection,userRole }) {
const [stats, setstats] = useState([]);
const [loading, setloading] = useState(false);
    async function getstats(userRole){
    // console.log(userRole)
    setloading(true)
    const data={ userRole:userRole}
    const res=await RegisterStats(data)
    // console.log(res)
    if(res?.success){
      setstats(res?.data)
      setloading(false)
    }
    setloading(false)
  } 
  useEffect(()=>{
    getstats(userRole)
  },[userRole])
  // const [loading, setloading] = useState(false);

  const navigatetosection = (link) => {
    setActiveSection(link);
    window.scrollTo(0, 0);
  };

  // ✅ NEW EVENTS DATA
  const eventStats2 =stats || [];
  // console.log(eventStats2) 
  
  const quickActions = [
    {
      title: "Add New User",
      description: "Add a staff member",
      action: "users",
      link: "users",
      id:"admin"
    },
    {
      title: "Add New Event",
      description: "Create a new program or event",
      action: "events",
      link: "events",
    },
    {
      title: "Manage Registrations",
      description: "Manage event registrations",
      action: "registration",
      link: "registration",
    },
    // {
    //   title: "Manage Finance",
    //   description: "View financial reports",
    //   action: "finance",
    //   link: "finance",
    // },
  ];

  const filteredQuickActions = quickActions.filter(action => {
    if ((action.id === "admin") && userRole !== "admin") return false;
    return true;
  });
 
  return (
    <div className="space-y-6">
      {loading && <WebsiteLoader />}

      {/* ⭐ WELCOME SECTION (UNCHANGED) */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome to MoonStone - 2026 Admin Panel
        </h1>
        <p className="text-gray-200">
          Manage your Events, Registration, Finance and more from this
          central dashboard.
        </p>
      </div>

      {/* ⭐ UPDATED EVENTS STATISTICS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventStats2.map((stat, index) => {
          const Icon = stat.event_type==="techno"?Calendar:stat.event_type==="cultural"?Users:DollarSign;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold capitalize">{stat.event_type}</h4>
                <div className={`p-2 rounded-full ${stat.event_type==="techno"?"bg-blue-100":stat.event_type==="cultural"?"bg-green-100":"bg-orange-100"}`}>
                  <Icon className={`h-5 w-5  -${stat.event_type==="techno"?"text-blue-600":stat.event_type==="cultural"?"text-green-600":"text-orange-600"}`} />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Number of Events:</span>{" "}
                  {stat.totalEventsConducted}
                </p>
                <p>
                  <span className="font-medium">Total Registrations:</span>{" "}
                  {stat.totalRegistrations}
                </p>
                <p>
                  <span className="font-medium">Approved Registrations:</span>{" "}
                  {stat.approvedRegistrations}
                </p>
                <p>
                  <span className="font-medium">Total Revenue:</span>{" "}
                  ₹{stat.totalAmountCollected}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ⭐ QUICK ACTIONS SECTION (UNCHANGED) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#dfdfdf] col-span-1 lg:col-span-2 w-full">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <p className="text-sm text-gray-500 mb-4">
            Frequently used management tasks
          </p>

          <div className="space-y-3">
            {filteredQuickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-[#dfdfdf] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </div>
                <button
                  onClick={() => navigatetosection(action.link)}
                  className="px-3 py-1 text-sm border border-[#dfdfdf] rounded hover:bg-gray-100"
                >
                  Go
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

import { useEffect, useState } from 'react';
import { 
  LayoutDashboard,
  Calendar, 
  Users, 
  Trophy, 
  LogOut,
  Menu,
  X,
  FileText,
  DollarSign,
} from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import { DashboardOverview } from './DashboardOverview';
import Verify from '../api-files/AdminAPIs/Verify';
import Logout from '../api-files/AdminAPIs/Logout';
import ManageUser from './ManageUser';
import ProgramAndEvents from './ProgramAndEvents';
import RegistrationDetail from './RegistrationDetail';
import Sponsors from './Sponsors';
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Manage User', icon: Users },
  { id: 'about', label: 'About Page Editor', icon: FileText },
  { id: 'sponsor', label: 'Sponsors', icon: DollarSign },
  { id: 'events', label: 'Programs & Events', icon: Calendar },
  { id: 'registration', label: 'Registrations', icon: Trophy },
];

export function AdminDashboard({   }) {
  const [userRole, setUserRole] = useState(null);
  const scheduleAutoLogout = () => {
      const expiry = localStorage.getItem("35gntgij@3e#ed");
      if (!expiry) return;
    
      const timeout = expiry - Date.now();
      if (timeout > 0) {
        setTimeout(() => {
          logoutUser(); // clear storage, redirect
        }, timeout);
      } else {
        logoutUser();
      }
    };

  useEffect(()=>{
    verifyAdmin()
    scheduleAutoLogout()
  },[])
   const logoutUser = async() => {
    window.localStorage.removeItem("35gntgij@3e#ed")
            const res=await Logout()
            // console.log(res)
            window.location.href="/admin"
      
    };
  const [loading, setloading] = useState(false);
  
  const verifyAdmin=async()=>{
    console.log("verifying")
      const res=await Verify()
    //   console.log(res)
      if(res?.message=="Admin verified successfully"){
        setUserRole(res?.role)
    // getstats(res?.role)
        console.log("irfnvndjbvbdjiwjf")
      }
      else{
    window.localStorage.removeItem("35gntgij@3e#ed")
            window.location.href="/admin"
        
      }
    
  }
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const renderActiveSection = () => {
  const isAdmin = userRole
  

  switch (activeSection) {
    case "dashboard":
      return (
        <DashboardOverview
          setActiveSection={setActiveSection}
          userRole={userRole}
        />
      );

    case "users":
      return isAdmin==="admin" ? <ManageUser userRole={userRole} /> : <DashboardOverview />;
    
    case "sponsor":
      return isAdmin==="admin" ? <Sponsors userRole={userRole} /> : <DashboardOverview />;

    case "events":
      return <ProgramAndEvents userRole={userRole} />;

    case "registration":
      return isAdmin==="event_convener"? <DashboardOverview />: <RegistrationDetail userRole={userRole} />;

    default:
      return <DashboardOverview />;
  }
};


  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls to top smoothly
}, [activeSection]);

const filteredNavigation = navigationItems.filter(item => {
  if ((item.id === "users" || item.id==="about" || item.id=="sponsor") && userRole !== "admin") return false;
  return true;
});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 overflow-x-hidden overflow-y-scroll bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <ToastContainer />
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
              <span className="font-bold text-sm">MU</span>
            </div>
            <div>
              <h1 className="font-bold text-black">MoonStone - 2026</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className=" bg-gray-200  flex items-center justify-center">
              

            </div>
            <div className='flex items-center justify-center space-x-3'>
              <p className="font-medium text-sm">Logged in as</p>
              <div className='flex space-x-4 mt-2'>
              <span
                className={`inline-block px-2 py-1 capitalize text-xs rounded ${
                  userRole === 'admin'
                    ? 'bg-black text-white '
                    : 'bg-gray-200 text-gray-700 '
                }`}
              >
                {userRole}
              </span>
              
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-8">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 space-y-5 border-t border-gray-200">
          <button
              onClick={logoutUser}
            className="w-full flex cursor-pointer items-center justify-start px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>

         
        </div>
        
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </button>
              <h2 className="capitalize font-medium">
                {activeSection === 'dashboard'
                  ? 'Dashboard Overview'
                  : navigationItems.find((item) => item.id === activeSection)
                      ?.label}
              </h2>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderActiveSection()}</main>
        
      </div>
    </div>
  );
}

export default AdminDashboard;
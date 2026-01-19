import { useEffect, useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import AddUserModal from "./AddUserModal";
import AdminRegister from "../api-files/AdminAPIs/AdminRegister";
import GetAdminUsers from "../api-files/AdminAPIs/GetAdminUsers";
import WebsiteLoader from "../Loader/WebsiteLoader";
export default function ManageUser() {
  const [open, setOpen] = useState(false);
  const handleAddUser = async (newUser) => {
    const res=await AdminRegister(newUser)
    console.log(res)
    if(res?.message=="Successfully User Created"){
        alert("User Created Successfully")
        setUsers((prev) => [...prev, newUser]);
        setOpen(false);
    }
    else{
        alert("User with same email already exists")
        // setOpen(false);
    }
    // setUsers((prev) => [...prev, newUser]);
    console.log("New User Added:", newUser);
  };
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ayaan Shaikh",
      email: "ayaan@example.com",
      password: "Ayaan@123",
      role: "Admin",
      showPassword: false,
    },
    {
      id: 2,
      name: "Hafsa Khan",
      email: "hafsa@example.com",
      password: "Hafsa@789",
      role: "techno",
      showPassword: false,
    },
    
  ]);

  const getusers=async()=>{
    setLoading(true);
    const res=await GetAdminUsers();
    // console.log(res);
    if(res?.success){
      setLoading(false);
        setUsers(res?.user);
    }
    setLoading(false);
  }
  useEffect(()=>{
    getusers();
  },[])

  return (
    <div className="p-6 space-y-6">
      {
        loading && <WebsiteLoader/>
      }
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>

        <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <UserPlus  className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto border border-gray-200 overflow-hidden">
        <table className="w-full text-left overflow-x-auto">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold text-gray-700">Sr.No</th>
              <th className="p-3 font-semibold text-gray-700">Email</th>
              <th className="p-3 font-semibold text-gray-700">Role</th>
            </tr>
          </thead>


          <tbody>
            {users.map((user,index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{index+1}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <AddUserModal open={open} setOpen={setOpen} onAddUser={handleAddUser} />
    </div>
  );
}

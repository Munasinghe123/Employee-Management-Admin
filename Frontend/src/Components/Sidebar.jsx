
import { Link, useLocation } from "react-router-dom";
import { Clock, Users, Settings, LogOut, NotepadText } from "lucide-react";
import Logo from '../Images/Leco.png'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
    const location = useLocation();
    const { logout, user } = useContext(AuthContext);

    const logoutUser = () => {
        logout();
    }

    const navItems = [
        { label: "Attendance", icon: Clock, path: "/dashboard/attendance" },
        { label: "Employees", icon: Users, path: "/dashboard/employees" },
        { label: "Daily log sheet", icon: NotepadText, path: "/dashboard/logsheet" },
        // { label: "My Account", icon: Settings, path: "/dashboard/settings" },
    ];

    return (
        <aside className="w-[220px] bg-[#0D1422] border-r border-[#1A2B3C] flex flex-col">
            <div className="flex items-center gap-3 p-5">
                <img src={Logo} className="h-12 w-12 rounded-2xl object-contain" />
                <div className="font-bold text-white whitespace-nowrap">
                    LECO Admin
                </div>
            </div>


            <nav className="flex-1 space-y-2 px-2">
                {navItems.map(item => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm transition
                ${isActive
                                    ? "bg-[#7C5CFC]/20 text-white"
                                    : "text-[#4E6680] hover:text-white hover:bg-white/[0.03]"
                                }`}
                        >
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center justify-between p-4 border-t border-[#1A2B3C]">

                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-white">
                        {user.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {user.employeeId}
                    </p>
                </div>

                <button
                    onClick={() => logoutUser()}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition group"
                >
                    <LogOut className="text-gray-400 group-hover:text-red-500 transition" size={18} />
                </button>

            </div>

        </aside>
    );
}
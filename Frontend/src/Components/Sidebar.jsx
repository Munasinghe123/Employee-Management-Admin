// components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Clock, Users, Settings } from "lucide-react";
import Logo from '../Images/Leco.png'

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { label: "Attendance", icon: Clock, path: "/attendance" },
        { label: "Employees", icon: Users, path: "/employees" },
        { label: "Settings", icon: Settings, path: "/settings" },
    ];

    return (
        <aside className="w-[220px] bg-[#0D1422] border-r border-[#1A2B3C] flex flex-col">
            <div className="flex flex-row p-5">
                <img src={Logo} height={40} width={30} />
                <div className="p-4 font-bold text-white">LECO Admin</div>
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
        </aside>
    );
}
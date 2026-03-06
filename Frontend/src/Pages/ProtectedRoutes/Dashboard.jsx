import React, { useState } from "react";
import {
    LayoutDashboard, Users, Clock, Calendar, BarChart2,
    Settings, LogOut, Bell, ChevronRight, TrendingUp,
    TrendingDown, AlertTriangle, CheckCircle, XCircle,
    Coffee, Moon, Sun, Menu, X
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from "recharts";
import Logo from '../../Images/new-logo.png'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// ── MOCK DATA  
const kpiData = [
    {
        label: "Total Employees",
        value: "1,248",
        change: "+2.8%",
        trend: "up",
        period: "vs last month",
        color: "#7C5CFC",
        bg: "rgba(124,92,252,0.08)",
        icon: Users,
    },
    {
        label: "Checked In Today",
        value: "856",
        change: "68.6%",
        trend: "up",
        period: "attendance rate",
        color: "#22C97A",
        bg: "rgba(34,201,122,0.08)",
        icon: CheckCircle,
    },
    {
        label: "Late Arrivals",
        value: "12",
        change: "+3",
        trend: "down",
        period: "vs yesterday",
        color: "#F0A030",
        bg: "rgba(240,160,48,0.08)",
        icon: AlertTriangle,
    },
    {
        label: "Pending Requests",
        value: "24",
        change: "5 new",
        trend: "neutral",
        period: "needs review",
        color: "#30B8F0",
        bg: "rgba(48,184,240,0.08)",
        icon: Bell,
    },
];

const attendanceData = [
    { day: "Mon", attendance: 88, onTime: 80 },
    { day: "Tue", attendance: 92, onTime: 85 },
    { day: "Wed", attendance: 85, onTime: 78 },
    { day: "Thu", attendance: 94, onTime: 88 },
    { day: "Fri", attendance: 90, onTime: 83 },
    { day: "Sat", attendance: 72, onTime: 68 },
    { day: "Sun", attendance: 65, onTime: 60 },
];

const activityFeed = [
    { name: "M. Chen", action: "checked in for morning shift", time: "2 mins ago", type: "checkin", color: "#22C97A" },
    { name: "D. Nissel", action: "arrived 15 min late — Section B", time: "18 mins ago", type: "late", color: "#F0A030" },
    { name: "G. Ford", action: "requested 3 days leave", time: "34 mins ago", type: "leave", color: "#7C5CFC" },
    { name: "S. Park", action: "checked out early", time: "1 hr ago", type: "checkout", color: "#F05858" },
    { name: "R. James", action: "shift schedule updated", time: "2 hrs ago", type: "schedule", color: "#30B8F0" },
];

const recentAttendance = [
    { initials: "MC", name: "M. Chen", id: "EMP-0041", dept: "Engineering", time: "08:02 AM", status: "On Time", statusColor: "#22C97A", bg: "#7C5CFC" },
    { initials: "DN", name: "D. Nissel", id: "EMP-0078", dept: "Operations", time: "08:47 AM", status: "Late", statusColor: "#F0A030", bg: "#F0A030" },
    { initials: "GF", name: "G. Ford", id: "EMP-0112", dept: "HR", time: "—", status: "On Leave", statusColor: "#30B8F0", bg: "#22C97A" },
    { initials: "SP", name: "S. Park", id: "EMP-0055", dept: "Finance", time: "07:58 AM", status: "Left Early", statusColor: "#F05858", bg: "#30B8F0" },
    { initials: "RJ", name: "R. James", id: "EMP-0033", dept: "IT", time: "08:00 AM", status: "On Time", statusColor: "#22C97A", bg: "#7C5CFC" },
];

const shiftData = [
    { label: "Morning", icon: Sun, count: 342, total: 420, color: "#7C5CFC" },
    { label: "Afternoon", icon: Coffee, count: 286, total: 420, color: "#22C97A" },
    { label: "Night", icon: Moon, count: 228, total: 420, color: "#30B8F0" },
    { label: "Unassigned", icon: AlertTriangle, count: 392, total: 1248, color: "#F05858" },
];

const navItems = [
    { label: "Overview", icon: LayoutDashboard, section: "Main", active: true },
    { label: "Employees", icon: Users, section: "Manage" },
    { label: "Attendance", icon: Clock, section: "Manage", badge: 12 },
    { label: "Scheduling", icon: Calendar, section: "Manage" },
    { label: "Reports", icon: BarChart2, section: "Insights" },
    { label: "Settings", icon: Settings, section: "System" },
];

// ── CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111B2C] border border-[#1A2B3C] rounded-lg px-3 py-2 text-xs">
                <p className="text-[#4E6680] mb-1">{label}</p>
                <p className="text-[#7C5CFC]">Attendance: {payload[0]?.value}%</p>
                <p className="text-[#22C97A]">On Time: {payload[1]?.value}%</p>
            </div>
        );
    }
    return null;
};

// ── DASHBOARD 
export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate()

    return (
        <div className="flex h-screen bg-[#0A0F1A] text-white overflow-hidden font-sans">

            {/* ── SIDEBAR ── */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[220px] flex-shrink-0
        bg-[#0D1422] border-r border-[#1A2B3C]
        flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

                {/* Logo */}
                <div className="h-[60px] flex items-center gap-3 px-5 border-b border-[#1A2B3C] flex-shrink-0">
                    <Link to="/">
                        <img src={Logo} className="h-12 w-10" />
                    </Link>

                    <span className="font-bold text-sm tracking-tight">LECO Admin</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    {["Main", "Manage", "Insights", "System"].map(section => {
                        const items = navItems.filter(i => i.section === section);
                        if (!items.length) return null;
                        return (
                            <div key={section}>
                                <p className="px-5 py-2 text-[9px] text-[#2B3F55] uppercase tracking-widest">{section}</p>
                                {items.map(item => (
                                    <div key={item.label} className={`
                    relative flex items-center gap-3 px-5 py-2.5 text-[12.5px] cursor-pointer
                    transition-all duration-150
                    ${item.active
                                            ? "text-white bg-[rgba(124,92,252,0.08)]"
                                            : "text-[#4E6680] hover:text-white hover:bg-white/[0.02]"
                                        }
                  `}>
                                        {item.active && (
                                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#7C5CFC] rounded-r-full" />
                                        )}
                                        <item.icon size={14} className="flex-shrink-0" />
                                        {item.label}
                                        {item.badge && (
                                            <span className="ml-auto text-[9px] bg-[#7C5CFC] text-white px-1.5 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-[#1A2B3C] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7C5CFC] flex items-center justify-center text-[10px] font-bold flex-shrink-0">SJ</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">Sarah Jenkins</p>
                        <p className="text-[10px] text-[#4E6680]">Super Admin</p>
                    </div>
                    <LogOut size={13} className="text-[#4E6680] cursor-pointer hover:text-[#F05858] transition-colors flex-shrink-0" />
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── MAIN ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Topbar */}
                <div className="h-[60px] flex-shrink-0 flex items-center justify-between px-5 lg:px-7 border-b border-[#1A2B3C] bg-[#0D1422]">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-[#4E6680] hover:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <p className="font-bold text-sm tracking-tight">Dashboard Overview</p>
                            <p className="text-[11px] text-[#4E6680] hidden sm:block">Good morning, Sarah — here's what's happening today.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden md:block text-[11px] text-[#4E6680] border border-[#1A2B3C] px-3 py-1.5 rounded-md">
                            Friday, 6 Mar 2026
                        </span>
                        <div className="relative w-8 h-8 border border-[#1A2B3C] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#7C5CFC]/50 transition-colors">
                            <Bell size={14} className="text-[#4E6680]" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#7C5CFC] rounded-full border border-[#0D1422]" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 lg:p-7 space-y-5">

                    {/* KPI Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {kpiData.map((kpi) => (
                            <div key={kpi.label} className="bg-[#111B2C] border border-[#1A2B3C] rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-[#4E6680]">{kpi.label}</span>
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                                        <kpi.icon size={13} style={{ color: kpi.color }} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: kpi.bg, color: kpi.color }}>
                                        {kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↑" : "●"} {kpi.change}
                                    </span>
                                    <span className="text-[10px] text-[#4E6680]">{kpi.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mid Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        {/* Chart */}
                        <div className="lg:col-span-2 bg-[#111B2C] border border-[#1A2B3C] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-5">
                                <p className="font-bold text-sm">Weekly Attendance Trend</p>
                                <span className="text-[11px] text-[#7C5CFC] cursor-pointer hover:opacity-80">View full report →</span>
                            </div>
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart data={attendanceData}>
                                    <defs>
                                        <linearGradient id="gradAttendance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gradOnTime" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22C97A" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#22C97A" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2B3C" vertical={false} />
                                    <XAxis dataKey="day" tick={{ fill: "#4E6680", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: "#4E6680", fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="attendance" stroke="#7C5CFC" strokeWidth={2} fill="url(#gradAttendance)" />
                                    <Area type="monotone" dataKey="onTime" stroke="#22C97A" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gradOnTime)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Activity Feed */}
                        <div className="bg-[#111B2C] border border-[#1A2B3C] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-bold text-sm">Activity Feed</p>
                                <span className="text-[11px] text-[#7C5CFC] cursor-pointer hover:opacity-80">View all</span>
                            </div>
                            <div className="space-y-3">
                                {activityFeed.map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                                        <div>
                                            <p className="text-[12px] leading-snug">
                                                <span className="font-medium text-white">{item.name}</span>
                                                <span className="text-[#4E6680]"> {item.action}</span>
                                            </p>
                                            <p className="text-[10px] text-[#2B3F55] mt-0.5">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        {/* Table */}
                        <div className="lg:col-span-2 bg-[#111B2C] border border-[#1A2B3C] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-bold text-sm">Recent Attendance</p>
                                <span className="text-[11px] text-[#7C5CFC] cursor-pointer hover:opacity-80">View all →</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#1A2B3C]">
                                            {["Employee", "Department", "Time In", "Status"].map(h => (
                                                <th key={h} className="text-left text-[10px] text-[#4E6680] uppercase tracking-wider pb-3 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentAttendance.map((emp, i) => (
                                            <tr key={i} className="border-b border-[#1A2B3C] last:border-0">
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ background: emp.bg }}>
                                                            {emp.initials}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-medium">{emp.name}</p>
                                                            <p className="text-[10px] text-[#4E6680]">{emp.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-xs text-[#4E6680]">{emp.dept}</td>
                                                <td className="py-3 text-xs text-[#4E6680]">{emp.time}</td>
                                                <td className="py-3">
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: emp.statusColor, background: `${emp.statusColor}18` }}>
                                                        ● {emp.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Shift Summary */}
                        <div className="bg-[#111B2C] border border-[#1A2B3C] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <p className="font-bold text-sm">Today's Shifts</p>
                                <span className="text-[11px] text-[#7C5CFC] cursor-pointer hover:opacity-80">Manage →</span>
                            </div>
                            <div className="space-y-4">
                                {shiftData.map((shift, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <shift.icon size={12} style={{ color: shift.color }} />
                                                <span className="text-xs text-[#4E6680]">{shift.label}</span>
                                            </div>
                                            <span className="text-xs font-medium">{shift.count}</span>
                                        </div>
                                        <div className="h-1.5 bg-[#1A2B3C] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${(shift.count / shift.total) * 100}%`, background: shift.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
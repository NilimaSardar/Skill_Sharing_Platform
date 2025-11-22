import React from "react";
import Topbar from "../../components/Admin/Topbar";
import Sidebar from "../../components/admin/Sidebar";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { month: "Jan", value: 300 },
  { month: "Feb", value: 120 },
  { month: "Mar", value: 420 },
  { month: "Apr", value: 80 },
  { month: "May", value: 180 },
  { month: "Jun", value: 300 },
  { month: "Jul", value: 100 },
  { month: "Aug", value: 120 },
  { month: "Sep", value: 140 },
  { month: "Oct", value: 360 },
  { month: "Nov", value: 420 },
  { month: "Dec", value: 280 },
];

const pieData = [
  { name: "Arrival", value: 15 },
  { name: "Spending", value: 28 },
  { name: "Saving", value: 13 },
];

const COLORS = ["#0ea5e9", "#2563eb", "#7c3aed"];

const AdminDashboard = () => {
  return (
    <Sidebar>
      <Topbar />

      {/* TOP CARDS — now responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">

        {/* users */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200">
            <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-[15px]">Users</p>
                <h2 className="text-2xl font-[550] tracking-wider">500+</h2>
            </div>
            <div>
                <img src="../../admin/Users.svg" alt="" />
            </div>
        </div>

        {/* enrollment */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200">
            <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-[15px]">Enrollment</p>
                <h2 className="text-2xl font-[550] tracking-wider">500+</h2>
            </div>
            <div>
                <img src="../../admin/Enrollment.svg" alt="" />
            </div>
        </div>

        {/* share */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200">
            <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-[15px]">Share</p>
                <h2 className="text-2xl font-[550] tracking-wider">500+</h2>
            </div>
            <div>
                <img src="../../admin/Share.svg" alt="" />
            </div>
          </div>

        {/* Exchange */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200">
            <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-[15px]">Exchange</p>
                <h2 className="text-2xl font-[550] tracking-wider">500+</h2>
            </div>
            <div>
                <img src="../../admin/Exchange.svg" alt="" />
            </div>
          </div>
      </div>

      {/* MAIN GRID — now responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* AREA CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold">Monthly Engagement</h3>
            <div className="text-sm text-gray-500">September 2025</div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DONUT CHART */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h3 className="text-gray-700 font-semibold mb-4">Efficiency</h3>

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid gap-2 text-sm">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                <span>{item.value}% {item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminDashboard;

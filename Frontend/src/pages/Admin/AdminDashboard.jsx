import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
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

const COLORS = ["#0ea5e9", "#2563eb", "#7c3aed"];

const AdminDashboard = () => {
  const { API } = useAuth();
  const [topCards, setTopCards] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(`${API}/api/admin/dashboard/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Dashboard API Response:", data);

        if (!data.success) return;

        const stats = data.stats;

        // ------- TOP CARDS -------
        const cards = [
          { name: "Total Posts", value: stats.totalPosts, img: "../admin/Users.svg" },
          { name: "Shares", value: stats.totalShares, img: "../admin/Enrollment.svg" },
          { name: "Proposals", value: stats.totalProposals, img: "../admin/Share.svg" },
          { name: "Engaged Users", value: stats.engagedUsers, img: "../admin/Exchange.svg" },
        ];

        setTopCards(cards);

        // ------- LINE CHART DATA (Current Month Engagement) -------
        const currentMonth = new Date().getMonth() + 1; // 1-12
        const monthData = stats.monthlyTrend
          .filter((item) => item._id.month === currentMonth)
          .map((i) => ({
            month: new Date(2024, i._id.month - 1).toLocaleString("default", {
              month: "short",
            }),
            value: i.totalPosts || i.count || 0,
          }));

        setLineData(monthData);

        // ------- PIE CHART (Efficiency) -------
        const total = stats.totalPosts + stats.totalShares + stats.totalProposals || 1;

        const efficiency = [
          { name: "Posts", value: Number(((stats.totalPosts / total) * 100).toFixed(1)) },
          { name: "Shares", value: Number(((stats.totalShares / total) * 100).toFixed(1)) },
          { name: "Proposals", value: Number(((stats.totalProposals / total) * 100).toFixed(1)) },
        ];

        setPieData(efficiency);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {topCards.map((card, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200"
          >
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 text-[15px]">{card.name}</p>
              <h2 className="text-2xl font-[550] tracking-wider">{card.value}</h2>
            </div>
            <div>
              <img src={card.img} alt={card.name} className="w-10 h-10" />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AREA CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold">Monthly Engagement</h3>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleString("default", { month: "long" })}{" "}
              {new Date().getFullYear()}
            </div>
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
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="url(#colorValue)"
                />
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
                <span>
                  {item.value}% {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
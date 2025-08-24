"use client"
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const inpatientData = [
  { month: "Oct 2019", inpatients: 1200, outpatients: 700 },
  { month: "Nov 2019", inpatients: 3100, outpatients: 1400 },
  { month: "Dec 2019", inpatients: 4300, outpatients: 1600 },
  { month: "Jan 2020", inpatients: 2700, outpatients: 1200 },
  { month: "Feb 2020", inpatients: 2300, outpatients: 900 },
  { month: "Mar 2020", inpatients: 3000, outpatients: 1300 },
];

const pieData = [
  { name: "Inpatients", value: 72 }, // %
  { name: "Outpatients", value: 28 },
];

const COLORS = ["#8b5cf6", "#22d3ee"];

const timeData = [
  { time: "07 am", admitted: 75 },
  { time: "08 am", admitted: 113 },
  { time: "09 am", admitted: 98 },
  { time: "10 am", admitted: 120 },
  { time: "11 am", admitted: 130 },
  { time: "12 pm", admitted: 110 },
];

const divisionData = [
  { division: "Cardiology", pt: 247, icon: "❤️" },
  { division: "Neurology", pt: 164, icon: "🧠" },
  { division: "Surgery", pt: 86, icon: "🩺" },
];

function DashboardCard({ icon, title, value, bg }) {
  return (
    <div className="flex-1 min-w-[180px] bg-white rounded-xl shadow p-6 flex gap-4 items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${bg}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500">{title}</div>
      </div>
    </div>
  );
}

export default function HealthDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="flex gap-6 flex-wrap">
          <DashboardCard
            icon={<span className="material-icons">hotel</span>}
            title="Total Patients"
            value="3,256"
            bg="bg-purple-100 text-purple-700"
          />
          <DashboardCard
            icon={<span className="material-icons">groups</span>}
            title="Available Staff"
            value="394"
            bg="bg-cyan-100 text-cyan-700"
          />
          <DashboardCard
            icon={<span className="material-icons">local_hospital</span>}
            title="Avg Treat. Costs"
            value="$2,536"
            bg="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Chart Row */}
        <div className="flex gap-8 flex-wrap">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[380px]">
            <div className="mb-3 font-bold">Outpatients vs. Inpatients Trend</div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={inpatientData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inpatients" fill="#8b5cf6" name="Inpatients" />
                <Bar dataKey="outpatients" fill="#22d3ee" name="Outpatients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-w-[230px]">
            <div className="mb-3 w-full text-left font-bold">Show by months</div>
            <PieChart width={140} height={140}>
              <Pie
                data={pieData}
                cx={70}
                cy={70}
                innerRadius={48}
                outerRadius={65}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex gap-2 mt-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block mr-1" />
                Inpatients
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block mr-1" />
                Outpatients
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-gray-700">28%</span> Outpatients
            </div>
          </div>
        </div>

        {/* Time Admitted and Division */}
        <div className="flex gap-8 flex-wrap">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow p-6 flex-1 min-w-[430px]">
            <div className="mb-3 font-bold">Time Admitted <span className="text-sm text-gray-400 ml-2">Today</span></div>
            <ResponsiveContainer width="100%" height={115}>
              <LineChart data={timeData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="admitted"
                  stroke="#ff7300"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Division Table */}
          <div className="bg-white rounded-xl shadow p-6 w-64 min-w-[220px]">
            <div className="mb-3 font-bold">Patients By Division</div>
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-left text-sm">
                  <th className="py-2">DIVISION</th>
                  <th className="py-2">PT.</th>
                </tr>
              </thead>
              <tbody>
                {divisionData.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.division}</span>
                    </td>
                    <td className="py-2 font-bold text-gray-700">{item.pt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

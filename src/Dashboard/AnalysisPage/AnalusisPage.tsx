import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const styles = `
.dashboard {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 30px 0;
    animation: fadeIn 1s ease-in-out;
}

/* === TOP STATS CARDS === */
.top-stats {
    background-color: #f9efef;
    border-radius: 12px;
    padding: 30px 20px;
}
.stat-card {
    background: #fff;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.08);
    text-align: left;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}
.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}
.stat-title {
    color: #444;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 10px;
}
.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
}
.stat-sub {
    font-size: 1.1rem;
    color: #555;
    font-weight: 500;
    margin-left: 5px;
}

/* === Animated circular progress === */
.progress-wrapper {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 55px;
    height: 55px;
}
.progress-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(var(--color) var(--deg), #eee var(--deg));
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s ease;
}
.progress-circle span {
    font-size: 0.8rem;
    font-weight: 600;
    color: #444;
}

/* حركة تعبئة الدائرة */
@keyframes fillProgress {
    0% { --deg: 0deg; }
    100% { --deg: calc(var(--percent) * 3.6deg); }
}

/* === CHARTS === */
.chart-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.8s ease-in-out forwards;
}

.chart-card:hover {
    box-shadow: 0 4px 15px rgba(128, 0, 0, 0.2);
}

.chart-card h5 {
    font-weight: 600;
    color: #800000;
    letter-spacing: 0.5px;
}

.dashboard h1 {
    color: #800000;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dashboard p {
    color: #6c757d;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .chart-card {
        margin-bottom: 1rem;
    }
}
`;

const COLORS = ["#800000", "#a05252", "#c0c0c0", "#9ca3af"];

export default function AnalysisPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState({ users: 0, categories: 0, products: 0 });

    useEffect(() => {
        Promise.all([
        axios.get("https://68e4e1228e116898997d6e79.mockapi.io/signup"),
        axios.get("https://68e3e5f38e116898997a5f72.mockapi.io/items"),
        ])
        .then(([usersRes, itemsRes]) => {
            setUsers(usersRes.data);
            setItems(itemsRes.data);

            // أنيميشن تدريجي للدوائر
            let usersVal = 0, catVal = 0, prodVal = 0;
            const interval = setInterval(() => {
            usersVal += 2;
            catVal += 2;
            prodVal += 2;
            if (usersVal > 70) usersVal = 70;
            if (catVal > 60) catVal = 60;
            if (prodVal > 80) prodVal = 80;
            setProgress({ users: usersVal, categories: catVal, products: prodVal });
            if (usersVal === 70 && catVal === 60 && prodVal === 80) clearInterval(interval);
            }, 40);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        );

    // === data ===
    const categoriesCount: Record<string, number> = {};
    items.forEach((i) => {
        const cat = i.category || "Other";
        categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
    });

    const categoriesData = Object.entries(categoriesCount).map(([name, value]) => ({
        name,
        value,
    }));

    const usersByRole = users.reduce((acc: any, u) => {
        const role = u.role || "user";
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const usersDistributionData = Object.entries(usersByRole).map(([role, count]) => ({
        role,
        count,
    }));

    const topSellingData = [...items]
        .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        .slice(0, 6)
        .map((item) => ({
        name: item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name,
        sales: item.price ?? 0,
        }));

    return (
        <>
        <style>{styles}</style>
        <div className="dashboard">
            <div className="container">
            {/* <div className="text-center mb-5">
                <h1>Burgerizza Dashboard</h1>
                <p>Overview of your system performance</p>
            </div> */}

            {/* === TOP STATS === */}
            <div className="container top-stats mb-5">
                <div className="row g-4 justify-content-center">
                    {[
                        { title: "Total Users", value: users.length, sub: "Users", color: "#e6a5a2", percent: progress.users },
                        { title: "Total Categories", value: Object.keys(categoriesCount).length, sub: "Types", color: "gray", percent: progress.categories },
                        { title: "Top Products", value: topSellingData.length, sub: "Items", color: "#b33a3a", percent: progress.products },
                    ].map((stat, i) => (
                    <div key={i} className="col-md-4">
                        <div className="stat-card">
                            <h6 className="stat-title">{stat.title}</h6>
                            <div className="d-flex align-items-baseline">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-sub">{stat.sub}</span>
                        </div>
                        <div className="progress-wrapper">
                            <div
                                className="progress-circle"
                                style={
                                {
                                    "--color": stat.color,
                                    "--percent": stat.percent,
                                    "--deg": `${stat.percent * 3.6}deg`,
                                } as React.CSSProperties
                                }
                            >
                                <span>{stat.percent}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                </div>
            </div>

            {/* === CHARTS === */}
            <div className="row g-4 mb-4">
                <div className="col-lg-6 col-md-12">
                <div className="chart-card">
                    <h5 className="text-center mb-3">Categories Distribution</h5>
                    <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                        data={categoriesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={(entry) => entry.name}
                        >
                        {categoriesData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    </ResponsiveContainer>
                </div>
                </div>

                <div className="col-lg-6 col-md-12">
                <div className="chart-card">
                    <h5 className="text-center mb-3">Users Distribution</h5>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usersDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="role" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#800000" radius={[6, 6, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>
            </div>

            {/* === TOP SELLING === */}
            <div className="row justify-content-center">
                <div className="col-lg-8">
                <div className="chart-card">
                    <h5 className="text-center mb-3">Top Selling Products</h5>
                    <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={topSellingData}>
                        <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#800000" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#ffcccc" stopOpacity={0.1} />
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#555", fontSize: 12 }} />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                        }}
                        />
                        <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#800000"
                        strokeWidth={3}
                        fill="url(#colorSales)"
                        dot={{ fill: "#800000", r: 5 }}
                        activeDot={{ r: 7 }}
                        />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
    );
}

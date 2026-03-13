"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";
import {
    FaHome, FaChartBar, FaSearch, FaCog, FaLink,
    FaMobileAlt, FaBolt, FaUserCircle, FaBell, FaSignOutAlt,
    FaArrowUp, FaArrowDown, FaExclamationTriangle, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";

// ─── Data ────────────────────────────────────────────────────────────────────

const metrics = [
    { label: "SEO Score", value: 85, max: 100, unit: "%", delta: +6, color: "#c9962a", bg: "rgba(201,150,42,0.08)", border: "rgba(201,150,42,0.2)" },
    { label: "Performance", value: 98, max: 100, unit: "%", delta: +2, color: "#4ade80", bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.18)" },
    { label: "Best Practices", value: 100, max: 100, unit: "%", delta: 0, color: "#63b3ed", bg: "rgba(99,179,237,0.07)", border: "rgba(99,179,237,0.18)" },
    { label: "Backlinks", value: 342, max: null, unit: "", delta: +18, color: "#c9962a", bg: "rgba(201,150,42,0.08)", border: "rgba(201,150,42,0.2)" },
];

const issues = [
    { level: "high", icon: <FaTimesCircle />, color: "#f87171", bg: "rgba(248,113,113,0.08)", text: "Missing meta descriptions on 8 pages", fix: "Add meta descriptions" },
    { level: "high", icon: <FaTimesCircle />, color: "#f87171", bg: "rgba(248,113,113,0.08)", text: "Broken internal links detected (3 found)", fix: "Fix links" },
    { level: "medium", icon: <FaExclamationTriangle />, color: "#c9962a", bg: "rgba(201,150,42,0.08)", text: "Images missing alt attributes — 23 images", fix: "Add alt text" },
    { level: "medium", icon: <FaExclamationTriangle />, color: "#c9962a", bg: "rgba(201,150,42,0.08)", text: "H1 tag hierarchy inconsistent across blog", fix: "Fix headings" },
    { level: "low", icon: <FaCheckCircle />, color: "#4ade80", bg: "rgba(74,222,128,0.07)", text: "LCP 2.8s — slightly above 2.5s threshold", fix: "Optimise" },
];

const keywords = [
    { kw: "seo auditor tool", pos: 4, vol: "8.2K", delta: +2 },
    { kw: "free seo analysis", pos: 11, vol: "22K", delta: -1 },
    { kw: "website seo checker", pos: 7, vol: "14K", delta: +5 },
    { kw: "backlink audit tool", pos: 19, vol: "5.6K", delta: +3 },
    { kw: "seo score checker", pos: 2, vol: "11K", delta: 0 },
];

const sparkPoints = [40, 52, 47, 61, 58, 72, 68, 79, 75, 85];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Sparkline = ({ points }: { points: number[] }) => {
    const w = 80, h = 32;
    const min = Math.min(...points), max = Math.max(...points);
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map(p => h - ((p - min) / (max - min)) * h);
    const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
            <path d={d} stroke="#c9962a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="2.5" fill="#c9962a" />
        </svg>
    );
};

const ScoreRing = ({ value, color }: { value: number; color: string }) => {
    const r = 28, circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    return (
        <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 36 36)" />
            <text x="36" y="40" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">{value}</text>
        </svg>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "backlinks" | "settings">("overview");

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    }, []);

    const displayName = user?.email?.split("@")[0] ?? "there";

    return (
        <div className="min-h-screen bg-[#0c0b08] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── Sidebar ── */}
            <aside className="fixed left-0 top-0 h-full w-[220px] border-r border-white/[0.06] bg-[#0f0d09] flex flex-col z-40 hidden lg:flex">
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-[#c9962a] flex items-center justify-center flex-shrink-0">
                        <FaSearch className="w-3.5 h-3.5 text-[#0c0b08]" />
                    </div>
                    <span className="text-[15px] font-semibold text-[#f0d080] tracking-tight">SEO-Auditor</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
                    {[
                        { id: "overview", label: "Overview", icon: <FaHome /> },
                        { id: "keywords", label: "Keywords", icon: <FaSearch /> },
                        { id: "backlinks", label: "Backlinks", icon: <FaLink /> },
                        { id: "settings", label: "Settings", icon: <FaCog /> },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as typeof activeTab)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left w-full ${
                                activeTab === item.id
                                    ? "bg-[#c9962a]/10 text-[#c9962a] border border-[#c9962a]/20"
                                    : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
                            }`}
                        >
                            <span className="text-[12px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Quick stats */}
                <div className="mx-3 mb-4 p-3.5 rounded-xl bg-[#c9962a]/06 border border-[#c9962a]/15">
                    <p className="text-[10px] uppercase tracking-widest text-[#c9962a]/60 font-semibold mb-2">This month</p>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-[18px] font-semibold text-white">+24%</p>
                            <p className="text-[10px] text-white/30">visibility</p>
                        </div>
                        <Sparkline points={sparkPoints} />
                    </div>
                </div>

                {/* User + logout */}
                <div className="px-3 pb-5 border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-2.5 px-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-[#c9962a] flex items-center justify-center text-[11px] font-bold text-[#0c0b08] flex-shrink-0">
                            {displayName[0]?.toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[12px] font-medium text-white/80 truncate">{user?.email ?? "—"}</p>
                            <p className="text-[10px] text-white/25">Pro plan</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-[12px] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
                    >
                        <FaSignOutAlt className="text-[11px]" /> Sign out
                    </button>
                </div>
            </aside>

            {/* ── Main content ── */}
            <div className="lg:pl-[220px] min-h-screen">

                {/* Topbar */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/[0.06] bg-[#0c0b08]/80 backdrop-blur-md">
                    <div>
                        <h1 className="text-[15px] font-semibold text-white">Good morning, <span className="text-[#c9962a]">{displayName}</span> 👋</h1>
                        <p className="text-[11px] text-white/30 mt-0.5">Last scan: today at 09:14 AM · example-website.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                            <FaBell className="text-[12px]" />
                        </button>
                        <button className="flex items-center gap-2 bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] text-[12px] font-bold px-4 py-2 rounded-xl transition-colors">
                            <FaSearch className="text-[10px]" /> New Scan
                        </button>
                    </div>
                </header>

                {/* Body */}
                <main className="px-6 lg:px-8 py-8">

                    {/* URL bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse flex-shrink-0" />
                        <span className="font-mono text-[12px] text-white/40 flex-1">https://example-website.com</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4ade80]/70">Live</span>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[11px] text-white/25">Scanned 2 min ago</span>
                    </motion.div>

                    {/* Metric cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + i * 0.05 }}
                                className="rounded-2xl p-5"
                                style={{ background: m.bg, border: `1px solid ${m.border}` }}
                            >
                                <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: `${m.color}99` }}>{m.label}</p>
                                <div className="flex items-end justify-between">
                                    <p className="text-[28px] font-semibold text-white leading-none">
                                        {m.value}<span className="text-[14px] text-white/30">{m.unit}</span>
                                    </p>
                                    {m.delta !== 0 && (
                                        <span className={`flex items-center gap-1 text-[11px] font-semibold ${m.delta > 0 ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                                            {m.delta > 0 ? <FaArrowUp className="text-[9px]" /> : <FaArrowDown className="text-[9px]" />}
                                            {Math.abs(m.delta)}{m.unit}
                                        </span>
                                    )}
                                </div>
                                {m.max && (
                                    <div className="mt-3 h-[3px] rounded-full bg-white/[0.07]">
                                        <div className="h-full rounded-full" style={{ width: `${(m.value / m.max) * 100}%`, background: m.color }} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Two-col grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-6">

                        {/* Issues panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                                <div>
                                    <h2 className="text-[13px] font-semibold text-white">Issues found</h2>
                                    <p className="text-[11px] text-white/30 mt-0.5">12 total · 2 critical</p>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/15">
                                    Action needed
                                </span>
                            </div>
                            <div className="divide-y divide-white/[0.04]">
                                {issues.map((issue, i) => (
                                    <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group">
                                        <span style={{ color: issue.color }} className="text-[13px] flex-shrink-0">{issue.icon}</span>
                                        <p className="flex-1 text-[12px] text-white/50 group-hover:text-white/70 transition-colors">{issue.text}</p>
                                        <button
                                            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all opacity-0 group-hover:opacity-100"
                                            style={{ color: issue.color, borderColor: `${issue.color}30`, background: issue.bg }}
                                        >
                                            {issue.fix}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right column */}
                        <div className="flex flex-col gap-6">

                            {/* Overall score */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
                            >
                                <p className="text-[10px] uppercase tracking-widest font-semibold text-[#c9962a]/60 mb-4">Overall health</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "SEO", val: 85, color: "#c9962a" },
                                        { label: "Speed", val: 98, color: "#4ade80" },
                                        { label: "Mobile", val: 91, color: "#63b3ed" },
                                        { label: "Security", val: 76, color: "#a78bfa" },
                                    ].map(s => (
                                        <div key={s.label} className="flex flex-col items-center gap-1.5">
                                            <ScoreRing value={s.val} color={s.color} />
                                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Quick wins */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                className="bg-[#c9962a]/06 border border-[#c9962a]/15 rounded-2xl p-5"
                            >
                                <p className="text-[10px] uppercase tracking-widest font-semibold text-[#c9962a]/60 mb-3">Quick wins</p>
                                <div className="flex flex-col gap-2">
                                    {["Compress 4 unoptimised images", "Enable browser caching", "Add schema markup to homepage"].map((w, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-[12px] text-white/50">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9962a] flex-shrink-0" />
                                            {w}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Keywords table */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                            <h2 className="text-[13px] font-semibold text-white">Keyword rankings</h2>
                            <button className="text-[11px] text-[#c9962a] hover:text-[#d4a535] font-semibold transition-colors">View all →</button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.04]">
                                    {["Keyword", "Position", "Volume", "Change"].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-[10px] uppercase tracking-widest text-white/20 font-semibold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {keywords.map((k, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-3.5 text-[12px] text-white/60 font-mono group-hover:text-white/80 transition-colors">{k.kw}</td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-[12px] font-semibold text-white">#{k.pos}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-[12px] text-white/40">{k.vol}</td>
                                        <td className="px-6 py-3.5">
                                            {k.delta === 0 ? (
                                                <span className="text-[11px] text-white/20">—</span>
                                            ) : (
                                                <span className={`flex items-center gap-1 text-[11px] font-semibold ${k.delta > 0 ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                                                    {k.delta > 0 ? <FaArrowUp className="text-[9px]" /> : <FaArrowDown className="text-[9px]" />}
                                                    {Math.abs(k.delta)}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                </main>
            </div>
        </div>
    );
}
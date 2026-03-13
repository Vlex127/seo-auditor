"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { motion } from "framer-motion";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";

const keywords = [
    { kw: "seo auditor tool", pos: 4, vol: "8.2K", delta: +2, difficulty: 45 },
    { kw: "free seo analysis", pos: 11, vol: "22K", delta: -1, difficulty: 62 },
    { kw: "website seo checker", pos: 7, vol: "14K", delta: +5, difficulty: 58 },
    { kw: "backlink audit tool", pos: 19, vol: "5.6K", delta: +3, difficulty: 39 },
    { kw: "seo score checker", pos: 2, vol: "11K", delta: 0, difficulty: 41 },
    { kw: "google ranking tracker", pos: 24, vol: "18K", delta: +8, difficulty: 71 },
];

export default function Keyword() {
    return (
        <DashboardShell>
            <div className="px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Keyword Tracking</h1>
                        <p className="text-white/30 text-sm mt-1">Monitor your rankings and discover new opportunities.</p>
                    </div>
                    <button className="bg-[#c9962a]/10 text-[#c9962a] border border-[#c9962a]/20 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#c9962a]/20 transition-all">
                        + Add Keyword
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.02] border border-white/[0.07] rounded-3xl overflow-hidden"
                >
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Keyword</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Position</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Volume</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Difficulty</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {keywords.map((k, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-all group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-[#c9962a] transition-colors">
                                                <FaSearch className="text-[10px]" />
                                            </div>
                                            <span className="text-sm font-medium">{k.kw}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold">#{k.pos}</span>
                                            {k.delta !== 0 && (
                                                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${k.delta > 0 ? "text-green-400" : "text-red-400"}`}>
                                                    {k.delta > 0 ? <FaArrowUp className="scale-75" /> : <FaArrowDown className="scale-75" />}
                                                    {Math.abs(k.delta)}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-sm text-white/40">{k.vol}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full max-w-[60px]">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${k.difficulty}%`, backgroundColor: k.difficulty > 60 ? '#f87171' : k.difficulty > 40 ? '#fbbf24' : '#4ade80' }}
                                                />
                                            </div>
                                            <span className="text-[11px] font-bold text-white/30">{k.difficulty}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <button className="text-[11px] font-bold text-[#c9962a] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </DashboardShell>
    );
}
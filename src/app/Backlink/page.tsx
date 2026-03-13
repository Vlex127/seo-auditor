"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { motion } from "framer-motion";
import { FaLink, FaExternalLinkAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const backlinks = [
    { site: "techcrunch.com", url: "/seo-best-practices", dr: 92, traffic: "1.2M", status: "ok" },
    { site: "medium.com", url: "/marketing/ai-tools", dr: 88, traffic: "450K", status: "ok" },
    { site: "spam-site.biz", url: "/cheap-links", dr: 12, traffic: "0", status: "toxic" },
    { site: "forbes.com", url: "/sites/seo-guide", dr: 94, traffic: "3.4M", status: "ok" },
    { site: "github.com", url: "/awesome-seo", dr: 95, traffic: "2.1M", status: "ok" },
];

export default function Backlink() {
    return (
        <DashboardShell>
            <div className="px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Backlink Analysis</h1>
                        <p className="text-white/30 text-sm mt-1">Audit your referring domains and monitor link profile health.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white/[0.03] border border-white/[0.07] px-4 py-2 rounded-xl flex items-center gap-3">
                            <span className="text-[10px] uppercase font-bold text-white/20">Toxic Links</span>
                            <span className="text-sm font-bold text-red-400">2</span>
                        </div>
                        <button className="bg-[#c9962a] text-[#0c0b08] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#d4a535] transition-all">
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total Backlinks", val: "3.2K", color: "#c9962a" },
                        { label: "Referring Domains", val: "842", color: "#63b3ed" },
                        { label: "Domain Rating", val: "48", color: "#4ade80" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.07] p-6 rounded-3xl"
                        >
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-2">{stat.label}</p>
                            <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.val}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/[0.02] border border-white/[0.07] rounded-3xl overflow-hidden"
                >
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Source Page</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">DR</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Est. Traffic</th>
                                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {backlinks.map((link, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium flex items-center gap-2 group-hover:text-[#c9962a] transition-colors">
                                                {link.site} <FaExternalLinkAlt className="text-[10px] text-white/20" />
                                            </span>
                                            <span className="text-[11px] text-white/20 mt-1">{link.url}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-bold text-white/60">{link.dr}</span>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-white/40">{link.traffic}</td>
                                    <td className="px-8 py-5">
                                        {link.status === "ok" ? (
                                            <div className="flex items-center gap-2 text-green-400 text-[11px] font-bold">
                                                <FaCheckCircle /> Good
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-400 text-[11px] font-bold bg-red-400/10 px-2 py-1 rounded-lg border border-red-400/20 w-fit">
                                                <FaExclamationCircle /> Toxic
                                            </div>
                                        )}
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
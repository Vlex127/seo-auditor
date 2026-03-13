"use client";

import React, { useEffect, useState, useRef } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLink, FaExternalLinkAlt, FaCheckCircle, FaExclamationCircle,
    FaChevronDown, FaGlobe, FaSync, FaDownload, FaExclamationTriangle
} from "react-icons/fa";
import { getWebsites } from "../Dashboard/actions";
import { getBacklinks, getBacklinkStats } from "./actions";

export default function Backlink() {
    const [websites, setWebsites] = useState<any[]>([]);
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
    const [backlinks, setBacklinks] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, toxic: 0, referringDomains: 0 });
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeSite = websites.find(s => s.id === selectedSiteId) || websites[0];

    const loadData = async (siteId: string) => {
        setLoading(true);
        const [links, s] = await Promise.all([
            getBacklinks(siteId),
            getBacklinkStats(siteId)
        ]);
        setBacklinks(links);
        setStats(s);
        setLoading(false);
    };

    const loadInitialData = async () => {
        const sites = await getWebsites();
        setWebsites(sites);
        if (sites.length > 0) {
            const initialSiteId = sites[0].id;
            setSelectedSiteId(initialSiteId);
            await loadData(initialSiteId);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSiteChange = async (siteId: string) => {
        setSelectedSiteId(siteId);
        setShowDropdown(false);
        await loadData(siteId);
    };

    return (
        <DashboardShell>
            <div className="px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Backlink Analysis</h1>
                        <p className="text-white/30 text-sm mt-1">Audit referring domains for <strong>{activeSite?.domain}</strong></p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Site Selector */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => websites.length > 1 && setShowDropdown(!showDropdown)}
                                className={`flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 transition-all ${websites.length > 1 ? 'hover:bg-white/[0.05]' : 'cursor-default'}`}
                            >
                                <FaGlobe className="text-[#c9962a] text-xs" />
                                <span className="text-xs font-mono text-white/60">{activeSite?.domain || 'Select Site'}</span>
                                {websites.length > 1 && <FaChevronDown className={`text-[10px] text-white/20 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />}
                            </button>

                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full right-0 mt-2 w-64 bg-[#12110e] border border-white/[0.07] rounded-2xl overflow-hidden z-50 shadow-2xl"
                                    >
                                        <div className="py-2">
                                            {websites.map((site) => (
                                                <button
                                                    key={site.id}
                                                    onClick={() => handleSiteChange(site.id)}
                                                    className={`w-full text-left px-5 py-3 text-xs font-mono transition-colors flex items-center justify-between ${selectedSiteId === site.id ? 'bg-[#c9962a]/10 text-white' : 'text-white/40 hover:bg-white/[0.03] hover:text-white/70'}`}
                                                >
                                                    {site.domain}
                                                    {selectedSiteId === site.id && <FaCheckCircle className="text-[#c9962a]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2">
                            <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
                                <span className="text-[10px] uppercase font-bold text-red-400/60">Toxic</span>
                                <span className="text-sm font-bold text-red-400">{stats.toxic}</span>
                            </div>
                            <button className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all flex items-center gap-2">
                                <FaDownload size={10} /> Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total Backlinks", val: stats.total, color: "#c9962a" },
                        { label: "Referring Domains", val: stats.referringDomains, color: "#63b3ed" },
                        { label: "Domain Authority", val: "48", color: "#4ade80" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.07] p-8 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-colors"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20 mb-3">{stat.label}</p>
                            <p className="text-4xl font-bold" style={{ color: stat.color }}>
                                {loading ? "..." : typeof stat.val === 'number' ? stat.val.toLocaleString() : stat.val}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : backlinks.length === 0 ? (
                    <div className="bg-white/[0.02] border border-white/[0.07] rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-3xl bg-white/[0.05] flex items-center justify-center text-white/10 text-3xl mb-8">
                            <FaLink />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No Backlinks Found</h3>
                        <p className="text-white/20 text-sm max-w-md">
                            We couldn't find any backlinks for {activeSite?.domain} yet. Try running a new audit or connect your Google Search Console for better insights.
                        </p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/[0.02] border border-white/[0.07] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/40"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">Source Domain</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">DR</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">Estimated Traffic</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-white/20 font-bold">Health Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {backlinks.map((link) => (
                                        <tr key={link.id} className="hover:bg-white/[0.02] transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#c9962a] group-hover:bg-[#c9962a]/10 transition-colors">
                                                        <FaLink className="text-[12px]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold flex items-center gap-2 group-hover:text-white transition-colors">
                                                            {link.site}
                                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                                <FaExternalLinkAlt className="text-[10px] text-white/10 hover:text-[#c9962a] transition-colors" />
                                                            </a>
                                                        </span>
                                                        <span className="text-[11px] text-white/20 mt-0.5 truncate max-w-[300px] font-mono">{link.url}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`text-sm font-bold ${link.dr > 80 ? 'text-green-400' : link.dr > 50 ? 'text-white' : 'text-white/40'}`}>
                                                    {link.dr}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-mono text-sm text-white/40">{link.traffic}</td>
                                            <td className="px-8 py-6">
                                                {link.status === "ok" ? (
                                                    <div className="flex items-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-widest bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 w-fit">
                                                        <FaCheckCircle className="text-[10px]" /> Healthy
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-400/10 px-3 py-1.5 rounded-full border border-red-400/20 w-fit">
                                                        <FaExclamationTriangle className="text-[10px]" /> Toxic Link
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </DashboardShell>
    );
}

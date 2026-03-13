"use client";

import React, { useEffect, useState, useRef } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch, FaArrowUp, FaArrowDown, FaChevronDown, FaPlus,
    FaGlobe, FaTrash, FaSync, FaExclamationTriangle, FaCheckCircle
} from "react-icons/fa";
import { getWebsites } from "../Dashboard/actions";
import { getKeywords, addKeyword, deleteKeyword } from "./actions";
import { createClient } from "@/lib/supabase/client";

export default function Keyword() {
    const [websites, setWebsites] = useState<any[]>([]);
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newKeyword, setNewKeyword] = useState("");
    const [addingKeyword, setAddingKeyword] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    const activeSite = websites.find(s => s.id === selectedSiteId) || websites[0];

    const loadInitialData = async () => {
        const sites = await getWebsites();
        setWebsites(sites);
        if (sites.length > 0) {
            const initialSiteId = sites[0].id;
            setSelectedSiteId(initialSiteId);
            const kws = await getKeywords(initialSiteId);
            setKeywords(kws);
        }
        setLoading(false);
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
        setLoading(true);
        const kws = await getKeywords(siteId);
        setKeywords(kws);
        setLoading(false);
    };

    const handleAddKeyword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeyword || !selectedSiteId) return;

        setAddingKeyword(true);
        setError(null);
        const res = await addKeyword(selectedSiteId, newKeyword);

        if (res.error) {
            setError(res.error);
        } else {
            const kws = await getKeywords(selectedSiteId);
            setKeywords(kws);
            setNewKeyword("");
            setIsAdding(false);
        }
        setAddingKeyword(false);
    };

    const handleDeleteKeyword = async (id: string) => {
        if (!selectedSiteId) return;
        const res = await deleteKeyword(id);
        if (!res.error) {
            setKeywords(keywords.filter(k => k.id !== id));
        }
    };

    return (
        <DashboardShell>
            <div className="px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Keyword Tracking</h1>
                        <p className="text-white/30 text-sm mt-1">Monitor rankings for <strong>{activeSite?.domain}</strong></p>
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

                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <FaPlus /> Add Keyword
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-16 bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : keywords.length === 0 ? (
                    <div className="bg-white/[0.02] border border-white/[0.07] rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center text-white/20 text-2xl mb-6">
                            <FaSearch />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Keywords Tracked</h3>
                        <p className="text-white/30 text-sm max-w-sm mb-8">
                            Start monitoring your search engine rankings by adding your first keyword for {activeSite?.domain}.
                        </p>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-white text-black font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-all"
                        >
                            Add Your First Keyword
                        </button>
                    </div>
                ) : (
                    <div className="bg-white/[0.02] border border-white/[0.07] rounded-[2.5rem] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Keyword</th>
                                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Google Pos.</th>
                                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Volume</th>
                                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold">Difficulty</th>
                                        <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-white/20 font-bold text-right text-transparent">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {keywords.map((k) => (
                                        <tr key={k.id} className="hover:bg-white/[0.02] transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-[#c9962a] group-hover:bg-[#c9962a]/10 transition-all">
                                                        <FaSearch className="text-xs" />
                                                    </div>
                                                    <span className="text-sm font-semibold">{k.kw}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-sm font-bold ${k.pos <= 3 ? 'text-amber-400' : k.pos <= 10 ? 'text-white' : 'text-white/40'}`}>
                                                        #{k.pos}
                                                    </span>
                                                    {k.delta !== 0 && (
                                                        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${k.delta > 0 ? "text-green-400" : "text-red-400"}`}>
                                                            {k.delta > 0 ? <FaArrowUp className="scale-75" /> : <FaArrowDown className="scale-75" />}
                                                            {Math.abs(k.delta)}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-sm text-white/40 font-mono">{k.vol}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full max-w-[60px]">
                                                        <div
                                                            className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                                            style={{
                                                                width: `${k.difficulty}%`,
                                                                backgroundColor: k.difficulty > 70 ? '#ef4444' : k.difficulty > 40 ? '#f59e0b' : '#10b981'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-[11px] font-bold text-white/30 font-mono">{k.difficulty}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button
                                                    onClick={() => handleDeleteKeyword(k.id)}
                                                    className="p-2.5 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Keyword Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-lg bg-[#0c0b08] border border-white/[0.08] rounded-[2.5rem] p-10 relative z-10 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9962a]/5 rounded-full blur-3xl -mr-16 -mt-16" />

                            <h2 className="text-2xl font-bold mb-2">Add New Keyword</h2>
                            <p className="text-white/30 text-sm mb-8">Enter the term you want to track for <strong>{activeSite?.domain}</strong>.</p>

                            <form onSubmit={handleAddKeyword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20">Keyword Phrase</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. best seo auditor"
                                        value={newKeyword}
                                        onChange={(e) => setNewKeyword(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c9962a]/50 transition-all"
                                    />
                                    {error && (
                                        <p className="text-red-400 text-xs mt-2 flex items-center gap-2">
                                            <FaExclamationTriangle size={10} /> {error}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAdding(false)}
                                        className="flex-1 px-8 py-4 rounded-2xl text-white/40 font-bold hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addingKeyword || !newKeyword}
                                        className="flex-[2] bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                                    >
                                        {addingKeyword ? <FaSync className="animate-spin" /> : <FaPlus />}
                                        {addingKeyword ? 'Adding...' : 'Start Tracking'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardShell>
    );
}

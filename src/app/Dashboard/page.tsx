"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaArrowUp, FaArrowDown, FaExclamationTriangle, FaCheckCircle, FaTimesCircle,
    FaPlus, FaGlobe, FaSearch, FaBolt, FaArrowRight, FaSync, FaChevronDown
} from "react-icons/fa";
import { DashboardShell } from "@/components/dashboard-shell";
import { addWebsite, getWebsites } from "./actions";
import { runAudit } from "./audit-actions";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

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

export default function Dashboard() {
    const [websites, setWebsites] = useState<any[]>([]);
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [latestAudit, setLatestAudit] = useState<any>(null);
    const [auditIssues, setAuditIssues] = useState<any[]>([]);

    const [isAdding, setIsAdding] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeSite = websites.find(s => s.id === selectedSiteId) || websites[0];

    const loadAuditData = async (siteId: string) => {
        const supabase = createClient();
        const { data: audit } = await supabase
            .from('audits')
            .select('*')
            .eq('website_id', siteId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        setLatestAudit(audit);

        if (audit) {
            const { data: issues } = await supabase
                .from('issues')
                .select('*')
                .eq('audit_id', audit.id)
                .limit(5);
            setAuditIssues(issues || []);
        } else {
            setAuditIssues([]);
        }
    };

    const loadInitialData = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(prof);

            const sites = await getWebsites();
            setWebsites(sites);

            if (sites.length > 0) {
                const initialSiteId = sites[0].id;
                setSelectedSiteId(initialSiteId);
                await loadAuditData(initialSiteId);
            }
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

    const handleAddWebsite = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!newDomain) return;

        const res = await addWebsite(newDomain);
        if (res.error) {
            setError(res.error === 'upgrade_required' ? res.message! : res.error);
            return;
        }

        const sites = await getWebsites();
        setWebsites(sites);
        setSelectedSiteId(res.data.id);
        await loadAuditData(res.data.id);

        setNewDomain("");
        setIsAdding(false);
    };

    const handleRunAudit = async () => {
        if (!activeSite) return;
        setIsScanning(true);
        setError(null);

        const res = await runAudit(activeSite.id, activeSite.domain);
        if (res.error) {
            setError(res.error);
        } else {
            await loadAuditData(activeSite.id);
        }
        setIsScanning(false);
    };

    const changeSelectedSite = async (siteId: string) => {
        setSelectedSiteId(siteId);
        setShowDropdown(false);
        setLoading(true);
        await loadAuditData(siteId);
        setLoading(false);
    };

    if (loading && !selectedSiteId) {
        return (
            <DashboardShell>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-[#c9962a]/20 border-t-[#c9962a] rounded-full animate-spin" />
                        <p className="text-white/30 text-sm animate-pulse">Loading your dashboard...</p>
                    </div>
                </div>
            </DashboardShell>
        );
    }

    if (websites.length === 0 && !isAdding) {
        return (
            <DashboardShell>
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 rounded-3xl bg-[#c9962a]/10 border border-[#c9962a]/20 flex items-center justify-center text-[#c9962a] text-3xl mb-8 shadow-2xl shadow-amber-500/10"
                    >
                        <FaGlobe />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-center mb-3"
                    >
                        Ready to audit your first site?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-white/30 text-center max-w-md mb-10"
                    >
                        Enter your website URL below to start monitoring your SEO health, keywords, and backlinks.
                    </motion.p>
                    <motion.form
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        onSubmit={handleAddWebsite}
                        className="w-full max-w-lg flex flex-col items-center gap-4"
                    >
                        <div className="w-full flex gap-3">
                            <input
                                type="text"
                                placeholder="example.com"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                                className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#c9962a]/50 transition-all shadow-inner shadow-black/20"
                            />
                            <button className="bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20">
                                Start Audit
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                <FaExclamationTriangle /> {error}
                            </p>
                        )}
                    </motion.form>
                </div>
            </DashboardShell>
        );
    }

    const metrics = [
        { label: "SEO Score", value: latestAudit?.score_seo ?? 0, max: 100, unit: "%", color: "#c9962a", bg: "rgba(201,150,42,0.08)", border: "rgba(201,150,42,0.2)" },
        { label: "Performance", value: latestAudit?.score_performance ?? 0, max: 100, unit: "%", color: "#4ade80", bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.18)" },
        { label: "Visibility", value: latestAudit?.raw_data?.search_visibility ?? 85, max: 100, unit: "%", color: "#63b3ed", bg: "rgba(99,179,237,0.07)", border: "rgba(99,179,237,0.18)" },
        { label: "Pages found", value: latestAudit?.raw_data?.metrics?.pages_found ?? 0, max: null, unit: "", color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.18)" },
    ];

    return (
        <DashboardShell>
            <div className="px-6 lg:px-8 py-8">
                {/* Site Selector + URL bar + Add Site */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    <div className="flex-1 max-w-3xl relative" ref={dropdownRef}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            onClick={() => websites.length > 1 && setShowDropdown(!showDropdown)}
                            className={`flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5 transition-all ${websites.length > 1 ? 'cursor-pointer hover:bg-white/[0.05]' : ''}`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-amber-500 animate-spin' : 'bg-[#4ade80] animate-pulse'} flex-shrink-0`} />
                            <span className="font-mono text-[12px] text-white/40 flex-1">{activeSite?.domain || 'No site'}</span>
                            {websites.length > 1 && <FaChevronDown className={`text-[10px] text-white/20 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />}
                            <div className="h-4 w-px bg-white/10" />
                            <button
                                onClick={(e) => { e.stopPropagation(); handleRunAudit(); }}
                                disabled={isScanning}
                                className={`flex items-center gap-2 text-[11px] font-semibold transition-all ${isScanning ? 'text-white/20' : 'text-[#c9962a] hover:text-[#d4a535]'}`}
                            >
                                <FaSync className={isScanning ? 'animate-spin' : ''} />
                                {isScanning ? 'Auditing...' : 'Run New Scan'}
                            </button>
                        </motion.div>

                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-[#12110e] border border-white/[0.07] rounded-2xl overflow-hidden z-50 shadow-2xl"
                                >
                                    <div className="py-2">
                                        {websites.map((site) => (
                                            <button
                                                key={site.id}
                                                onClick={() => changeSelectedSite(site.id)}
                                                className={`w-full text-left px-5 py-3 text-xs font-mono transition-colors flex items-center justify-between ${selectedSiteId === site.id ? 'bg-[#c9962a]/10 text-white' : 'text-white/40 hover:bg-white/[0.03] hover:text-white/70'}`}
                                            >
                                                {site.domain}
                                                {selectedSiteId === site.id && <div className="w-1 h-1 rounded-full bg-[#c9962a]" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait">
                        {isAdding ? (
                            <motion.form
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleAddWebsite}
                                className="flex gap-2"
                            >
                                <input
                                    type="text" autoFocus placeholder="new-site.com" value={newDomain}
                                    onChange={(e) => setNewDomain(e.target.value)}
                                    className="bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#c9962a]/50"
                                />
                                <button type="submit" className="bg-[#c9962a] text-[#0c0b08] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#d4a535]">Add</button>
                                <button type="button" onClick={() => { setIsAdding(false); setError(null); }} className="text-white/30 text-xs px-2">Cancel</button>
                            </motion.form>
                        ) : (
                            <motion.button
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                onClick={() => {
                                    if (profile?.plan === 'free' && websites.length >= 1) {
                                        setError("Free plan limited to 1 site");
                                        setTimeout(() => setError(null), 3000);
                                    } else { setIsAdding(true); }
                                }}
                                className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white/50 hover:text-white px-4 py-3 rounded-2xl transition-all text-sm shrink-0"
                            >
                                <FaPlus className="text-xs" /> Add Site
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-red-500 text-sm">
                            <FaExclamationTriangle />
                            <span>{error}</span>
                        </div>
                        {error.includes('limit') && (
                            <Link href="/Pricing" className="bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-amber-400">
                                Upgrade Now <FaArrowRight />
                            </Link>
                        )}
                    </motion.div>
                )}

                {loading && selectedSiteId ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-8 h-8 border-2 border-[#c9962a]/20 border-t-[#c9962a] rounded-full animate-spin" />
                        <p className="text-white/20 text-[11px] animate-pulse font-mono uppercase tracking-widest">Switching contexts...</p>
                    </div>
                ) : (
                    <>
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
                                            {isScanning ? '--' : m.value}<span className="text-[14px] text-white/30">{m.unit}</span>
                                        </p>
                                    </div>
                                    <div className="mt-3 h-[3px] rounded-full bg-white/[0.07]">
                                        <motion.div
                                            className="h-full rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: isScanning ? '100%' : `${m.value}%` }}
                                            style={{ background: m.color }}
                                            transition={{ duration: isScanning ? 2 : 0.5, repeat: isScanning ? 999999 : 0 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-6">
                            <div className="flex flex-col gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden"
                                >
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                                        <div>
                                            <h2 className="text-[13px] font-semibold text-white">Critical Issues</h2>
                                            <p className="text-[11px] text-white/30 mt-0.5">{auditIssues.length} optimizations suggested</p>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-white/[0.04]">
                                        {auditIssues.length > 0 ? auditIssues.map((issue, i) => (
                                            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group">
                                                <span className={`text-[13px] flex-shrink-0 ${issue.level === 'high' ? 'text-red-400' : 'text-[#c9962a]'}`}>
                                                    {issue.level === 'high' ? <FaTimesCircle /> : <FaExclamationTriangle />}
                                                </span>
                                                <p className="flex-1 text-[12px] text-white/50 group-hover:text-white/70 transition-colors">{issue.text}</p>
                                                <button className="text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all opacity-0 group-hover:opacity-100 bg-white/[0.05] border-white/10 text-white/60">
                                                    View Fix
                                                </button>
                                            </div>
                                        )) : (
                                            <div className="px-6 py-12 text-center">
                                                <p className="text-white/20 text-[12px]">No audit issues found yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                                    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden"
                                >
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                                        <h2 className="text-[13px] font-semibold text-white">Discovered Pages</h2>
                                        <span className="text-[10px] text-[#c9962a] font-bold">{latestAudit?.raw_data?.discovered_pages?.length || 0} Total</span>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto divide-y divide-white/[0.04]">
                                        {latestAudit?.raw_data?.discovered_pages?.map((url: string, i: number) => (
                                            <div key={i} className="px-6 py-3 hover:bg-white/[0.02] transition-colors group flex items-center justify-between">
                                                <span className="text-[11px] text-white/40 font-mono truncate max-w-[80%]">{url}</span>
                                                <button className="text-[10px] text-[#c9962a] opacity-0 group-hover:opacity-100 transition-all">Audit</button>
                                            </div>
                                        )) || (
                                                <div className="px-6 py-8 text-center text-white/20 text-[11px]">No pages discovered via sitemap.</div>
                                            )}
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
                                >
                                    <p className="text-[10px] uppercase tracking-widest font-semibold text-[#c9962a]/60 mb-4">Core Web Vitals</p>
                                    <div className="flex flex-col gap-4">
                                        {latestAudit?.raw_data?.metrics ? Object.entries(latestAudit.raw_data.metrics).map(([key, val]: [string, any]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{key.replace('_', ' ')}</span>
                                                <span className="text-[12px] font-mono font-bold text-[#c9962a]">{val}</span>
                                            </div>
                                        )) : <p className="text-white/20 text-[10px] text-center">Waiting for audit data...</p>}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
                                    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
                                >
                                    <p className="text-[10px] uppercase tracking-widest font-semibold text-[#63b3ed]/60 mb-4">Search Performance</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                                            <p className="text-[18px] font-bold text-white">--</p>
                                            <p className="text-[9px] text-white/30 uppercase font-bold">Total Clicks</p>
                                        </div>
                                        <div className="text-center p-3 rounded-xl bg-white/[0.03]">
                                            <p className="text-[18px] font-bold text-white">--</p>
                                            <p className="text-[9px] text-white/30 uppercase font-bold">Impressions</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white/20 text-center mt-4 italic">Connect Search Console in Settings</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                    className="bg-[#c9962a]/06 border border-[#c9962a]/15 rounded-2xl p-5"
                                >
                                    <p className="text-[10px] uppercase tracking-widest font-semibold text-[#c9962a]/60 mb-3">Health Status</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 text-[12px] text-white/70">
                                            <FaCheckCircle className="text-[#4ade80]" />
                                            <span>HTTPS Enabled</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-white/70">
                                            <FaCheckCircle className={latestAudit?.raw_data?.discovered_pages?.length ? "text-[#4ade80]" : "text-white/20"} />
                                            <span>Sitemap Found</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardShell>
    );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const issues = [
    { dot: "bg-red-400", text: "Missing meta descriptions on 8 pages", tag: "High", tagColor: "bg-red-400/10 text-red-400", blur: false },
    { dot: "bg-amber-400", text: "Images missing alt attributes (23 found)", tag: "Medium", tagColor: "bg-amber-400/10 text-amber-400", blur: false },
    { dot: "bg-green-400", text: "H1 tag hierarchy inconsistent across blog posts", tag: "Low", tagColor: "bg-green-400/10 text-green-400", blur: false },
    { dot: "bg-red-400", text: "Broken internal links detected on homepage", tag: "High", tagColor: "bg-red-400/10 text-red-400", blur: true, opacity: "opacity-35" },
    { dot: "bg-amber-400", text: "Core Web Vitals: LCP above 2.5s threshold", tag: "Medium", tagColor: "bg-amber-400/10 text-amber-400", blur: true, opacity: "opacity-15" },
];

const metrics = [
    { label: "Performance", value: 98, bar: "from-green-400 to-green-500", chip: "Good", chipColor: "bg-green-400/10 text-green-400" },
    { label: "SEO Score", value: 85, bar: "from-amber-400 to-orange-500", chip: "Needs Work", chipColor: "bg-amber-400/10 text-amber-400" },
    { label: "Best Practices", value: 100, bar: "from-sky-400 to-blue-500", chip: "Perfect", chipColor: "bg-sky-400/10 text-sky-400" },
];

export const DashboardMockup = ({ isMockup = true }: { isMockup?: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "relative w-full max-w-2xl flex-shrink-0 select-none",
                isMockup ? "hidden lg:block pointer-events-none" : "block"
            )}
        >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-500/10 blur-2xl pointer-events-none" />

            {/* Shell */}
            <div className="relative rounded-[2rem] bg-[#0f0f11] overflow-hidden border border-white/[0.07] shadow-2xl">

                {/* Top Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-[22px] h-[22px] rounded-[6px] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                <circle cx="5" cy="5" r="3.5" stroke="#fff" strokeWidth="1.5" />
                                <line x1="7.6" y1="7.6" x2="11" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-[13px] font-semibold text-white tracking-tight">SEO-Auditor</span>
                    </div>

                    {/* Nav */}
                    <div className="flex gap-1">
                        {["Overview", "Audit", "Keywords", "Backlinks"].map((item) => (
                            <span
                                key={item}
                                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${item === "Audit"
                                    ? "text-white/85 bg-white/[0.07]"
                                    : "text-white/35"
                                    }`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[11px] font-semibold text-white">
                        VI
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">

                    {/* URL Row */}
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2 font-mono text-[11px] text-white/45">
                            https://example-website.com
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-green-400 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Live
                        </div>
                        <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-semibold px-4 py-2 rounded-lg">
                            Re-scan
                        </button>
                    </div>

                    {/* Score + Metrics Row */}
                    <div className="grid grid-cols-[auto_1fr] gap-4 mb-4">

                        {/* Big Score Ring */}
                        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col items-center justify-center min-w-[110px]">
                            <div className="relative w-20 h-20 mb-2.5">
                                <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                                    <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                                    <circle
                                        cx="40" cy="40" r="32" fill="none"
                                        stroke="url(#scoreGrad)" strokeWidth="6"
                                        strokeDasharray="201" strokeDashoffset="20"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#f5a623" />
                                            <stop offset="100%" stopColor="#e8471e" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-[26px] font-semibold text-white">
                                    92
                                </div>
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                                Overall Score
                            </span>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-3 gap-2">
                            {metrics.map((m) => (
                                <div key={m.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3.5">
                                    <p className="text-[10px] uppercase tracking-wide text-white/40 mb-2">{m.label}</p>
                                    <p className="text-[22px] font-semibold text-white mb-1.5">{m.value}%</p>
                                    <div className="h-[3px] w-full bg-white/[0.07] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${m.bar}`}
                                            style={{ width: `${m.value}%` }}
                                        />
                                    </div>
                                    <span className={`mt-2 inline-block text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${m.chipColor}`}>
                                        {m.chip}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insights Banner */}
                    <div className="flex items-start gap-3 bg-amber-400/[0.06] border border-amber-400/20 rounded-xl p-3.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L8.5 5.5H13L9.5 8L10.5 13L7 10.5L3.5 13L4.5 8L1 5.5H5.5L7 1Z" fill="#f5a623" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-amber-400 mb-0.5">Critical insights found</p>
                            <p className="text-[11px] text-white/45 leading-relaxed">
                                We found <span className="text-white/80 font-medium">12 structural issues</span>.
                                Fixing these could boost your visibility by{" "}
                                <span className="text-white/80 font-medium">24%</span> this month.
                            </p>
                        </div>
                    </div>

                    {/* Issues List */}
                    <div className="flex flex-col gap-1.5">
                        {issues.map((issue, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 ${issue.opacity ?? ""}`}
                                style={issue.blur ? { filter: `blur(${i === 3 ? 1.5 : 2}px)` } : undefined}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${issue.dot}`} />
                                <span className="flex-1 text-[11px] text-white/55">{issue.text}</span>
                                <span className={`text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${issue.tagColor}`}>
                                    {issue.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fade + Unlock CTA */}
                {isMockup && (
                    <div className="relative -mt-14 h-24 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/80 to-transparent flex items-end justify-center pb-5">
                        <span className="bg-amber-400/10 border border-amber-400/30 rounded-full px-5 py-2 text-[11px] font-semibold text-amber-400 backdrop-blur-md">
                            Sign in to unlock all 12 insights
                        </span>
                    </div>
                )}

            </div>
        </motion.div>
    );
};
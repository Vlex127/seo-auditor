"use client";

import { motion } from "framer-motion";

export const DashboardMockup = () => {
    return (
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white p-2 shadow-[0_32px_64px_-12px_rgba(251,191,36,0.15)] flex-shrink-0 hidden lg:block select-none pointer-events-none">
            <div className="absolute -left-20 -top-20 h-64 w-64 bg-yellow-200/40 blur-[100px]" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-50/50 p-6 md:p-8 shadow-inner border border-neutral-100">
                <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between text-left gap-6 xl:gap-0">
                    <div>
                        <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-200/50">
                            Live Analysis
                        </span>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Audit Overview</h3>
                        <p className="font-mono text-xs md:text-sm text-neutral-500">https://example-website.com</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                            <svg className="absolute h-full w-full -rotate-90">
                                <circle cx="50%" cy="50%" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-neutral-200 scale-75 md:scale-100 origin-center" />
                                <circle cx="50%" cy="50%" r="36" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="226" strokeDashoffset="22.6" className="text-amber-400 scale-75 md:scale-100 origin-center" strokeLinecap="round" />
                            </svg>
                            <span className="text-xl md:text-2xl font-bold text-neutral-900">92</span>
                        </div>
                        <div className="space-y-1 text-left">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Global Rank</p>
                            <p className="text-lg md:text-xl font-medium text-amber-500">Excellent</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: "Performance", value: 98, status: "Good", color: "bg-amber-400" },
                        { label: "SEO Score", value: 85, status: "Needs Work", color: "bg-yellow-400" },
                        { label: "Best Practices", value: 100, status: "Perfect", color: "bg-amber-500" },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm text-left"
                        >
                            <p className="text-xs font-medium text-neutral-500">{card.label}</p>
                            <div className="mt-3 flex items-baseline justify-between">
                                <h4 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-900">{card.value}%</h4>
                            </div>
                            <div className="mt-6 h-1 w-full rounded-full bg-neutral-100">
                                <div className={`h-full rounded-full ${card.color} w-3/4`} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl border border-amber-200/50 bg-amber-50/50 p-6 shadow-sm text-left backdrop-blur-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-2xl text-white shadow-md shadow-amber-200/50">✨</div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-700">Critical Insights Found</h4>
                        <p className="mt-1 text-xs md:text-sm leading-relaxed text-neutral-600">
                            We found <span className="font-semibold text-neutral-900">12 structural issues</span>.
                            Fixing these could boost visibility.
                        </p>
                    </div>
                </div>

                {/* Extra Faded Data Row Mockups */}
                <div className="mt-6 grid grid-cols-1 gap-4 opacity-40 blur-[2px]">
                    <div className="h-14 w-full rounded-xl bg-neutral-100 border border-neutral-200 flex items-center px-4">
                        <div className="h-3 w-1/3 bg-neutral-300 rounded" />
                        <div className="ml-auto h-3 w-12 bg-neutral-300 rounded" />
                    </div>
                    <div className="h-14 w-full rounded-xl bg-neutral-100 border border-neutral-200 flex items-center px-4">
                        <div className="h-3 w-1/4 bg-neutral-300 rounded" />
                        <div className="ml-auto h-3 w-12 bg-neutral-300 rounded" />
                    </div>
                    <div className="h-14 w-full rounded-xl bg-neutral-100 border border-neutral-200 flex items-center px-4">
                        <div className="h-3 w-2/5 bg-neutral-300 rounded" />
                        <div className="ml-auto h-3 w-12 bg-neutral-300 rounded" />
                    </div>
                </div>
            </div>

            {/* Fade out mask */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-8 border-b-[6px] border-white">
                <span className="rounded-full border border-amber-200 bg-amber-50/90 px-6 py-2.5 text-sm font-bold text-amber-600 shadow-xl shadow-amber-900/5 backdrop-blur-md pb-[-10px]">
                    Sign in/up to unveil remaining insights
                </span>
            </div>
        </div>
    );
};

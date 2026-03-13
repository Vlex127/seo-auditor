"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";
import {
    FaHome, FaSearch, FaCog, FaLink,
    FaBolt, FaUserCircle, FaBell, FaSignOutAlt
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sparkPoints = [40, 52, 47, 61, 58, 72, 68, 79, 75, 85];

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

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<{ plan: string; avatar_url: string | null } | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (user) {
                setUser(user);
                const { data } = await supabase
                    .from('profiles')
                    .select('plan, avatar_url')
                    .eq('id', user.id)
                    .single();
                setProfile(data);
            }
        });
    }, []);

    const displayName = user?.email?.split("@")[0] ?? "there";

    const navItems = [
        { id: "overview", label: "Overview", icon: <FaHome />, link: "/Dashboard" },
        { id: "keywords", label: "Keywords", icon: <FaSearch />, link: "/Keyword" },
        { id: "backlinks", label: "Backlinks", icon: <FaLink />, link: "/Backlink" },
        { id: "settings", label: "Settings", icon: <FaCog />, link: "/Settings" },
    ];

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
                    {navItems.map(item => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left w-full ${pathname === item.link
                                ? "bg-[#c9962a]/10 text-[#c9962a] border border-[#c9962a]/20"
                                : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"
                                }`}
                        >
                            <span className="text-[12px]">{item.icon}</span>
                            {item.label}
                        </Link>
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
                    <Link href="/Settings" className="flex items-center gap-2.5 px-2 mb-3 hover:bg-white/[0.04] py-2 rounded-xl transition-all group">
                        <div className="w-7 h-7 rounded-full bg-[#c9962a] flex items-center justify-center text-[11px] font-bold text-[#0c0b08] flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                displayName[0]?.toUpperCase()
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[12px] font-medium text-white/80 truncate group-hover:text-white transition-colors">{user?.email ?? "—"}</p>
                            <Link href="/Pricing" className="text-[10px] text-[#c9962a] hover:underline hover:text-[#d4a535] transition-all capitalize">
                                {profile?.plan || 'free'} plan
                            </Link>
                        </div>
                    </Link>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-[12px] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
                    >
                        <FaSignOutAlt className="text-[11px]" /> Sign out
                    </button>
                </div>
            </aside>

            {/* ── Main content ── */}
            <div className="lg:pl-[220px] min-h-screen flex flex-col">

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
                        <Link
                            href="/Pricing"
                            className="flex items-center gap-2 bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] text-[12px] font-bold px-4 py-2 rounded-xl transition-colors"
                        >
                            <FaBolt className="text-[10px]" /> Upgrade
                        </Link>
                    </div>
                </header>

                {/* Body */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}

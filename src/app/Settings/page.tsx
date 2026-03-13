"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
    FaUser,
    FaShieldAlt,
    FaCreditCard,
    FaBell,
    FaGlobe,
    FaArrowLeft,
    FaSignOutAlt
} from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { DashboardShell } from "@/components/dashboard-shell";

export default function Settings() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<{ full_name: string | null; plan: string; avatar_url: string | null } | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (user) {
                setUser(user);
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(data);
            }
        });
    }, []);

    const sections = [
        { id: 'account', label: 'Account', icon: <FaUser /> },
        { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
        { id: 'billing', label: 'Billing', icon: <FaCreditCard /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    ];

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                            <p className="text-white/30 text-sm mt-1">Manage your profile, billing, and system preferences.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
                    {/* Sub-Navigation */}
                    <nav className="flex flex-col gap-1">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${section.id === 'account'
                                    ? "bg-[#c9962a]/10 text-[#c9962a] border border-[#c9962a]/20"
                                    : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"
                                    }`}
                            >
                                <span className="text-[12px]">{section.icon}</span>
                                {section.label}
                            </button>
                        ))}
                    </nav>

                    {/* Content Area */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/[0.02] border border-white/[0.08] rounded-[2rem] overflow-hidden"
                        >
                            <div className="px-8 py-6 border-b border-white/[0.06] bg-white/[0.01]">
                                <h2 className="text-lg font-semibold">Public Profile</h2>
                                <p className="text-white/30 text-xs mt-0.5">Information seen by the system.</p>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="flex items-center gap-8">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-20 h-20 rounded-3xl bg-[#c9962a] flex items-center justify-center text-2xl font-black text-[#0c0b08] shadow-2xl shadow-amber-500/20 group-hover:scale-105 transition-transform overflow-hidden">
                                            {profile?.avatar_url ? (
                                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                user?.email?.[0].toUpperCase()
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center text-[10px] uppercase font-black tracking-widest text-[#c9962a]">
                                            Edit
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold">{profile?.full_name || user?.email?.split('@')[0]}</h3>
                                        <div className="flex items-center gap-2 text-white/40 text-sm">
                                            <FaGlobe className="text-[10px]" />
                                            Active account
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/20">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={profile?.full_name || ""}
                                            placeholder="Add your name"
                                            className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9962a]/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/20">Email Address</label>
                                        <div className="w-full bg-white/[0.01] border border-white/[0.05] rounded-xl px-4 py-3 text-sm text-white/30 cursor-not-allowed">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Subscription Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.08] rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#c9962a]/10 border border-[#c9962a]/20 flex items-center justify-center text-[#c9962a] text-xl">
                                    <FaCreditCard />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg capitalize">{profile?.plan || 'free'} Plan Member</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 px-2 py-0.5 rounded-md border border-green-500/20">Active</span>
                                    </div>
                                    <p className="text-white/30 text-sm mt-1">Manage your payment methods and plans.</p>
                                </div>
                            </div>
                            <Link
                                href="/Pricing"
                                className="bg-[#c9962a] hover:bg-[#d4a535] text-[#0c0b08] text-[12px] font-bold px-6 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Upgrade Plan
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
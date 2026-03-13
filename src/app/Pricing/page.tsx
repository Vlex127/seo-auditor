"use client";

import React, { useEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout, selectPlan } from "@/app/auth/actions";
import Link from "next/link";

export default function Pricing() {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (user) {
                setUser(user);

                // Check if user already has a plan (other than the default 'free' set by DB)
                // If they have any plan set, we might want to skip this on login, 
                // but usually, on FIRST signup we want them to click a plan.
                // We'll check the profile.
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('plan')
                    .eq('id', user.id)
                    .single();

                // If they have already selected a plan (not null and not 'free' if that's the default they just got)
                // However, user said "pricing screen will never show again when a user logs in"
                // So if we find a profile, they have been through here or signed up.
                // Let's check for a flag or if plan is already set.
                if (profile && profile.plan) {
                    // Since we want them to land here on FIRST signup, 
                    // but skip on subsequent logins.
                    // The login action redirects to /Dashboard.
                    // The callback redirects to /Pricing.
                    // So /Pricing is exclusively for onboarding or manual visits.
                }
            }
        });
    }, []);

    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <FaHome className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Features",
            link: "/#features",
            icon: <FaSearch className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Process",
            link: "/#how-it-works",
            icon: <FaChartBar className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Pricing",
            link: "/Pricing",
            icon: <FaCog className="h-4 w-4 text-neutral-500" />,
        },
    ];

    const plans = [
        {
            name: "Starter",
            price: "$0",
            features: ["1 Website Scan", "Basic Insights", "Weekly Reports", "Email Support"],
            cta: "Start Free",
            popular: false,
            id: 'free'
        },
        {
            name: "Professional",
            price: "$49",
            features: ["10 Website Scans", "Deep AI Analysis", "Daily Tracking", "Priority Support", "Competitor Intel"],
            cta: "Go Pro",
            popular: true,
            id: 'pro'
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["Unlimited Scans", "API Access", "Custom Dashboards", "24/7 Dedicated Support", "White-labeling"],
            cta: "Contact Sales",
            popular: false,
            id: 'enterprise'
        }
    ];

    return (
        <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden text-neutral-900">
            {/* MAGIC UI STYLE FLOWING BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-40 blur-[120px]">
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-amber-200 mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-yellow-100 mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                <Meteors number={20} className="before:from-amber-200" />
            </div>

            <FloatingNav navItems={navItems} />

            <section className="container relative z-10 py-32 px-4">
                <div className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-neutral-900 md:text-6xl"
                    >
                        Choose Your Plan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 text-lg text-neutral-600"
                    >
                        Select a package to unlock your full SEO potential and head to your dashboard.
                    </motion.p>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className={`relative flex flex-col rounded-[2.5rem] border p-10 ${plan.popular ? "border-amber-300 bg-amber-50/50 shadow-2xl shadow-amber-200/40" : "border-neutral-200 bg-white"} transition-all hover:scale-[1.02]`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-1 text-xs font-bold text-white shadow-md shadow-amber-200">
                                    MOST POPULAR
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
                            <div className="mt-4 flex items-end gap-1">
                                <span className="text-4xl font-black text-neutral-900">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="mb-1 text-sm text-neutral-500">/mo</span>}
                            </div>
                            <ul className="mt-8 flex flex-col gap-4">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-neutral-600">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => selectPlan(plan.id as any)}
                                className={`mt-10 rounded-2xl py-4 font-bold text-center transition-all active:scale-95 ${plan.popular ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:opacity-90 shadow-lg shadow-amber-200/50" : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"}`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {user && (
                <div className="fixed bottom-10 right-10 z-50">
                    <button
                        onClick={() => logout()}
                        className="rounded-full bg-white/80 hover:bg-white text-neutral-900 px-6 py-2.5 shadow-lg border border-neutral-200 font-bold backdrop-blur-md transition-all active:scale-95"
                    >
                        Logout ({user.email})
                    </button>
                </div>
            )}

            <Footer />
        </main>
    );
}
"use client";

import React, { useEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";
import { DashboardMockup } from "@/components/dashboard-mockup";

export default function Dashboard() {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
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

            <section className="container relative z-10 py-32 px-4 flex flex-col items-center">
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-neutral-900 md:text-5xl"
                    >
                        User Dashboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text text-neutral-600"
                    >
                        Welcome back, {user?.email}. Here are your latest SEO insights.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-5xl"
                >
                    <DashboardMockup isMockup={false} />
                </motion.div>
            </section>

            {user && (
                <div className="fixed bottom-10 right-10 z-50">
                    <button
                        onClick={() => logout()}
                        className="rounded-full bg-white/80 hover:bg-white text-neutral-900 px-6 py-2.5 shadow-lg border border-neutral-200 font-bold backdrop-blur-md transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            )}

            <Footer />
        </main>
    );
}

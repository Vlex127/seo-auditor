"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export default function AuthCodeError() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <FaHome className="h-4 w-4 text-neutral-500" />,
        },
    ];

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden text-neutral-900">
            {/* MAGIC UI STYLE FLOWING BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-40 blur-[120px]">
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-amber-200 mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-yellow-100 mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <FloatingNav navItems={navItems} />

            <section className="container relative z-10 flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-red-100 text-4xl shadow-xl shadow-red-900/10"
                >
                    ⚠️
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-bold text-neutral-900"
                >
                    Authentication Error
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 max-w-md text-lg text-neutral-600"
                >
                    We encountered an issue while verifying your session. The link may have expired or been already used.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                    <Link
                        href="/login"
                        className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-4 font-bold text-white shadow-lg shadow-amber-200/50 transition-all hover:opacity-90 active:scale-95"
                    >
                        Try Logging In Again
                    </Link>
                    <Link
                        href="/"
                        className="rounded-2xl border border-neutral-200 bg-white px-8 py-4 font-bold text-neutral-600 transition-all hover:bg-neutral-50 active:scale-95"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}

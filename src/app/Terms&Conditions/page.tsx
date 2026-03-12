"use client";

import React, { useEffect, useRef } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

export default function Terms() {
    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <FaHome className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Features",
            link: "#features",
            icon: <FaSearch className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Process",
            link: "#how-it-works",
            icon: <FaChartBar className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Pricing",
            link: "#pricing",
            icon: <FaCog className="h-4 w-4 text-neutral-500" />,
        },
    ];

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden text-neutral-900">
            {/* MAGIC UI STYLE FLOWING BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                {/* The "Smoke" layer: Add a blurred, moving mesh */}
                <div className="absolute inset-0 opacity-40 blur-[120px]">
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-amber-200 mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-yellow-100 mix-blend-multiply" />
                </div>

                {/* The Magic UI Noise/Grain */}
                <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Meteors Overlay (Now on top of everything) */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                <Meteors number={20} className="before:from-amber-200" />
            </div>

            <FloatingNav navItems={navItems} />
        </main>

    );
}
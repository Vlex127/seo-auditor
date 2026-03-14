"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaSearch, FaCog, FaChevronRight } from "react-icons/fa";
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
            link: "/#features",
            icon: <FaSearch className="h-4 w-4 text-neutral-500" />,
        },
        {
            name: "Pricing",
            link: "/#pricing",
            icon: <FaCog className="h-4 w-4 text-neutral-500" />,
        },
    ];

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using SEO Auditor, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
        },
        {
            title: "2. Use License",
            content: "Permission is granted to temporarily download one copy of the materials (information or software) on SEO Auditor's website for personal, non-commercial transitory viewing only."
        },
        {
            title: "3. Disclaimer",
            content: "The materials on SEO Auditor's website are provided on an 'as is' basis. SEO Auditor makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
            title: "4. Limitations",
            content: "In no event shall SEO Auditor or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SEO Auditor's website."
        },
        {
            title: "5. Accuracy of Materials",
            content: "The materials appearing on SEO Auditor's website could include technical, typographical, or photographic errors. SEO Auditor does not warrant that any of the materials on its website are accurate, complete or current."
        },
        {
            title: "6. Links",
            content: "SEO Auditor has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SEO Auditor of the site."
        }
    ];

    return (
        <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden text-neutral-900 bg-white">
            {/* MAGIC UI STYLE FLOWING BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-40 blur-[120px]">
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-amber-200 mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-yellow-100 mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Meteors Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                <Meteors number={20} className="before:from-amber-200" />
            </div>

            <FloatingNav navItems={navItems} />

            {/* Header */}
            <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-40 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600"
                >
                    Legal Agreement
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl"
                >
                    Terms of <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">Service</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 text-neutral-500"
                >
                    Last Updated: March 13, 2026
                </motion.p>
            </section>

            {/* Content */}
            <section className="container relative z-10 py-16 px-4">
                <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-[3rem] border border-neutral-100 p-8 md:p-16 shadow-xl">
                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-amber-400 group-hover:scale-150 transition-transform" />
                                    {section.title}
                                </h3>
                                <p className="text-neutral-600 leading-relaxed pl-5 border-l border-neutral-100 group-hover:border-amber-200 transition-colors">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 pt-10 border-t border-neutral-100">
                        <p className="text-sm text-neutral-400 text-center">
                            If you have any questions regarding these terms, please contact us at <span className="text-amber-600 font-bold underline">vincentayokunle@gmail.com</span>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

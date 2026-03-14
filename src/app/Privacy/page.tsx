"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaSearch, FaCog, FaLock, FaShieldAlt, FaDatabase } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

export default function Privacy() {
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
            title: "Information We Collect",
            icon: <FaDatabase className="text-amber-500" />,
            content: "We collect information you provide directly to us when you create an account, use our tools, or communicate with us. This includes your email address, website URLs you audit, and any preferences you set."
        },
        {
            title: "How We Use Your Data",
            icon: <FaShieldAlt className="text-amber-500" />,
            content: "Your data is used to provide, maintain, and improve our services. We use the website URLs you provide to generate SEO reports and track rankings. We never sell your personal information to third parties."
        },
        {
            title: "Data Security",
            icon: <FaLock className="text-amber-500" />,
            content: "We implement industry-standard security measures to protect your information from unauthorized access, loss, or misuse. Our systems are regularly audited for security vulnerabilities."
        },
        {
            title: "Cookies and Tracking",
            icon: <FaDatabase className="text-amber-500" />,
            content: "We use cookies to enhance your experience, remember your preferences, and analyze our traffic. You can control cookie settings through your browser, though some features may not function correctly without them."
        },
        {
            title: "Your Rights",
            icon: <FaShieldAlt className="text-amber-500" />,
            content: "You have the right to access, correct, or delete your personal data at any time. If you wish to exercise these rights, please contact our support team."
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
                    Privacy First
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl"
                >
                    Privacy <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">Policy</span>
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
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white border border-neutral-100 shadow-lg hover:border-amber-200 transition-all flex flex-col items-start text-left"
                            >
                                <div className="text-2xl mb-4 p-3 bg-amber-50 rounded-2xl">{section.icon}</div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-4">{section.title}</h3>
                                <p className="text-neutral-500 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mt-12 p-8 md:p-12 rounded-[3rem] bg-neutral-900 text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 opacity-10" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">Still have questions?</h3>
                        <p className="text-neutral-400 mb-8 relative z-10">
                            Our privacy team is here to help you understand how your data is protected.
                        </p>
                        <a
                            href="mailto:privacy@seoauditor.com"
                            className="inline-block bg-white text-neutral-900 px-8 py-3 rounded-xl font-bold text-sm relative z-10 hover:scale-105 transition-transform"
                        >
                            Contact Privacy Team
                        </a>
                    </motion.div>
                </div>
            </section>

            <div className="pb-24" />
            <Footer />
        </main>
    );
}

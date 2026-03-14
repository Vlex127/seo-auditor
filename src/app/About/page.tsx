"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog, FaRocket, FaEye, FaUsers, FaCode } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export default function About() {
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

            {/* Hero Section */}
            <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-40 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600"
                >
                    ✨ Our Journey
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl"
                >
                    Redefining <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">SEO Intelligence</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 max-w-2xl text-lg text-neutral-600 md:text-xl"
                >
                    We're on a mission to democratize search engine optimization through advanced AI,
                    making premium SEO tools accessible to everyone from solo bloggers to enterprise teams.
                </motion.p>
            </section>

            {/* Story Section */}
            <section className="container relative z-10 py-24 px-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 md:text-5xl mb-6">
                            How it all <span className="text-amber-500">Started</span>
                        </h2>
                        <div className="space-y-4 text-neutral-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2024, SEO Auditor was born out of frustration. Our founders realized that the most powerful
                                SEO tools were either prohibitively expensive or too complex for the average user.
                            </p>
                            <p>
                                We decided to build something different—a tool that combines enterprise-grade AI analysis with a
                                beautiful, intuitive interface that anyone can use to grow their digital presence.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden aspect-square border border-amber-100 bg-amber-50 shadow-2xl"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaRocket className="text-[12rem] text-amber-200 animate-pulse" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-800">2024 Launch</h3>
                            <p className="text-neutral-500 capitalize">Building the future of the web, together.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="container relative z-10 py-24 px-4 bg-neutral-50/50 rounded-[4rem] border border-neutral-100">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 md:text-5xl">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        {
                            title: "Innovation First",
                            desc: "We constantly push the boundaries of what's possible with AI and SEO technology.",
                            icon: <FaCode className="text-amber-500" />
                        },
                        {
                            title: "Radical Transparency",
                            desc: "We believe in clear, actionable insights without the jargon or hidden agendas.",
                            icon: <FaEye className="text-amber-500" />
                        },
                        {
                            title: "User Empowered",
                            desc: "Your success is our success. We build tools that make you the SEO expert.",
                            icon: <FaUsers className="text-amber-500" />
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[2.5rem] bg-white border border-neutral-100 shadow-sm hover:border-amber-200 transition-all"
                        >
                            <div className="text-3xl mb-6">{value.icon}</div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                            <p className="text-neutral-500 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container relative z-10 py-32 px-4 text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-neutral-900 md:text-6xl mb-8">
                    Ready to join the <span className="text-amber-500">Revolution?</span>
                </h2>
                <Link
                    href="/signup"
                    className="inline-block rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-5 font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-amber-200/50"
                >
                    Get Started Today
                </Link>
            </section>

            <Footer />
        </main>
    );
}

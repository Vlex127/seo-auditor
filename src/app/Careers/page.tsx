"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog, FaRocket, FaHeart, FaUsers, FaGlobe } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { PiBriefcaseBold, PiLightningBold, PiStarBold } from "react-icons/pi";

export default function Careers() {
    const navItems = [
        { name: "Home", link: "/", icon: <FaHome className="h-4 w-4 text-neutral-500" /> },
        { name: "Features", link: "/#features", icon: <FaSearch className="h-4 w-4 text-neutral-500" /> },
        { name: "Process", link: "/#how-it-works", icon: <FaChartBar className="h-4 w-4 text-neutral-500" /> },
        { name: "Pricing", link: "/#pricing", icon: <FaCog className="h-4 w-4 text-neutral-500" /> },
    ];

    const positions = [
        {
            title: "Senior AI Engineer",
            department: "Engineering",
            location: "Remote / Hybrid",
            type: "Full-time",
            icon: <PiLightningBold className="text-amber-600" />,
        },
        {
            title: "Product Designer",
            department: "Design",
            location: "Remote",
            type: "Full-time",
            icon: <PiStarBold className="text-amber-500" />,
        },
        {
            title: "Content Strategist",
            department: "Marketing",
            location: "Remote",
            type: "Full-time",
            icon: <FaGlobe className="text-amber-400" />,
        },
        {
            title: "Customer Success Manager",
            department: "Operations",
            location: "Lagos, Nigeria",
            type: "Full-time",
            icon: <FaUsers className="text-orange-500" />,
        }
    ];

    const values = [
        { title: "Innovation First", desc: "We push the boundaries of what's possible in SEO and data analysis.", icon: <FaRocket /> },
        { title: "Remote Culture", desc: "Work from anywhere in the world. We value output over hours.", icon: <FaGlobe /> },
        { title: "Ownership", desc: "Every team member has the autonomy to make high-impact decisions.", icon: <PiStarBold /> },
        { title: "Impact", desc: "Help thousands of businesses grow their digital presence daily.", icon: <PiBriefcaseBold /> },
    ];

    return (
        <main className="relative min-h-screen bg-white text-neutral-900 selection:bg-amber-100">
            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-40 blur-[130px]">
                    <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-amber-200 animate-pulse mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full bg-yellow-100 animate-pulse mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <Meteors number={15} className="before:from-amber-400/20" />
            </div>

            <FloatingNav navItems={navItems} />

            {/* Hero Section */}
            <section className="relative px-6 pt-40 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-4xl"
                >
                    <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mb-6 font-mono">
                        Join the Revolution
                    </span>
                    <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-7xl text-neutral-900 leading-[0.9]">
                        Build the Future of <br />
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">Digital Intelligence</span>
                    </h1>
                    <p className="mt-8 text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        We are a team of dreamers, engineers, and designers obsessed with making the web faster and more accessible. Join us in our mission to democratize SEO intelligence.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="px-6 py-20 relative z-10">
                <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-white border border-neutral-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-xl mb-6 group-hover:scale-110 transition-transform">
                                {v.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-neutral-900">{v.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Jobs Section */}
            <section className="px-6 py-24 bg-neutral-50/30 border-y border-neutral-100 relative z-10">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-neutral-900">Open Positions</h2>
                        <p className="text-neutral-500">Don't see your role? We're always looking for talent. Email us at <span className="text-amber-600 font-bold underline cursor-pointer">careers@seoauditor.com</span></p>
                    </div>

                    <div className="space-y-4">
                        {positions.map((pos, i) => (
                            <motion.div
                                key={pos.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex items-center justify-between p-7 rounded-[2rem] bg-white border border-neutral-100 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-900/5 transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-2xl group-hover:bg-amber-50 transition-colors">
                                        {pos.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold group-hover:text-amber-600 transition-colors text-neutral-900">{pos.title}</h3>
                                        <div className="flex gap-4 mt-1.5 font-mono">
                                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{pos.department}</span>
                                            <span className="text-[10px] uppercase font-bold text-neutral-300 tracking-widest">•</span>
                                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{pos.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:block relative z-10">
                                    <span className="px-6 py-3 rounded-2xl bg-neutral-900 text-white text-[11px] font-black uppercase tracking-widest group-hover:bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all">
                                        Apply Now
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Banner */}
            <section className="px-6 py-24 relative overflow-hidden">
                <div className="mx-auto max-w-5xl rounded-[3.5rem] p-12 sm:p-20 bg-gradient-to-br from-amber-400 to-yellow-600 relative overflow-hidden text-neutral-900 text-center shadow-2xl shadow-amber-500/20">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-10">Why you'll love it here</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {[
                                { t: "Remote Ready", i: <FaGlobe className="text-neutral-900/60" /> },
                                { t: "Health Care", i: <FaHeart className="text-neutral-900/60" /> },
                                { t: "Equity Share", i: <PiStarBold className="text-neutral-900/60" /> },
                                { t: "Learning Budget", i: <PiLightningBold className="text-neutral-900/60" /> },
                            ].map(b => (
                                <div key={b.t} className="flex flex-col items-center gap-4 group">
                                    <div className="text-4xl group-hover:scale-125 transition-transform">{b.i}</div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{b.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
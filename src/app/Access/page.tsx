"use client";

import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog, FaCode, FaRobot, FaDatabase, FaShieldAlt } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { PiTerminalBold, PiCpuBold, PiKeyBold, PiCheckBold, PiCopyBold } from "react-icons/pi";
import { cn } from "@/lib/utils";

export default function Access() {
    const [copied, setCopied] = useState(false);
    const navItems = [
        { name: "Home", link: "/", icon: <FaHome className="h-4 w-4 text-neutral-500" /> },
        { name: "Features", link: "/#features", icon: <FaSearch className="h-4 w-4 text-neutral-500" /> },
        { name: "Process", link: "/#how-it-works", icon: <FaChartBar className="h-4 w-4 text-neutral-500" /> },
        { name: "Pricing", link: "/#pricing", icon: <FaCog className="h-4 w-4 text-neutral-500" /> },
    ];

    const codeSnippet = `const seo = require('seo-auditor-sdk');

const auditor = new seo.Client({
  apiKey: 'YOUR_ACCESS_KEY',
  environment: 'production'
});

// Run a deep site audit
const audit = await auditor.sites.runAudit({
  url: 'https://example.com',
  depth: 3,
  checks: ['performance', 'seo', 'security']
});

console.log('SEO Score:', audit.scores.total);`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const features = [
        { title: "Real-time Crawling", desc: "Our engine fetches and analyzes pages in milliseconds using distributed clusters.", icon: <FaRobot className="text-amber-600" /> },
        { title: "Universal Access", desc: "Available via RESTful API, GraphQL, and specialized Webhook integrations.", icon: <FaCode className="text-amber-600" /> },
        { title: "Data Integrity", desc: "Get raw, unpolluted data directly from our massive proprietary index.", icon: <FaDatabase className="text-amber-600" /> },
        { title: "Enterprise Security", desc: "AES-256 encryption and granular API key permissions for high-security environments.", icon: <FaShieldAlt className="text-amber-600" /> },
    ];

    return (
        <main className="relative min-h-screen bg-white text-neutral-900 selection:bg-amber-100">
            {/* MAGIC UI STYLE FLOWING BACKGROUND */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
                <div className="absolute inset-0 opacity-40 blur-[130px]">
                    <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-amber-200 animate-pulse mix-blend-multiply" />
                    <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-yellow-100 animate-pulse mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <Meteors number={15} className="before:from-amber-200" />
            </div>

            <FloatingNav navItems={navItems} />

            {/* Hero Section */}
            <section className="relative px-6 pt-40 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto max-w-4xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600">
                            <PiCpuBold className="text-sm" /> Infrastructure Status: <span className="text-emerald-500 animate-pulse">Operational</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-[80px] leading-[0.9] text-neutral-900">
                        The Data Layer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 italic">For Modern Apps</span>
                    </h1>
                    <p className="mt-8 text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Integrate enterprise-grade SEO intelligence directly into your workflow. Build audit tools, keyword trackers, and internal dashboards with our high-performance API.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button className="bg-neutral-900 text-white font-black px-8 py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-900/10">
                            Get API Credentials
                        </button>
                        <button className="bg-white border border-neutral-200 text-neutral-900 font-black px-8 py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center gap-2">
                            <PiTerminalBold className="text-sm" /> View Documentation
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Code Block Section */}
            <section className="px-6 py-12 relative z-10 w-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl rounded-[2.5rem] border border-neutral-100 bg-white shadow-[0_32px_100px_rgba(201,150,42,0.12)] overflow-hidden"
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-50 bg-neutral-50/30">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/30" />
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.2em]">quick_start.js</div>
                        <button
                            onClick={handleCopy}
                            className="text-neutral-400 hover:text-amber-600 transition-colors p-1"
                        >
                            {copied ? <PiCheckBold className="text-emerald-500" /> : <PiCopyBold />}
                        </button>
                    </div>
                    <div className="p-8 font-mono text-[13px] leading-relaxed overflow-x-auto bg-white">
                        <pre className="text-neutral-700">
                            {codeSnippet.split('\n').map((line, i) => {
                                let coloredLine = line;
                                if (line.includes('require')) coloredLine = line.replace('require', '<span class="text-amber-600">require</span>');
                                if (line.includes('const')) coloredLine = coloredLine.replace('const', '<span class="text-blue-500">const</span>');
                                if (line.includes('await')) coloredLine = coloredLine.replace('await', '<span class="text-purple-600">await</span>');
                                if (line.includes('\'')) coloredLine = coloredLine.replace(/'[^']*'/g, '<span class="text-emerald-600">$&</span>');
                                return (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-neutral-300 text-right w-4 shrink-0">{i + 1}</span>
                                        <span dangerouslySetInnerHTML={{ __html: coloredLine }} />
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                </motion.div>
            </section>

            {/* Features Row */}
            <section className="px-6 py-24 relative z-10">
                <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-[2rem] border border-neutral-100 bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all"
                        >
                            <div className="mb-6 w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl text-amber-600 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-neutral-900">{f.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Key Section */}
            <section className="px-6 py-20 border-y border-neutral-100 bg-neutral-50/30 relative z-10">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold uppercase tracking-widest text-amber-600 mb-6">
                            <PiKeyBold /> Identity Management
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 text-neutral-900 leading-tight">Built for <br />Enterprise scale</h2>
                        <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                            Scale without friction. Our API management system allows you to generate multiple keys, set rate limits, and monitor usage in real-time.
                        </p>
                        <div className="flex flex-col gap-4">
                            {[
                                "99.99% Uptime SLA",
                                "Zero-latency globally via Edge nodes",
                                "Unlimited concurrent requests",
                                "Dedicated support engineers"
                            ].map(item => (
                                <div key={item} className="flex items-center gap-3 text-sm text-neutral-600">
                                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px]">
                                        <PiCheckBold />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <div className="relative w-full max-w-sm aspect-square">
                            <div className="absolute inset-0 bg-amber-200/20 blur-[100px] rounded-full" />
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative rounded-[2.5rem] border border-neutral-100 bg-white p-8 shadow-2xl shadow-amber-900/5"
                            >
                                <div className="flex items-center justify-between mb-10">
                                    <div className="text-[10px] uppercase font-bold text-neutral-300 tracking-[0.2em]">Active Keys</div>
                                    <button className="text-[10px] font-bold text-amber-600 tracking-widest uppercase hover:underline">Create New</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: "Main App Production", val: "sk_live_2837...9283" },
                                        { name: "Dev Testing Node", val: "sk_test_1029...7721" },
                                        { name: "Mobile Client SDK", val: "sk_live_5561...0012" }
                                    ].map((k, i) => (
                                        <div key={k.name} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 group cursor-pointer hover:border-amber-200 transition-all">
                                            <div className="text-[10px] text-neutral-400 mb-1 font-medium">{k.name}</div>
                                            <div className="font-mono text-[11px] text-neutral-600 truncate">{k.val}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
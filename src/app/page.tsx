"use client";

import React, { useEffect, useRef } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

export default function Home() {

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Features",
      link: "#features",
      icon: <FaSearch className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Process",
      link: "#how-it-works",
      icon: <FaChartBar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Pricing",
      link: "#pricing",
      icon: <FaCog className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-white dark:bg-[#030303]">
      {/* MAGIC UI STYLE FLOWING BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* The "Smoke" layer: Add a blurred, moving mesh */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20 blur-[120px]">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-500 mix-blend-multiply" />
        </div>

        {/* The Magic UI Noise/Grain */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Meteors Overlay */}
        <Meteors number={20} />
      </div>

      <FloatingNav navItems={navItems} />

      {/* Hero Section */}
      <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
 <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // Added 'uppercase' and 'tracking-widest' for that Espada number/rank vibe
          className="mb-4 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400"
        >
          🚀 The Future of SEO is Here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          // Added 'uppercase' and adjusted tracking to match Kubo's style cards
          className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl dark:text-white"
        >
          Optimize Your <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent italic tracking-normal">Digital Presence</span> with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400"
        >
          Supercharge your rankings with our all-in-one SEO auditor. Get real-time insights,
          automated fixes, and competitor analysis in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex w-full max-w-md items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-black/5 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
        >
          <input
            type="url"
            placeholder="Enter your website URL (e.g., example.com)"
            className="flex-1 bg-transparent px-4 py-2 text-neutral-900 outline-none placeholder:text-neutral-500 dark:text-white"
          />
          <button className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-95">
            Audit Now
          </button>
        </motion.div>

        {/* Improved Dashboard mockup from previous step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20 w-full max-w-5xl"
        >
          <div className="group/card relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white p-2 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-zinc-950">
            <div className="absolute -left-20 -top-20 h-64 w-64 bg-emerald-500/10 blur-[100px] transition-opacity group-hover/card:opacity-100" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-50/50 p-8 dark:bg-white/[0.02]">
              <div className="mb-12 flex items-end justify-between text-left">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Live Analysis
                  </span>
                  <h3 className="text-3xl font-semibold tracking-tight dark:text-white">Audit Overview</h3>
                  <p className="font-mono text-sm text-neutral-400">https://example-website.com</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <svg className="absolute h-full w-full -rotate-90">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-neutral-200 dark:text-white/5" />
                      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="226" strokeDashoffset="22.6" className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <span className="text-2xl font-bold dark:text-white">92</span>
                  </div>
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Global Rank</p>
                    <p className="text-xl font-medium text-emerald-500">Excellent</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { label: "Performance", value: 98, status: "Good", color: "bg-emerald-500" },
                  { label: "SEO Score", value: 85, status: "Needs Work", color: "bg-orange-500" },
                  { label: "Best Practices", value: 100, status: "Perfect", color: "bg-sky-500" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-500/30 dark:border-white/5 dark:bg-zinc-900 text-left"
                  >
                    <p className="text-xs font-medium text-neutral-500">{card.label}</p>
                    <div className="mt-3 flex items-baseline justify-between">
                      <h4 className="text-3xl font-bold tracking-tighter dark:text-white">{card.value}%</h4>
                      <span className={`text-[10px] font-bold ${card.status === "Needs Work" ? "text-orange-500" : "text-emerald-500"}`}>
                        {card.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-6 h-1 w-full rounded-full bg-neutral-100 dark:bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${card.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={`h-full rounded-full ${card.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-6 backdrop-blur-md text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-2xl">🔥</div>
                <div>
                  <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400">Critical Insights Found</h4>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    We found <span className="font-semibold text-neutral-900 dark:text-white">12 structural issues</span>.
                    Fixing these could boost visibility by <span className="text-emerald-500 font-bold">24%</span> this month.
                  </p>
                </div>
                <button className="ml-auto shrink-0 rounded-lg bg-white px-4 py-2 text-xs font-bold shadow-sm ring-1 ring-neutral-200 transition-all hover:bg-neutral-50 dark:bg-white/5 dark:text-white dark:ring-white/10">Fix Issues</button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold dark:text-white md:text-5xl">Our Core Features</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Everything you need to dominate the search results.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI Analysis",
              desc: "Deep-dive into your site's structure with our proprietary AI that identifies ranking bottlenecks.",
              icon: <div className="rounded-lg bg-blue-500/10 p-3 text-blue-600"><FaSearch className="h-6 w-6" /></div>
            },
            {
              title: "Keyword Tracker",
              desc: "Real-time tracking of your most valuable keywords across all major search engines.",
              icon: <div className="rounded-lg bg-teal-500/10 p-3 text-teal-600"><FaChartBar className="h-6 w-6" /></div>
            },
            {
              title: "Backlink Audit",
              desc: "Monitor your backlink profile and identify toxic links before they harm your ranking.",
              icon: <div className="rounded-lg bg-purple-500/10 p-3 text-purple-600"><FaCog className="h-6 w-6" /></div>
            },
            {
              title: "Mobile First",
              desc: "Complete mobile auditing to ensure your site is fast and responsive on every device.",
              icon: <div className="rounded-lg bg-orange-500/10 p-3 text-orange-600"><FaHome className="h-6 w-6" /></div>
            },
            {
              title: "Speed Insights",
              desc: "Advanced performance metrics and actionable tips to shave seconds off your load time.",
              icon: <div className="rounded-lg bg-red-500/10 p-3 text-red-600"><FaChartBar className="h-6 w-6" /></div>
            },
            {
              title: "Competitor Intel",
              desc: "See exactly what your rivals are doing and find the gaps in their strategy.",
              icon: <div className="rounded-lg bg-green-500/10 p-3 text-green-600"><FaSearch className="h-6 w-6" /></div>
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group/feature relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 transition-all hover:shadow-2xl hover:shadow-black/5 dark:border-white/5 dark:bg-black dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-opacity group-hover/feature:opacity-100" />
              {feature.icon}
              <h3 className="mt-6 text-xl font-bold dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="container relative z-10 py-24 px-4 overflow-hidden text-center">
        <div className="mb-16">
          <h2 className="text-3xl font-bold dark:text-white md:text-5xl">Simple 3-Step Process</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Transform your SEO strategy in minutes, not months.</p>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
          <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10 md:block" />
          {[
            { step: "01", title: "Scan Your Website", desc: "Enter your domain and our AI-powered crawler will analyze every corner of your site." },
            { step: "02", title: "Get Insights", desc: "Receive a comprehensive report with prioritized fixes and actionable ranking tips." },
            { step: "03", title: "Dominate Rankings", desc: "Implement the fixes and watch your visibility climb as search engines reward your site." }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-white text-2xl font-black text-blue-600 shadow-xl dark:bg-neutral-900 transition-transform hover:scale-110">
                {item.step}
              </div>
              <h3 className="mt-8 text-xl font-bold dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container relative z-10 py-24 px-4">
        <div className="group/cta relative overflow-hidden rounded-[3rem] border border-neutral-200 bg-neutral-900 px-8 py-20 text-center dark:border-white/10">
          <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-40" />
          <h2 className="text-3xl font-bold text-white md:text-5xl">Ready to scale your organic traffic?</h2>
          <p className="mx-auto mt-6 max-w-xl text-neutral-400 md:text-lg">
            Join 10,000+ marketers and business owners who use SEO-Auditor to stay ahead of the curve.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-2xl bg-white px-8 py-4 font-bold text-black transition-all hover:scale-105 active:scale-95">
              Get Started for Free
            </button>
            <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold dark:text-white md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Choose the plan that fits your growth goals.</p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "$0",
              features: ["1 Website Scan", "Basic Insights", "Weekly Reports", "Email Support"],
              cta: "Start Free",
              popular: false
            },
            {
              name: "Professional",
              price: "$49",
              features: ["10 Website Scans", "Deep AI Analysis", "Daily Tracking", "Priority Support", "Competitor Intel"],
              cta: "Go Pro",
              popular: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: ["Unlimited Scans", "API Access", "Custom Dashboards", "24/7 Dedicated Support", "White-labeling"],
              cta: "Contact Sales",
              popular: false
            }
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-[2.5rem] border p-10 ${plan.popular ? "border-blue-500 bg-blue-500/5 shadow-2xl shadow-blue-500/10" : "border-neutral-200 bg-white dark:border-white/5 dark:bg-black"} transition-all hover:scale-[1.02]`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-black dark:text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="mb-1 text-sm text-neutral-500">/mo</span>}
              </div>
              <ul className="mt-8 flex flex-col gap-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-10 rounded-2xl py-4 font-bold transition-all active:scale-95 ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-neutral-200 bg-neutral-50 text-neutral-900 transition-all hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

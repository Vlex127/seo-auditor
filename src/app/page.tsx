"use client";

import React, { useEffect, useRef } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { AnimatePresence, motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";

export default function Home() {
  const [auditUrl, setAuditUrl] = React.useState("");
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;

    setIsScanning(true);
    setError(null);
    setScanResult(null);

    // Clean URL
    const domain = auditUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

    try {
      const { runGuestAudit } = await import('@/app/Dashboard/audit-actions');
      const res = await runGuestAudit(domain);

      if (res.success) {
        setScanResult({ ...res, domain });
        // Store for signup
        localStorage.setItem('pending_audit_domain', domain);
      } else {
        setError(res.error || "Could not complete audit. Please check the URL.");
      }
    } catch (err) {
      setError("Failed to connect to audit engine.");
    } finally {
      setIsScanning(false);
    }
  };

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
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-24 h-24 relative mb-8">
              <motion.div
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 border-[6px] border-amber-100 border-t-amber-400 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-amber-500 text-2xl">
                <FaSearch className="animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mb-2">Analyzing <span className="text-amber-500">{auditUrl}</span></h2>
            <p className="text-neutral-500 max-w-sm">Our AI is fetching performance scores, SEO metrics, and accessibility audits. This takes about 10-15 seconds...</p>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Hero Section */}
      <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500"
        >
          🚀 The Future of SEO is Here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl"
        >
          Optimize Your <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">Digital Presence</span> with AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl"
        >
          Supercharge your rankings with our all-in-one SEO auditor. Get real-time insights,
          automated fixes, and competitor analysis in seconds.
        </motion.p>

        <motion.form
          onSubmit={handleAudit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex w-full max-w-md items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-amber-900/5 focus-within:ring-2 focus-within:ring-amber-200"
        >
          <input
            type="url"
            value={auditUrl}
            onChange={(e) => setAuditUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., example.com)"
            required
            className="flex-1 bg-transparent px-4 py-2 text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-2.5 font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-md shadow-amber-200/50"
          >
            Audit Now
          </button>
        </motion.form>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-500 text-sm font-medium">{error}</motion.p>
        )}

        {/* Sneak Peek Results */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 w-full max-w-4xl bg-white border border-amber-200 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative"
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="text-left flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-white text-xl">
                      <FaChartBar />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{scanResult.domain}</h3>
                      <p className="text-neutral-400 text-xs font-mono">Partial Audit Results Collected</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Performance", val: scanResult.scores.performance },
                      { label: "SEO", val: scanResult.scores.seo },
                      { label: "Accessibility", val: scanResult.scores.accessibility },
                      { label: "Best Practices", val: scanResult.scores.best_practices },
                    ].map(s => (
                      <div key={s.label} className="bg-neutral-50 px-4 py-3 rounded-2xl border border-neutral-100">
                        <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">{s.label}</p>
                        <p className={`text-2xl font-black ${s.val > 80 ? 'text-green-500' : s.val > 50 ? 'text-amber-500' : 'text-red-500'}`}>{s.val}%</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xs uppercase font-black tracking-[0.2em] text-neutral-400 mb-4">Critical Issues Found ({scanResult.issuesCount})</h4>
                    <div className="space-y-3">
                      {scanResult.topIssues.map((issue: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                          <div className={`w-2 h-2 rounded-full ${issue.level === 'high' ? 'bg-red-400' : 'bg-amber-400'}`} />
                          {issue.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 bg-neutral-900 rounded-[2rem] p-8 flex flex-col justify-center text-center relative overflow-hidden text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 opacity-20" />
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">Unlock Full Audit</h4>
                  <p className="text-neutral-400 text-sm mb-8 relative z-10">Sign up now to get the full report, fix recommendations, and track your progress over time.</p>
                  <Link
                    href="/signup"
                    className="bg-white text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all relative z-10 shadow-xl"
                  >
                    Claim Full Access
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Improved Dashboard mockup from previous step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20 w-full max-w-5xl"
        >
          <div className="group/card relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white p-2 shadow-[0_32px_64px_-12px_rgba(251,191,36,0.15)]">
            <div className="absolute -left-20 -top-20 h-64 w-64 bg-yellow-200/40 blur-[100px] transition-opacity group-hover/card:opacity-100" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-50/50 p-8 shadow-inner border border-neutral-100">
              <div className="mb-12 flex items-end justify-between text-left">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-200/50">
                    Live Analysis
                  </span>
                  <h3 className="text-3xl font-semibold tracking-tight text-neutral-900">Audit Overview</h3>
                  <p className="font-mono text-sm text-neutral-500">https://example-website.com</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <svg className="absolute h-full w-full -rotate-90">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-neutral-200" />
                      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="226" strokeDashoffset="22.6" className="text-amber-400" strokeLinecap="round" />
                    </svg>
                    <span className="text-2xl font-bold text-neutral-900">92</span>
                  </div>
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Global Rank</p>
                    <p className="text-xl font-medium text-amber-500">Excellent</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { label: "Performance", value: 98, status: "Good", color: "bg-amber-400" },
                  { label: "SEO Score", value: 85, status: "Needs Work", color: "bg-yellow-400" },
                  { label: "Best Practices", value: 100, status: "Perfect", color: "bg-amber-500" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-colors hover:border-amber-200 text-left"
                  >
                    <p className="text-xs font-medium text-neutral-500">{card.label}</p>
                    <div className="mt-3 flex items-baseline justify-between">
                      <h4 className="text-3xl font-bold tracking-tighter text-neutral-900">{card.value}%</h4>
                      <span className={`text-[10px] font-bold ${card.status === "Needs Work" ? "text-yellow-600" : "text-amber-600"}`}>
                        {card.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-6 h-1 w-full rounded-full bg-neutral-100">
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
              <div className="mt-8 flex items-center gap-6 rounded-2xl border border-amber-200/50 bg-amber-50/50 p-6 shadow-sm text-left backdrop-blur-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-2xl text-white shadow-md shadow-amber-200/50">✨</div>
                <div>
                  <h4 className="text-sm font-bold text-amber-700">Critical Insights Found</h4>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    We found <span className="font-semibold text-neutral-900">12 structural issues</span>.
                    Fixing these could boost visibility by <span className="text-amber-600 font-bold">24%</span> this month.
                  </p>
                </div>
                <button className="ml-auto shrink-0 rounded-lg bg-white px-4 py-2 text-xs font-bold shadow-sm ring-1 ring-neutral-200 transition-all hover:bg-neutral-50 text-neutral-900">Fix Issues</button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Our Core Features</h2>
          <p className="mt-4 text-neutral-600">Everything you need to dominate the search results.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI Analysis",
              desc: "Deep-dive into your site's structure with our proprietary AI that identifies ranking bottlenecks.",
              icon: <div className="rounded-lg bg-amber-100 p-3 text-amber-600"><FaSearch className="h-6 w-6" /></div>
            },
            {
              title: "Keyword Tracker",
              desc: "Real-time tracking of your most valuable keywords across all major search engines.",
              icon: <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600"><FaChartBar className="h-6 w-6" /></div>
            },
            {
              title: "Backlink Audit",
              desc: "Monitor your backlink profile and identify toxic links before they harm your ranking.",
              icon: <div className="rounded-lg bg-amber-50 p-3 text-amber-700"><FaCog className="h-6 w-6" /></div>
            },
            {
              title: "Mobile First",
              desc: "Complete mobile auditing to ensure your site is fast and responsive on every device.",
              icon: <div className="rounded-lg bg-yellow-50 p-3 text-yellow-700"><FaHome className="h-6 w-6" /></div>
            },
            {
              title: "Speed Insights",
              desc: "Advanced performance metrics and actionable tips to shave seconds off your load time.",
              icon: <div className="rounded-lg bg-amber-100 p-3 text-amber-500"><FaChartBar className="h-6 w-6" /></div>
            },
            {
              title: "Competitor Intel",
              desc: "See exactly what your rivals are doing and find the gaps in their strategy.",
              icon: <div className="rounded-lg bg-yellow-100 p-3 text-yellow-500"><FaSearch className="h-6 w-6" /></div>
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group/feature relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 transition-all hover:shadow-xl hover:shadow-amber-900/5 hover:border-amber-200"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-100 blur-2xl transition-opacity opacity-0 group-hover/feature:opacity-100" />
              {feature.icon}
              <h3 className="mt-6 text-xl font-bold text-neutral-900">{feature.title}</h3>
              <p className="mt-3 text-neutral-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="container relative z-10 py-24 px-4 overflow-hidden text-center">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Simple 3-Step Process</h2>
          <p className="mt-4 text-neutral-600">Transform your SEO strategy in minutes, not months.</p>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
          <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200 to-transparent md:block" />
          {[
            { step: "01", title: "Scan Your Website", desc: "Enter your domain and our AI-powered crawler will analyze every corner of your site." },
            { step: "02", title: "Get Insights", desc: "Receive a comprehensive report with prioritized fixes and actionable ranking tips." },
            { step: "03", title: "Dominate Rankings", desc: "Implement the fixes and watch your visibility climb as search engines reward your site." }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200 bg-white text-2xl font-black text-amber-500 shadow-xl shadow-amber-900/5 transition-transform hover:scale-110">
                {item.step}
              </div>
              <h3 className="mt-8 text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container relative z-10 py-24 px-4">
        <div className="group/cta relative overflow-hidden rounded-[3rem] border border-amber-200 bg-neutral-50 px-8 py-20 text-center shadow-2xl shadow-amber-900/10">
          <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-200 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-200 blur-[100px]" />
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Ready to scale your organic traffic?</h2>
          <p className="mx-auto mt-6 max-w-xl text-neutral-600 md:text-lg">
            Join 10,000+ marketers and business owners who use SEO-Auditor to stay ahead of the curve.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-4 font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-amber-200/50"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-amber-200 bg-white px-8 py-4 font-bold text-amber-600 transition-all hover:bg-neutral-50 active:scale-95"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-neutral-600">Choose the plan that fits your growth goals.</p>
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
              <Link
                href="/login"
                className={`mt-10 rounded-2xl py-4 font-bold text-center transition-all active:scale-95 ${plan.popular ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:opacity-90 shadow-lg shadow-amber-200/40" : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

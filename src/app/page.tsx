"use client";

import React, { useEffect, useRef, useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaChartBar, FaSearch, FaCog } from "react-icons/fa";
import { Footer } from "@/components/ui/footer";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Mockup sub-components ────────────────────────────────────────────────────

const sparkPts = [38, 42, 39, 51, 48, 60, 55, 67, 63, 74, 70, 85];

function AnimatedNumber({ target, duration = 1100 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{val}</span>;
}

function ScoreRing({ score }: { score: number }) {
  const r = 38, circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setOffset(circ - (score / 100) * circ), 300);
    return () => clearTimeout(t);
  }, [inView, circ, score]);
  return (
    <div ref={ref} className="relative w-[100px] h-[100px]">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * 2 * Math.PI;
          return (
            <line key={i}
              x1={50 + (r - 4) * Math.cos(a)} y1={50 + (r - 4) * Math.sin(a)}
              x2={50 + (r + 4) * Math.cos(a)} y2={50 + (r + 4) * Math.sin(a)}
              stroke="rgba(201,150,42,0.1)" strokeWidth="1"
            />
          );
        })}
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#rg)" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9962a" />
            <stop offset="100%" stopColor="#f0d080" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[24px] font-bold text-white leading-none">
          <AnimatedNumber target={score} />
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#c9962a]/60 mt-0.5">score</span>
      </div>
    </div>
  );
}

function Sparkline() {
  const W = 120, H = 28;
  const mn = Math.min(...sparkPts), mx = Math.max(...sparkPts);
  const xs = sparkPts.map((_, i) => (i / (sparkPts.length - 1)) * W);
  const ys = sparkPts.map(p => H - ((p - mn) / (mx - mn + 1)) * H);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9962a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c9962a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#sg)" />
      <path d={line} fill="none" stroke="#c9962a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1].toFixed(1)} cy={ys[ys.length - 1].toFixed(1)} r="2.5" fill="#c9962a" />
    </svg>
  );
}

const mockMetrics = [
  { label: "Performance", value: 98, bar: "from-emerald-400 to-teal-400", chip: "Excellent", chipCls: "bg-emerald-400/10 text-emerald-400" },
  { label: "SEO", value: 85, bar: "from-amber-400 to-orange-400", chip: "Needs work", chipCls: "bg-amber-400/10 text-amber-400" },
  { label: "Practices", value: 100, bar: "from-sky-400 to-indigo-400", chip: "Perfect", chipCls: "bg-sky-400/10 text-sky-300" },
];

const mockIssues = [
  { dot: "bg-red-400", text: "Missing meta descriptions on 8 pages", tag: "High", cls: "bg-red-400/10 text-red-400", blur: false },
  { dot: "bg-amber-400", text: "Images missing alt attributes — 23 found", tag: "Medium", cls: "bg-amber-400/10 text-amber-400", blur: false },
  { dot: "bg-green-400", text: "H1 hierarchy inconsistent across blog posts", tag: "Low", cls: "bg-green-400/10 text-green-400", blur: false },
  { dot: "bg-red-400", text: "Broken internal links detected on homepage", tag: "High", cls: "bg-red-400/10 text-red-400", blur: true, opacity: "opacity-40" },
  { dot: "bg-amber-400", text: "Core Web Vitals: LCP above 2.5s threshold", tag: "Medium", cls: "bg-amber-400/10 text-amber-400", blur: true, opacity: "opacity-15" },
];

function HeroDashboardMockup() {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full">
      {/* Outer ambient glow */}
      <div className="absolute -inset-10 pointer-events-none overflow-hidden rounded-[3rem]">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-orange-700/08 rounded-full blur-3xl" />
      </div>

      {/* Shell */}
      <div className="relative rounded-[1.75rem] bg-[#0c0b08] border border-white/[0.08] shadow-[0_48px_120px_rgba(0,0,0,0.65)] overflow-hidden">

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Gold top hairline */}
        <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#c9962a]/70 to-transparent" />

        {/* ── Topbar ── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[7px] bg-[#c9962a] flex items-center justify-center shadow-[0_0_12px_rgba(201,150,42,0.5)]">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="#0c0b08" strokeWidth="1.5" />
                <line x1="7.6" y1="7.6" x2="11" y2="11" stroke="#0c0b08" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[13px] font-bold text-[#f0d080] tracking-tight">SEO-Auditor</span>
          </div>

          <div className="flex gap-0.5 bg-white/[0.04] rounded-lg p-0.5">
            {["Overview", "Audit", "Keywords", "Backlinks"].map(item => (
              <span key={item} className={cn(
                "text-[10px] px-2.5 py-1.5 rounded-md font-semibold",
                item === "Audit" ? "bg-[#c9962a] text-[#0c0b08]" : "text-white/25"
              )}>
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 transition-opacity duration-[1800ms]"
              style={{ opacity: pulse ? 1 : 0.25 }} />
            <span className="text-[9px] text-white/20 mr-1">Live</span>
            <div className="w-6 h-6 rounded-full bg-[#c9962a] flex items-center justify-center text-[9px] font-bold text-[#0c0b08]">VI</div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5 space-y-3">

          {/* URL bar */}
          <div className="flex items-center gap-2 bg-white/[0.025] border border-white/[0.05] rounded-xl px-3.5 py-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
              style={{ boxShadow: "0 0 6px rgba(74,222,128,0.7)" }} />
            <span className="flex-1 font-mono text-[10px] text-white/35 truncate">https://example-website.com</span>
            <span className="text-[8.5px] text-white/15 uppercase tracking-widest hidden sm:block">Scanned 2m ago</span>
            <button className="ml-2 bg-[#c9962a] text-[#0c0b08] text-[9.5px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0">
              Re-scan
            </button>
          </div>

          {/* Score ring + metric cards */}
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <div className="bg-white/[0.025] border border-[#c9962a]/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-2">
              <ScoreRing score={92} />
              <div className="text-center">
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#c9962a]/50">Overall</p>
                <p className="text-[8px] text-emerald-400/60 mt-0.5">↑ +6 this week</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {mockMetrics.map((m, i) => (
                <motion.div key={m.label}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/[0.025] border border-white/[0.05] rounded-xl p-3"
                >
                  <p className="text-[8.5px] uppercase tracking-wider text-white/25 font-semibold mb-1.5 truncate">{m.label}</p>
                  <p className="text-[19px] font-bold text-white leading-none mb-2">
                    <AnimatedNumber target={m.value} duration={900 + i * 180} />
                    <span className="text-[10px] text-white/20">%</span>
                  </p>
                  <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden mb-2">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${m.bar}`}
                      initial={{ width: 0 }} whileInView={{ width: `${m.value}%` }}
                      viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className={`text-[7.5px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${m.chipCls}`}>
                    {m.chip}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CWV + Sparkline row */}
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div className="bg-white/[0.025] border border-white/[0.05] rounded-xl px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mb-3">Core Web Vitals</p>
              <div className="grid grid-cols-4 gap-2">
                {[{ k: "LCP", v: "0.5s" }, { k: "FCP", v: "0.2s" }, { k: "CLS", v: "0.01" }, { k: "TTI", v: "0.5s" }].map(c => (
                  <div key={c.k} className="text-center">
                    <p className="text-[13px] font-bold text-white leading-none">{c.v}</p>
                    <p className="text-[7px] text-white/25 mt-0.5 uppercase tracking-widest">{c.k}</p>
                    <div className="w-1 h-1 rounded-full bg-emerald-400 mx-auto mt-1.5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.025] border border-white/[0.05] rounded-xl px-4 py-3 flex flex-col justify-between min-w-[130px]">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 mb-1.5">30-day trend</p>
              <Sparkline />
              <p className="text-[8px] text-emerald-400 font-bold mt-1.5">↑ +45 pts</p>
            </div>
          </div>

          {/* Insights banner */}
          <div className="flex items-center gap-3 bg-[#c9962a]/[0.06] border border-[#c9962a]/20 rounded-xl px-3.5 py-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#c9962a]/15 flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.5 5.5H13L9.5 8L10.5 13L7 10.5L3.5 13L4.5 8L1 5.5H5.5L7 1Z" fill="#c9962a" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-[#c9962a]">12 structural issues detected</p>
              <p className="text-[9px] text-white/30 mt-0.5">Fixing these could boost visibility by <span className="text-white/55 font-semibold">+24%</span></p>
            </div>
            <span className="text-[8.5px] font-bold text-[#c9962a]/50 border border-[#c9962a]/15 px-2.5 py-1 rounded-lg whitespace-nowrap">
              View all →
            </span>
          </div>

          {/* Issues list */}
          <div className="space-y-1.5">
            {mockIssues.map((issue, i) => (
              <div key={i}
                className={cn(
                  "flex items-center gap-3 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3.5 py-2.5",
                  issue.opacity
                )}
                style={issue.blur ? { filter: `blur(${i === 3 ? 1.5 : 2.5}px)` } : undefined}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", issue.dot)} />
                <span className="flex-1 text-[10.5px] text-white/45 truncate">{issue.text}</span>
                <span className={cn("text-[8px] font-bold uppercase tracking-wide px-2 py-1 rounded-lg flex-shrink-0", issue.cls)}>
                  {issue.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fade + unlock CTA */}
        <div className="relative -mt-16 h-[92px] flex items-end justify-center pb-5"
          style={{ background: "linear-gradient(to bottom, transparent, #0c0b08 50%, #0c0b08)" }}>
          <motion.div
            initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="flex items-center gap-2 bg-[#c9962a]/10 border border-[#c9962a]/28 rounded-full px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9962a]" />
            <span className="text-[10.5px] font-semibold text-[#c9962a]">Sign in to unlock all 12 insights</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
    const domain = auditUrl.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    try {
      const { runGuestAudit } = await import("@/app/Dashboard/audit-actions");
      const res = await runGuestAudit(domain);
      if (res.success) {
        setScanResult({ ...res, domain });
        localStorage.setItem("pending_audit_domain", domain);
      } else {
        setError(res.error || "Could not complete audit. Please check the URL.");
      }
    } catch {
      setError("Failed to connect to audit engine.");
    } finally {
      setIsScanning(false);
    }
  };

  const navItems = [
    { name: "Home", link: "/", icon: <FaHome className="h-4 w-4 text-neutral-500" /> },
    { name: "Features", link: "#features", icon: <FaSearch className="h-4 w-4 text-neutral-500" /> },
    { name: "Process", link: "#how-it-works", icon: <FaChartBar className="h-4 w-4 text-neutral-500" /> },
    { name: "Pricing", link: "#pricing", icon: <FaCog className="h-4 w-4 text-neutral-500" /> },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden text-neutral-900">

      {/* Scanning overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-24 h-24 relative mb-8">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 border-[6px] border-amber-100 border-t-amber-400 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-amber-500 text-2xl">
                <FaSearch className="animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mb-2">
              Analyzing <span className="text-amber-500">{auditUrl}</span>
            </h2>
            <p className="text-neutral-500 max-w-sm">Our AI is fetching performance scores, SEO metrics, and accessibility audits. This takes about 10-15 seconds...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
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

      {/* ── Hero ── */}
      <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-4 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600"
        >
          🚀 The Future of SEO is Here
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-black uppercase tracking-tighter text-neutral-900 md:text-7xl"
        >
          Optimize Your{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent italic tracking-normal">
            Digital Presence
          </span>{" "}
          with AI
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl"
        >
          Supercharge your rankings with our all-in-one SEO auditor. Get real-time insights, automated fixes, and competitor analysis in seconds.
        </motion.p>

        <motion.form onSubmit={handleAudit}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex w-full max-w-md items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-amber-900/5 focus-within:ring-2 focus-within:ring-amber-200"
        >
          <input
            type="url" value={auditUrl} onChange={e => setAuditUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., example.com)" required
            className="flex-1 bg-transparent px-4 py-2 text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <button type="submit"
            className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-2.5 font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-md shadow-amber-200/50"
          >
            Audit Now
          </button>
        </motion.form>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-500 text-sm font-medium">{error}</motion.p>
        )}

        {/* Scan results */}
        <AnimatePresence>
          {scanResult && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
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
                        <p className={`text-2xl font-black ${s.val > 80 ? "text-green-500" : s.val > 50 ? "text-amber-500" : "text-red-500"}`}>
                          {s.val}%
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="text-xs uppercase font-black tracking-[0.2em] text-neutral-400 mb-4">
                      Critical Issues Found ({scanResult.issuesCount})
                    </h4>
                    <div className="space-y-3">
                      {scanResult.topIssues.map((issue: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                          <div className={`w-2 h-2 rounded-full ${issue.level === "high" ? "bg-red-400" : "bg-amber-400"}`} />
                          {issue.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 bg-neutral-900 rounded-[2rem] p-8 flex flex-col justify-center text-center relative overflow-hidden text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 opacity-20" />
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">Unlock Full Audit</h4>
                  <p className="text-neutral-400 text-sm mb-8 relative z-10">Sign up to get the full report, fix recommendations, and track your progress over time.</p>
                  <Link href="/signup"
                    className="bg-white text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all relative z-10 shadow-xl"
                  >
                    Claim Full Access
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── UPGRADED DARK MOCKUP ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mt-20 w-full max-w-5xl mx-auto"
        >
          {/* Floating label above */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500/70">Live Dashboard Preview</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
          </motion.div>

          <HeroDashboardMockup />
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Our Core Features</h2>
          <p className="mt-4 text-neutral-600">Everything you need to dominate the search results.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AI Analysis", desc: "Deep-dive into your site's structure with our proprietary AI that identifies ranking bottlenecks.", icon: <div className="rounded-lg bg-amber-100 p-3 text-amber-600"><FaSearch className="h-6 w-6" /></div> },
            { title: "Keyword Tracker", desc: "Real-time tracking of your most valuable keywords across all major search engines.", icon: <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600"><FaChartBar className="h-6 w-6" /></div> },
            { title: "Backlink Audit", desc: "Monitor your backlink profile and identify toxic links before they harm your ranking.", icon: <div className="rounded-lg bg-amber-50 p-3 text-amber-700"><FaCog className="h-6 w-6" /></div> },
            { title: "Mobile First", desc: "Complete mobile auditing to ensure your site is fast and responsive on every device.", icon: <div className="rounded-lg bg-yellow-50 p-3 text-yellow-700"><FaHome className="h-6 w-6" /></div> },
            { title: "Speed Insights", desc: "Advanced performance metrics and actionable tips to shave seconds off your load time.", icon: <div className="rounded-lg bg-amber-100 p-3 text-amber-500"><FaChartBar className="h-6 w-6" /></div> },
            { title: "Competitor Intel", desc: "See exactly what your rivals are doing and find the gaps in their strategy.", icon: <div className="rounded-lg bg-yellow-100 p-3 text-yellow-500"><FaSearch className="h-6 w-6" /></div> },
          ].map((feature, i) => (
            <motion.div key={i} whileHover={{ y: -5 }}
              className="group/feature relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 transition-all hover:shadow-xl hover:shadow-amber-900/5 hover:border-amber-200"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-100 blur-2xl opacity-0 group-hover/feature:opacity-100 transition-opacity" />
              {feature.icon}
              <h3 className="mt-6 text-xl font-bold text-neutral-900">{feature.title}</h3>
              <p className="mt-3 text-neutral-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
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
            { step: "03", title: "Dominate Rankings", desc: "Implement the fixes and watch your visibility climb as search engines reward your site." },
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

      {/* ── CTA ── */}
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
            <Link href="/login" className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-4 font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-amber-200/50">
              Get Started for Free
            </Link>
            <Link href="/login" className="rounded-2xl border border-amber-200 bg-white px-8 py-4 font-bold text-amber-600 transition-all hover:bg-neutral-50 active:scale-95">
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="container relative z-10 py-24 px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-neutral-600">Choose the plan that fits your growth goals.</p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { name: "Starter", price: "$0", features: ["1 Website Scan", "Basic Insights", "Weekly Reports", "Email Support"], cta: "Start Free", popular: false },
            { name: "Professional", price: "$49", features: ["10 Website Scans", "Deep AI Analysis", "Daily Tracking", "Priority Support", "Competitor Intel"], cta: "Go Pro", popular: true },
            { name: "Enterprise", price: "Custom", features: ["Unlimited Scans", "API Access", "Custom Dashboards", "24/7 Dedicated Support", "White-labeling"], cta: "Contact Sales", popular: false },
          ].map((plan, i) => (
            <div key={i}
              className={cn(
                "relative flex flex-col rounded-[2.5rem] border p-10 transition-all hover:scale-[1.02]",
                plan.popular ? "border-amber-300 bg-amber-50/50 shadow-2xl shadow-amber-200/40" : "border-neutral-200 bg-white"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-1 text-xs font-bold text-white shadow-md">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-black text-neutral-900">{plan.price}</span>
                {plan.price !== "Custom" && <span className="mb-1 text-sm text-neutral-500">/mo</span>}
              </div>
              <ul className="mt-8 flex flex-col gap-4">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-neutral-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/login"
                className={cn(
                  "mt-10 rounded-2xl py-4 font-bold text-center transition-all active:scale-95",
                  plan.popular
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:opacity-90 shadow-lg shadow-amber-200/40"
                    : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                )}
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
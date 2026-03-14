"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-neutral-100 bg-white py-12">
            <div className="container mx-auto grid grid-cols-1 justify-between gap-10 px-8 md:grid-cols-4">
                {/* Branding & Social */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="text-xl font-bold text-neutral-900">
                        SEO-Auditor
                    </Link>
                    <p className="max-w-xs text-sm text-neutral-500">
                        Empowering businesses with AI-driven SEO insights. Optimize, rank, and grow with the most advanced auditor on the market.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="h-5 w-5 text-neutral-400 hover:text-amber-500 transition-colors">
                            <FaTwitter />
                        </a>
                        <a href="#" className="h-5 w-5 text-neutral-400 hover:text-amber-500 transition-colors">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/Vlex127" className="h-5 w-5 text-neutral-400 hover:text-amber-500 transition-colors">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Product Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900">Product</h4>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-500">
                        <li><Link href="/Audit" className="hover:text-amber-500">Live Audit</Link></li>
                        <li><Link href="/Keyword" className="hover:text-amber-500">Keyword Tracker</Link></li>
                        <li><Link href="/Backlink" className="hover:text-amber-500">Backlink Analysis</Link></li>
                        <li><Link href="Api" className="hover:text-amber-500">API Access</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900">Company</h4>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-500">
                        <li><Link href="/About" className="hover:text-amber-500">About Us</Link></li>
                        <li><Link href="/Careers" className="hover:text-amber-500">Careers</Link></li>
                        <li><Link href="/Privacy" className="hover:text-amber-500">Privacy Policy</Link></li>
                        <li><Link href="/Terms" className="hover:text-amber-500">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900">Stay Updated</h4>
                    <p className="text-sm text-neutral-500">
                        Get the latest SEO tips and updates delivered to your inbox.
                    </p>
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                        />
                        <button className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 shadow-sm shadow-amber-200">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-xs text-neutral-400">
                © {new Date().getFullYear()} SEO-Auditor by Vincent Iwuno. All rights reserved.
            </div>
        </footer>
    );
};

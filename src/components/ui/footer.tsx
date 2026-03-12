"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-neutral-100 bg-white py-12 dark:border-white/10 dark:bg-black">
            <div className="container mx-auto grid grid-cols-1 justify-between gap-10 px-8 md:grid-cols-4">
                {/* Branding & Social */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="text-xl font-bold dark:text-white">
                        SEO-Auditor
                    </Link>
                    <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                        Empowering businesses with AI-driven SEO insights. Optimize, rank, and grow with the most advanced auditor on the market.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="h-5 w-5 text-neutral-400 hover:text-blue-500 transition-colors">
                            <FaTwitter />
                        </a>
                        <a href="#" className="h-5 w-5 text-neutral-400 hover:text-blue-500 transition-colors">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="h-5 w-5 text-neutral-400 hover:text-blue-500 transition-colors">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Product Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Product</h4>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <li><Link href="#" className="hover:text-blue-500">Live Audit</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">Keyword Tracker</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">Backlink Analysis</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">API Access</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Company</h4>
                    <ul className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <li><Link href="#" className="hover:text-blue-500">About Us</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">Careers</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-blue-500">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Stay Updated</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Get the latest SEO tips and updates delivered to your inbox.
                    </p>
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5"
                        />
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
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

"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo login
        alert("Login successful! Redirecting to your profile...");
        window.location.href = "/profile";
    };

    return (
        <main className="min-h-screen bg-natural pt-32 pb-24 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-sage/10 w-full max-w-md"
                >
                    <div className="text-center mb-10 space-y-2">
                        <h1 className="text-3xl font-bold text-dark">Welcome Back</h1>
                        <p className="text-sage">Continue your wellness journey with Ayushcart</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-dark ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sage" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-natural rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-dark ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-sage" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-natural rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium px-1">
                            <label className="flex items-center gap-2 cursor-pointer text-sage hover:text-dark">
                                <input type="checkbox" className="rounded-sm accent-primary" />
                                Remember me
                            </label>
                            <Link href="#" className="text-primary hover:underline">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            Sign In
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-sage/10 text-center space-y-6">
                        <p className="text-sm text-sage">Or connect with</p>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-natural hover:bg-sage/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-sage/5">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-bold text-dark">Google</span>
                            </button>
                            <button className="flex-1 bg-natural hover:bg-sage/10 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-sage/5">
                                <Github size={20} className="text-dark" />
                                <span className="text-sm font-bold text-dark">GitHub</span>
                            </button>
                        </div>
                        <p className="text-sm text-sage">
                            Don't have an account? <Link href="#" className="font-bold text-primary hover:underline">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

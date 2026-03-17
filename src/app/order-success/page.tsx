"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-natural pt-40 pb-24 text-center">
            <Navbar />

            <div className="container mx-auto px-4 max-w-xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] p-12 shadow-xl border border-sage/10"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                        <CheckCircle size={40} />
                    </div>

                    <h1 className="text-4xl font-bold text-dark mb-4 italic">Namaste!</h1>
                    <h2 className="text-2xl font-bold text-dark mb-6">Your Order is Placed</h2>

                    <p className="text-sage text-lg mb-10">
                        Thank you for choosing Ayushcart. Your journey towards authentic Ayurvedic wellness has begun. We are preparing your remedies with care.
                    </p>

                    <div className="space-y-4">
                        <Link
                            href="/profile"
                            className="bg-primary hover:bg-primary-light text-white w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <Package size={20} />
                            Track Your Order
                        </Link>

                        <Link
                            href="/products"
                            className="text-primary hover:underline font-bold flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

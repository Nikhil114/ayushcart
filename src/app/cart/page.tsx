"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
    const total = totalPrice();

    return (
        <main className="min-h-screen bg-natural">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-4 md:px-6">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/products" className="p-2 bg-white rounded-full text-dark hover:text-primary transition-colors shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-4xl font-bold text-dark">Your Shopping Bag</h1>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 md:p-24 text-center shadow-sm border border-sage/10">
                        <div className="w-24 h-24 bg-natural rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-4">Your bag is empty</h2>
                        <p className="text-sage mb-10 max-w-md mx-auto">Looks like you haven't added any Ayurvedic wellness products to your bag yet.</p>
                        <Link
                            href="/products"
                            className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-10 py-4 rounded-full transition-all shadow-xl"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white rounded-3xl p-6 shadow-sm border border-sage/10 flex flex-col sm:flex-row items-center gap-6"
                                    >
                                        <div className="w-24 h-24 relative rounded-2xl overflow-hidden bg-natural shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-2 text-center sm:text-left">
                                            <h3 className="font-bold text-dark text-lg">{item.name}</h3>
                                            <p className="text-primary font-bold">₹{item.price}</p>
                                        </div>

                                        <div className="flex items-center border border-sage/30 rounded-full px-3 py-1 bg-natural/50">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-primary transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-sage hover:text-accent transition-colors p-2"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-sage/10 sticky top-32">
                                <h2 className="text-2xl font-bold text-dark mb-8">Order Summary</h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sage">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-dark">₹{total}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sage">
                                        <span>Shipping</span>
                                        <span className="text-primary font-semibold">FREE</span>
                                    </div>
                                    <div className="pt-6 border-t border-sage/10 flex justify-between items-center">
                                        <span className="text-lg font-bold text-dark">Total</span>
                                        <span className="text-2xl font-bold text-primary">₹{total}</span>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="block w-full bg-primary hover:bg-primary-light text-white text-center font-bold py-5 rounded-2xl transition-all shadow-xl mt-8"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <div className="pt-6 text-center">
                                        <p className="text-xs text-sage font-medium flex items-center justify-center gap-2">
                                            <ShieldCheck size={14} className="text-primary" />
                                            Secure checkout powered by Ayushcart
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

function ShieldCheck({ size, className }: { size: number, className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

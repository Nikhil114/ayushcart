"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    ShoppingBag,
    Heart,
    User,
    Menu,
    X,
    Phone,
    Mail,
    BadgePercent,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../assets/logos/ayushlogo.svg'
import Image from "next/image";

const navItems = [
    { label: "Shop All", href: "/shop" },
    { label: "Shop by Concern", href: "/shop-by-concern" },
    { label: "Wellness Kits", href: "/wellness-kits" },
    { label: "Gut Health", href: "/gut-health" },
    { label: "Hair & Skin", href: "/hair-skin" },
    { label: "Immunity", href: "/immunity" },
    { label: "Personal Care", href: "/personal-care" },
    { label: "About Us", href: "/about" },
    { label: "Resources", href: "/resources" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const totalItems = useCartStore((state) => state.totalItems());
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <header className="w-full border-b border-neutral-200 bg-white">
            {/* Top strip */}
            <div className="bg-primary text-white overflow-hidden">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 sm:px-6 lg:px-10">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-[11px]">
                        <span>Free shipping on orders above ₹999</span>
                    </div>

                    <div className="hidden items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] md:flex">
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>info@ayushcart.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>+91 98765 43210</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main header */}
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                <div className="flex h-[80px] items-center justify-between lg:h-[120px]">
                    {/* Left - Desktop search */}
                    <div className="flex flex-1 items-center">
                        <form
                            onSubmit={handleSearch}
                            className="hidden w-full max-w-[400px] lg:block"
                        >
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="h-[50px] w-full border-b border-neutral-300 bg-transparent pl-2 pr-10 text-[16px] text-neutral-700 outline-none transition group-focus-within:border-primary"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-700"
                                    aria-label="Search"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-800 lg:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Center - Logo */}
                    <div className="flex shrink-0 justify-center px-2 lg:px-4">
                        <Link href="/" className="flex flex-col items-center gap-0">
                            <Image 
                                src={logo} 
                                alt="Logo" 
                                className="h-10 w-auto lg:h-20 transition-all" 
                            />
                        </Link>
                    </div>

                    {/* Right - Icons */}
                    <div className="flex flex-1 items-center justify-end gap-3 sm:gap-6 lg:gap-8">
                        {/* Desktop Search Button (hidden on mobile as we have the bar) */}
                        <button
                            className="hidden lg:inline-flex items-center justify-center text-neutral-800"
                            aria-label="Search"
                        >
                            <Search size={22} />
                        </button>

                        <Link
                            href="/account"
                            className="hidden items-center gap-2 text-[14px] font-medium text-neutral-800 lg:flex uppercase tracking-wider hover:text-primary transition"
                        >
                            <User size={20} strokeWidth={1.5} />
                            <span>Login / Register</span>
                        </Link>

                        <Link
                            href="/wishlist"
                            className="relative inline-flex items-center justify-center text-neutral-800 hover:text-primary transition"
                            aria-label="Wishlist"
                        >
                            <Heart size={24} strokeWidth={1.5} />
                        </Link>

                        <Link
                            href="/cart"
                            className="relative inline-flex items-center justify-center text-neutral-800 hover:text-primary transition"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile search bar */}
            <div className="pb-6 lg:hidden px-4">
                <form onSubmit={handleSearch} className="relative group">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for remedies..."
                        className="h-12 w-full rounded-2xl border border-neutral-200 bg-cream/50 pl-5 pr-12 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/5 text-primary placeholder:text-neutral-400"
                    />
                    <button 
                        type="submit"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </form>
            </div>


            {/* Desktop category nav */}
            <nav className="hidden border-t border-neutral-100 lg:block bg-white/50 backdrop-blur-md sticky top-0 z-30">
                <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-12 overflow-x-auto px-8 py-4 text-[15px] font-medium text-neutral-700 uppercase tracking-widest">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="shrink-0 whitespace-nowrap transition hover:text-primary border-b-2 border-transparent hover:border-primary py-1"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-[340px] bg-white shadow-xl lg:hidden"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
                                <span className="text-lg font-semibold text-[#4B0055]">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-md p-2 text-neutral-800"
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="border-b border-neutral-100 px-4 py-4 text-[15px] font-medium text-neutral-800 transition hover:bg-neutral-50"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="border-t border-neutral-200 px-4 py-5">
                                    <Link
                                        href="/account"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 text-sm font-medium text-neutral-800"
                                    >
                                        <User size={18} />
                                        <span>My Account</span>
                                    </Link>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
                                        <Mail size={16} />
                                        <span>info@ayushcart.com</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
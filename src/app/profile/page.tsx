"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        joinDate: "March 2024"
    };

    const menuItems = [
        { icon: <Package size={20} />, label: "Order History", description: "View and track your previous orders" },
        { icon: <Heart size={20} />, label: "Product Wishlist", description: "Items you've saved for later" },
        { icon: <Settings size={20} />, label: "Account Settings", description: "Personal info, password, and preferences" },
    ];

    return (
        <main className="min-h-screen bg-natural pt-32 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar / User Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-8"
                    >
                        <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-sm border border-sage/10">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-primary/10 relative">
                                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                            </div>
                            <h2 className="text-2xl font-bold text-dark">{user.name}</h2>
                            <p className="text-sage text-sm mb-6">{user.email}</p>
                            <div className="bg-natural rounded-2xl p-4 inline-block">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider">Member Since</p>
                                <p className="text-dark font-medium">{user.joinDate}</p>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 text-accent font-bold hover:bg-accent/5 py-4 rounded-2xl transition-all">
                            <LogOut size={20} />
                            Logout from Ayushcart
                        </button>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-sage/10"
                        >
                            <h1 className="text-3xl font-bold text-dark mb-8">Your Wellness Hub</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-dark">Active Orders</h4>
                                            <p className="text-sage text-sm">2 items in transit</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-sage group-hover:translate-x-1 transition-transform" />
                                </div>

                                <div className="bg-secondary/5 rounded-3xl p-6 border border-secondary/10 flex items-center justify-between group cursor-pointer hover:bg-secondary/10 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                                            <Heart size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-dark">My Wishlist</h4>
                                            <p className="text-sage text-sm">5 saved remedies</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-sage group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <h3 className="font-bold text-dark text-xl mb-6 ml-2">App Settings</h3>
                                {menuItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-6 rounded-3xl hover:bg-natural transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-10 h-10 text-sage group-hover:text-primary transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-dark leading-none mb-1">{item.label}</h4>
                                                <p className="text-sage text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-sage group-hover:translate-x-1 transition-transform" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

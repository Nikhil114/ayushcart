"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const price = product.price || "0";
    const image = product.images?.[0]?.src || "/placeholder.png";
    const tag = product.tag || (product.on_sale ? "Sale" : "");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
        >
            {/* Image Container */}
            <div className="relative aspect-4/5 overflow-hidden bg-[#F9F6F0]">
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                    <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>
                
                {/* Product Tags */}
                {tag && (
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-sm shadow-sm ${
                            tag === "Best Seller" ? "bg-accent" : "bg-primary"
                        }`}>
                            {tag}
                        </span>
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-neutral-400 hover:text-accent hover:bg-white transition-all transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 shadow-sm">
                    <Heart size={20} strokeWidth={1.5} />
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                        href={`/products/${product.slug}`}
                        className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-primary hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-300"
                    >
                        <Eye size={22} strokeWidth={1.5} />
                    </Link>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col grow p-6 text-center space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
                    {product.categories?.[0]?.name || "Ayurvedic"}
                </p>
                <Link href={`/products/${product.slug}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="font-serif text-xl font-medium text-primary line-clamp-2 leading-snug">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex flex-col items-center gap-4 pt-2">
                    <span className="text-2xl font-bold text-primary">₹{price}</span>
                    <button
                        onClick={() => addItem(product)}
                        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-primary-light transition-all transform group-hover:-translate-y-1"
                    >
                        <ShoppingBag size={16} />
                        Add to Bag
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

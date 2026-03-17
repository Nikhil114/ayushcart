"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RefreshCw, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailClientProps {
    product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const price = product.price || "0";
    const image = product.images?.[0]?.src || "/images/products/brahmi.png";

    const handleAddToCart = () => {
        const item = {
            id: product.id,
            name: product.name,
            price: price,
            quantity: quantity,
            image: image,
            slug: product.slug,
        };
        for (let i = 0; i < quantity; i++) {
            addItem(item);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Product Images */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 sticky top-24"
            >
                <div className="aspect-4/5 relative rounded-3xl overflow-hidden bg-white shadow-sm border border-neutral-100">
                    <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                         <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-neutral-50 transition">
                            <Heart size={20} />
                         </button>
                         <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-neutral-50 transition">
                            <Share2 size={20} />
                         </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[image, image, image, image].map((img, i) => (
                         <div key={i} className={`aspect-square relative rounded-xl overflow-hidden border-2 transition ${i === 0 ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                            <Image src={img} alt="Thumb" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
            >
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                            Best Seller
                        </div>
                        <div className="flex items-center gap-1 text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                            ))}
                            <span className="text-primary/40 text-[12px] font-bold ml-1 uppercase tracking-widest">120 Reviews</span>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-serif font-medium text-primary leading-tight">{product.name}</h1>
                    
                    <div className="flex items-end gap-4">
                        <span className="text-4xl font-bold text-primary">₹{price}</span>
                         <span className="text-xl text-primary/30 line-through mb-1">₹{parseInt(price) + 500}</span>
                         <span className="text-accent font-bold mb-1">Save 20%</span>
                    </div>

                    <div className="text-neutral-600 text-lg leading-relaxed font-light"
                        dangerouslySetInnerHTML={{ __html: product.description || product.short_description || "Experience the pure essence of Ayurveda with our meticulously crafted " + product.name + ". Formulated with hand-picked herbs using traditional techniques." }}
                    />
                </div>

                {/* Selections */}
                <div className="space-y-6">
                     <div className="space-y-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Select Weight</span>
                        <div className="flex gap-3">
                            {["50g", "100g", "250g"].map(size => (
                                <button key={size} className={`px-6 py-2 border rounded-full text-xs font-bold transition ${size === "100g" ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary/60 border-neutral-200 hover:border-primary hover:text-primary'}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                     </div>
                </div>

                {/* Quantity and CTA */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center border border-neutral-200 rounded-full px-6 py-3 bg-white">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-1 text-primary hover:text-accent transition-colors"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="w-12 text-center font-bold text-xl text-primary">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-1 text-primary hover:text-accent transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-full transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[14px]"
                        >
                            <ShoppingBag size={20} />
                            Add to Shopping Bag
                        </button>
                    </div>

                    <Link
                        href="/checkout"
                        onClick={handleAddToCart}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5 rounded-full transition-all shadow-lg active:scale-95 text-center flex items-center justify-center uppercase tracking-[0.2em] text-[14px]"
                    >
                        Proceed to Checkout
                    </Link>
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-t border-b border-neutral-100">
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="h-10 w-10 flex items-center justify-center text-primary mb-1">
                             <Truck size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                         <div className="h-10 w-10 flex items-center justify-center text-primary mb-1">
                             <ShieldCheck size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Pure Ayurvedic</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                         <div className="h-10 w-10 flex items-center justify-center text-primary mb-1">
                             <RefreshCw size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Fast Returns</span>
                    </div>
                     <div className="flex flex-col items-center text-center gap-2">
                         <div className="h-10 w-10 flex items-center justify-center text-primary mb-1">
                             <Star size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Expert Tested</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

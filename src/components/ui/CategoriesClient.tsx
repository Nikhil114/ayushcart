"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoriesClientProps {
    categories: any[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => {
                const image = category.image?.src || category.image || "https://images.unsplash.com/photo-1540555700478-4be289a5090a?q=80&w=800&auto=format&fit=crop";
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Link
                            href={`/shop?category=${category.slug}`}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden block shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <Image
                                src={image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="text-primary-light font-bold text-sm mb-2">{category.count || 0} Products</span>
                                <h3 className="text-3xl font-bold text-white mb-4">{category.name}</h3>
                                <div className="flex items-center gap-2 text-white font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    Explore Collection <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}

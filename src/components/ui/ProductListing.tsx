"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface ProductListingProps {
    products: any[];
    categories: string[];
}

export default function ProductListing({ products, categories }: ProductListingProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    const queryParam = searchParams.get("query");
    const categoryParam = searchParams.get("category");
    
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("latest");
    const [isSortOpen, setIsSortOpen] = useState(false);

    useEffect(() => {
        if (queryParam) {
            setSearchQuery(queryParam);
        }
        if (categoryParam) {
            // Find category that matches slug or name
            const foundCategory = categories.find(c => 
                c.toLowerCase() === categoryParam.toLowerCase() || 
                c.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
            );
            if (foundCategory) {
                setActiveCategory(foundCategory);
            }
        }
    }, [queryParam, categoryParam, categories]);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        const params = new URLSearchParams(searchParams.toString());
        if (cat === "All") {
            params.delete("category");
        } else {
            params.set("category", cat.toLowerCase().replace(/\s+/g, '-'));
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const productCategory = product.categories?.[0]?.name || "Uncategorized";
            const matchesCategory = activeCategory === "All" || productCategory === activeCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "price-low-high") {
                return parseFloat(a.price || 0) - parseFloat(b.price || 0);
            }
            if (sortBy === "price-high-low") {
                return parseFloat(b.price || 0) - parseFloat(a.price || 0);
            }
            if (sortBy === "name-a-z") {
                return a.name.localeCompare(b.name);
            }
            // default: latest (date_created)
            return new Date(b.date_created).getTime() - new Date(a.date_created).getTime();
        });

    const sortOptions = [
        { label: "Latest Arrivals", value: "latest" },
        { label: "Price: Low to High", value: "price-low-high" },
        { label: "Price: High to Low", value: "price-high-low" },
        { label: "Alphabetical (A-Z)", value: "name-a-z" },
    ];

    return (
        <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-dark italic"
                >
                    Our Collections
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sage text-lg"
                >
                    Pure, authentic and carefully curated Ayurvedic remedies.
                </motion.p>
                <div className="text-sm text-sage/70 font-medium">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'remedy' : 'remedies'}
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sage group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search for remedies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 outline-none border border-sage/10 focus:border-primary shadow-sm transition-all text-dark text-sm md:text-base"
                    />
                </div>

                <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    <div className="flex flex-nowrap lg:flex-wrap gap-3 min-w-max lg:min-w-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                    ? "bg-primary text-white shadow-lg ring-4 ring-primary/10"
                                    : "bg-white text-sage hover:text-dark border border-sage/10 hover:border-primary/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative w-full lg:w-auto">
                    <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 bg-white px-6 py-3 rounded-2xl text-sm font-bold border border-sage/10 hover:border-primary transition-all text-dark shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={18} />
                            {sortOptions.find(o => o.value === sortBy)?.label || "Sort By"}
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                        {isSortOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-sage/5 py-2 z-20 overflow-hidden"
                                >
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                                sortBy === option.value 
                                                ? "bg-primary/5 text-primary font-bold" 
                                                : "text-sage hover:bg-natural hover:text-dark"
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Products Grid */}
            <div className="relative min-h-[400px]">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-natural/50 rounded-full flex items-center justify-center text-sage">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-dark italic">No remedies found</h3>
                        <p className="text-sage">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                            className="text-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

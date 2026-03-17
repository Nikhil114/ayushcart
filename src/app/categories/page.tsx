import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCategories } from "@/lib/woocommerce";
import CategoriesClient from "@/components/ui/CategoriesClient";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-natural pt-32 pb-24">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-2xl mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-dark italic">Our Herbal Collections</h1>
                    <p className="text-sage text-lg">Explore our range of authentic Ayurvedic solutions curated specifically for your wellness needs.</p>
                </div>
                <CategoriesClient categories={categories} />
            </div>
            <Footer />
        </main>
    );
}

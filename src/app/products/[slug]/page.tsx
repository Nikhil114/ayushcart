import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/woocommerce";
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ProductDetailClient from "@/components/ui/ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return (
            <main className="min-h-screen bg-natural pt-40 pb-24 text-center">
                <Navbar />
                <h2 className="text-3xl font-serif text-primary">Product not found</h2>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-natural">
            <Navbar />
            <div className="pt-32 pb-24 container mx-auto px-4 md:px-6">
                <ProductDetailClient product={product} />
            </div>
            <Footer />
        </main>
    );
}

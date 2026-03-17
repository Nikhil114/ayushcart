import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductListing from "@/components/ui/ProductListing";
import { getProducts, getCategories } from "@/lib/woocommerce";

import { Suspense } from "react";

export default async function ProductsPage() {
    const products = await getProducts();
    const categories = await getCategories();

    const displayCategories = ["All", ...categories.map((c: any) => c.name)];

    return (
        <main className="min-h-screen bg-natural pt-32 pb-24">
            <Navbar />
            <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-sage">Loading products...</div>}>
                <ProductListing products={products} categories={displayCategories} />
            </Suspense>
            <Footer />
        </main>
    );
}

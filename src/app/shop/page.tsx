import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductListing from "@/components/ui/ProductListing";
import { getProducts, getCategories } from "@/lib/woocommerce";

export const metadata = {
  title: "Shop All - Ayushcart",
  description: "Browse our complete collection of authentic Ayurvedic remedies and wellness products.",
};

import { Suspense } from "react";

export default async function ShopPage() {
  // Fetch all products (up to 100 for shop page)
  const products = await getProducts({ per_page: 100 });
  const woocommerceCategories = await getCategories();
  
  // Extract category names for the filter
  const categoryNames = ["All", ...woocommerceCategories.map((cat: any) => cat.name)];

  return (
    <main className="min-h-screen bg-natural pt-32 pb-24">
      <Navbar />
      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading collections...</div>}>
        <ProductListing products={products} categories={categoryNames} />
      </Suspense>
      <Footer />
    </main>
  );
}

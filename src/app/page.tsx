import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import banner from '../assets/banners/mainBanner.png'

import { getProducts, getCategories } from "@/lib/woocommerce";

export default async function Home() {
    const products = await getProducts({ featured: true });
    const categories = await getCategories();

    // Map WooCommerce categories to the format used in the circle section
    const displayCategories = categories.slice(0, 4).map((cat: any) => ({
        name: cat.name,
        image: cat.image?.src || "/images/categories/gut-health.png"
    }));

    const bestSellers = products.length > 0 ? products.slice(0, 3) : [];
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[85vh] w-full">
                <Image
                    src={banner}
                    alt="Ayurvedic Balance"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="container relative z-10 mx-auto flex h-full items-center px-4 md:px-10">
                    <div className="max-w-2xl text-white">
                        <h1 className="mb-4 text-5xl font-bold leading-tight md:text-7xl">
                            Discover your <br />
                            <span className="italic font-normal">Natural Balance</span>
                        </h1>
                        <p className="mb-8 max-w-lg text-lg text-white/90">
                            Traditional wisdom for modern living. Authentic Ayurvedic wellness curated for your unique constitution.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/shop" className="bg-primary px-8 py-3 font-medium text-white transition hover:bg-primary-light">
                                OUR HERITAGE
                            </Link>
                            <Link href="/shop" className="bg-white px-8 py-3 font-medium text-primary transition hover:bg-neutral-100">
                                SHOP ALL
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Sellers - Circle Categories */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-12 font-serif text-3xl md:text-5xl">Meet Sellers</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {displayCategories.map((cat: any, i: number) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-primary/10 transition-transform group-hover:scale-110 md:h-44 md:w-44">
                                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                                </div>
                                <span className="text-sm font-medium uppercase tracking-widest text-primary/80">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers with Tabs */}
            <section className="bg-cream/50 py-20 px-4 md:px-0">
                <div className="container mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-primary mb-8">Best Sellers</h2>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {["All", "Skin Care", "Hair Care", "Immunity", "Personal Care", "Gut Health"].map((tab, i) => (
                                <button
                                    key={i}
                                    className={`px-6 py-2 rounded-full text-sm font-medium tracking-widest uppercase transition ${i === 1 ? "bg-accent text-white" : "text-primary/60 hover:text-primary"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {bestSellers.map((product: any) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <button className="absolute -left-12 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hidden md:block">
                            <ArrowLeft size={24} />
                        </button>
                        <button className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-black text-white p-3 shadow-lg hidden md:block">
                            <ArrowRight size={24} />
                        </button>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/shop" className="inline-block border-b-2 border-primary pb-1 text-sm font-bold tracking-[0.2em] uppercase text-primary">
                            View All
                        </Link>
                    </div>
                </div>
            </section>

            {/* Wellness Kits Banner */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="mb-12 font-serif text-4xl md:text-5xl">Shop Wellness Kits</h2>
                    <div className="relative mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {products.slice(3, 6).map((product: any) => (
                                <div key={product.id} className="bg-white overflow-hidden text-left group">
                                    <div className="relative h-[300px]">
                                        <Image src={product.images[0]?.src || "/images/products/ashwagandha.png"} alt={product.name} fill className="object-cover" />
                                        {product.on_sale && <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-[10px] uppercase font-bold">Sale</span>}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-serif text-2xl mb-2 text-primary">{product.name}</h3>
                                        <div className="text-sm text-neutral-500 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xl text-primary">₹{product.price}</span>
                                            <Link href={`/products/${product.slug}`} className="bg-primary text-white p-2 rounded-lg">
                                                <ShoppingBag size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/kits" className="inline-block border-b-2 border-primary pb-1 text-sm font-bold tracking-[0.2em] uppercase text-primary">
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Crafted by Ayurveda Dark Section */}
            <section className="relative h-[600px] w-full overflow-hidden bg-primary px-4">
                <Image
                    src="/images/banners/crafted.png"
                    alt="Crafted by Ayurveda"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="container relative z-10 mx-auto flex h-full items-center">
                    <div className="max-w-xl text-white">
                        <h2 className="mb-6 font-serif text-4xl md:text-6xl">Crafted By Ayurveda</h2>
                        <p className="mb-8 text-lg text-white/80">Every product is a testament to the ancient science of healing, meticulously formulated with hand-picked herbs and traditional processes.</p>
                        <div className="flex flex-col gap-4">
                            <button className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition">
                                <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full text-primary">
                                    <Play size={20} fill="currentColor" />
                                </div>
                                <span className="font-medium tracking-wide">Watch Our Story</span>
                            </button>
                            <button className="flex items-center gap-4 bg-white text-primary p-4 rounded-xl hover:bg-neutral-100 transition max-w-fit px-8">
                                <span className="font-medium tracking-wide uppercase">Shop The Collection</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute right-10 bottom-10 hidden lg:block">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-xs">
                        <h4 className="font-serif text-xl text-primary mb-2 italic">Roots of Ayurveda</h4>
                        <p className="text-sm text-neutral-600">Our philosophy is rooted in the belief that true beauty comes from balance - between mind, body and spirit.</p>
                    </div>
                </div>
            </section>

            {/* Shop By Concern */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-16 font-serif text-4xl md:text-5xl">Shop By Concern</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.slice(0, 4).map((category: any, i: number) => (
                            <Link href={`/shop?category=${category.slug}`} key={i} className="group relative h-[300px] md:h-[450px] overflow-hidden cursor-pointer">
                                <Image
                                    src={category.image?.src || "/images/categories/gut-health.png"}
                                    alt={category.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
                                <div className="absolute bottom-10 left-0 w-full text-center">
                                    <span className="font-serif text-2xl md:text-3xl text-white drop-shadow-lg italic">{category.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wellness Made Personal */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-4">
                    <div className="bg-[#EAE5D7] rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative">
                            <Image src="/images/banners/wellness-personal.png" alt="Wellness" fill className="object-cover" />
                        </div>
                        <div className="w-full md:w-1/2 p-10 md:p-20">
                            <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6">Wellness, Made Personal</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">Take our Ayurvedic assessment to discover your Dosha and receive personalized recommendations tailored to your unique mind-body constitution.</p>
                            <button className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary-light transition">
                                Start Your Journey
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Healing Journeys - Testimonials */}
            <section className="py-24 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-primary">Healing Journeys with Ayushcart</h2>
                        <div className="flex gap-4">
                            <button className="h-12 w-12 rounded-full border border-primary flex items-center justify-center text-primary"><ArrowLeft size={20} /></button>
                            <button className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white"><ArrowRight size={20} /></button>
                        </div>
                    </div>                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            { name: "Amrita Singh", text: "The Brahmi Memory pills have significantly improved my focus during work hours. I feel more centered and less overwhelmed by daily tasks. Truly life-changing!", img: "/images/products/brahmi.png" },
                            { name: "Rahul Verma", text: "Pure Ayurvedic wisdom! The Saffron Radiance oil has done wonders for my skin's texture. It feels natural and incredibly premium.", img: "/images/products/saffron-oil.png" }
                        ].map((t, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-3xl shadow-sm">
                                <div className="h-64 w-full md:w-64 relative shrink-0 overflow-hidden rounded-2xl">
                                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-lg italic text-neutral-700">"{t.text}"</p>
                                    <div>
                                        <h4 className="font-bold text-primary">{t.name}</h4>
                                        <p className="text-sm text-neutral-500 uppercase tracking-widest">Wellness Enthusiast</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="font-serif text-4xl md:text-6xl text-primary">Have a question or need guidance?</h2>
                        <p className="text-xl text-neutral-600">Our Ayurvedic experts are here to help you choose the right path for your wellness.</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="bg-primary text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest">Get Free Consultation</button>
                            <button className="border-2 border-primary text-primary px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition">WhatsApp Us</button>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 h-64 w-64 opacity-10 pointer-events-none">
                    <Image src="/images/banners/blog-ritual.png" alt="Bg" fill className="object-contain" />
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Re-defining ShoppingBag as it was missing from imports in local scope if I didn't import it
import { ShoppingBag } from "lucide-react";

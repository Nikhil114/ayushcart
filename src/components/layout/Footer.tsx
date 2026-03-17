import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import footerBg from "../../assets/backgrounds/footerbg.png";

export default function Footer() {
    return (
        <footer 
            className="text-cream pt-20 overflow-hidden relative"
            style={{
                backgroundImage: `url(${footerBg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-primary/80 z-0" />

            <div className="relative z-10">
                {/* Decorative Top Border */}
                <div className="w-full h-2 bg-accent opacity-50 mb-10" />

            <div className="container mx-auto px-4 md:px-10 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {/* Brand & Social */}
                    <div className="space-y-8">
                         <div className="flex flex-col items-start gap-0">
                             <span className="font-serif text-3xl font-bold tracking-widest text-white uppercase">
                                AYUSHCART
                            </span>
                            <span className="text-[10px] tracking-[0.3em] text-cream/70 uppercase font-montserrat">
                                Pure Ayurvedic Wellness
                            </span>
                        </div>
                        <p className="text-cream/70 text-sm leading-loose max-w-sm">
                            Bringing the ancient wisdom of Ayurveda to your modern lifestyle. Our products are rooted in tradition and backed by modern science for your holistic well-being.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Instagram size={18} /></Link>
                            <Link href="#" className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Facebook size={18} /></Link>
                            <Link href="#" className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Twitter size={18} /></Link>
                            <Link href="#" className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all"><Youtube size={18} /></Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-serif font-bold tracking-wider uppercase text-accent">Shop</h4>
                        <ul className="space-y-4">
                            <li><Link href="/shop" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">All Products</Link></li>
                            <li><Link href="/shop-by-concern" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Shop by Concern</Link></li>
                            <li><Link href="/wellness-kits" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Wellness Kits</Link></li>
                            <li><Link href="/new-arrivals" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-serif font-bold tracking-wider uppercase text-accent">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Our Heritage</Link></li>
                            <li><Link href="/contact" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Contact Us</Link></li>
                            <li><Link href="/blog" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Ayurveda Insights</Link></li>
                            <li><Link href="/consultation" className="text-cream/70 hover:text-white transition-colors text-sm uppercase tracking-widest">Free Consultation</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-serif font-bold tracking-wider uppercase text-accent">Join Our Community</h4>
                        <p className="text-sm text-cream/60">Subscribe to receive wellness tips and exclusive offers.</p>
                        <div className="flex flex-col gap-3">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-white/5 border border-white/10 p-3 rounded-lg text-sm text-white focus:outline-none focus:border-accent transition" 
                            />
                            <button className="bg-accent text-white py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent/90 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Giant Text Section */}
            <div className="relative border-t border-white/5 py-12 md:py-20 flex flex-col items-center justify-center">
                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                     <span className="text-[120px] md:text-[300px] font-bold tracking-tighter uppercase whitespace-nowrap">AYUSHCART</span>
                 </div>
                 
                 <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium text-cream/40 relative z-10">
                    <p>&copy; {new Date().getFullYear()} AYUSHCART PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-10">
                        <Link href="/privacy-policy" className="hover:text-cream transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-cream transition">Terms of Service</Link>
                        <Link href="/shipping" className="hover:text-cream transition">Shipping & Returns</Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}

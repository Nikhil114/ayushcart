"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CreditCard, Truck, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const checkoutSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    address: z.string().min(10, "Address is too short"),
    city: z.string().min(2, "City is too short"),
    zipCode: z.string().min(6, "Zip code must be 6 digits"),
    phone: z.string().min(10, "Phone number is invalid"),
    paymentMethod: z.enum(["razorpay", "cod"]),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const total = totalPrice();
    const [isLoading, setIsLoading] = useState(false);
    const [activePayment, setActivePayment] = useState<"razorpay" | "cod">("razorpay");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            zipCode: "",
            phone: "",
            paymentMethod: "razorpay"
        }
    });

    const createWooCommerceOrder = async (customerData: CheckoutValues, paymentId?: string) => {
        const orderData = {
            payment_method: customerData.paymentMethod,
            payment_method_title: customerData.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay Online",
            set_paid: customerData.paymentMethod === "razorpay",
            billing: {
                first_name: customerData.firstName,
                last_name: customerData.lastName,
                address_1: customerData.address,
                city: customerData.city,
                postcode: customerData.zipCode,
                email: customerData.email,
                phone: customerData.phone,
                country: "IN"
            },
            shipping: {
                first_name: customerData.firstName,
                last_name: customerData.lastName,
                address_1: customerData.address,
                city: customerData.city,
                postcode: customerData.zipCode,
                country: "IN"
            },
            line_items: items.map(item => ({ product_id: item.id, quantity: item.quantity })),
            meta_data: paymentId ? [{ key: "razorpay_payment_id", value: paymentId }] : []
        };

        try {
            const response = await fetch("/api/woocommerce/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) throw new Error("Order creation failed");

            clearCart();
            router.push("/order-success");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: CheckoutValues) => {
        setIsLoading(true);
        if (data.paymentMethod === "cod") {
            await createWooCommerceOrder(data);
            return;
        }

        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total }),
            });

            const order = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Ayushcart",
                description: "Purchase",
                order_id: order.id,
                handler: async (resp: any) => {
                    await createWooCommerceOrder(data, resp.razorpay_payment_id);
                },
                prefill: {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    contact: data.phone,
                },
                theme: { color: "#471941" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    if (items.length === 0 && !isLoading) {
        return (
            <main className="min-h-screen bg-cream pt-40 pb-24 text-center">
                <Navbar />
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-primary mb-6">Your wellness bag is empty</h2>
                    <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest">
                        Continue Shopping
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-cream pb-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-10 pt-12">
                <div className="mb-12">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-primary/60 hover:text-primary transition uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mt-6">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Form Section */}
                    <div className="lg:col-span-7 space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                                <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
                                <h2 className="text-xl font-serif text-primary">Shipping Details</h2>
                            </div>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">First Name</label>
                                        <input {...register("firstName")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Last Name</label>
                                        <input {...register("lastName")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Email Address</label>
                                    <input {...register("email")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Phone</label>
                                    <input {...register("phone")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Street Address</label>
                                    <textarea {...register("address")} rows={2} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">City</label>
                                        <input {...register("city")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Zip Code</label>
                                        <input {...register("zipCode")} className="w-full bg-white border border-neutral-200 rounded-none px-4 py-4 focus:border-primary outline-none transition" />
                                    </div>
                                </div>
                            </form>
                        </section>

                        <section className="space-y-8">
                             <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                                <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
                                <h2 className="text-xl font-serif text-primary">Payment Method</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setActivePayment("razorpay"); setValue("paymentMethod", "razorpay"); }}
                                    className={`p-6 border text-left transition ${activePayment === "razorpay" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-neutral-200 hover:border-primary/50'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <CreditCard size={20} className="text-primary" />
                                        <div className={`h-4 w-4 rounded-full border-2 ${activePayment === "razorpay" ? 'border-primary bg-primary' : 'border-neutral-300'}`} />
                                    </div>
                                    <p className="font-bold text-primary uppercase text-xs tracking-widest">Online Payment</p>
                                    <p className="text-[10px] text-neutral-500 mt-1">Cards, UPI, Netbanking</p>
                                </button>
                                <button
                                     onClick={() => { setActivePayment("cod"); setValue("paymentMethod", "cod"); }}
                                    className={`p-6 border text-left transition ${activePayment === "cod" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-neutral-200 hover:border-primary/50'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <Truck size={20} className="text-primary" />
                                        <div className={`h-4 w-4 rounded-full border-2 ${activePayment === "cod" ? 'border-primary bg-primary' : 'border-neutral-300'}`} />
                                    </div>
                                    <p className="font-bold text-primary uppercase text-xs tracking-widest">Cash on Delivery</p>
                                    <p className="text-[10px] text-neutral-500 mt-1">Pay when you receive</p>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-5">
                         <div className="bg-white p-8 md:p-12 space-y-8 sticky top-24">
                            <h3 className="text-2xl font-serif text-primary border-b border-primary/10 pb-6 uppercase tracking-wider text-center">Your Order</h3>
                            
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-24 relative bg-cream shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-serif text-primary text-sm leading-tight line-clamp-2">{item.name}</h4>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Quantity: {item.quantity}</p>
                                            <p className="font-bold text-primary">₹{parseInt(item.price) * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-primary/10">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary/60">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary/60">
                                    <span>Shipping</span>
                                    <span className="text-accent">FREE</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Total Amount</span>
                                    <span className="text-3xl font-bold text-primary">₹{total}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-5 rounded-none font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary-light transition disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Lock size={16} />}
                                {activePayment === "razorpay" ? "Complete Payment" : "Place Order"}
                            </button>
                            
                            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                                <ShieldCheck size={14} /> 100% SECURE CHECKOUT
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </main>
    );
}

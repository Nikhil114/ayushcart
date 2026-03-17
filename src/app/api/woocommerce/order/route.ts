import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(req: Request) {
    try {
        const orderData = await req.json();
        const order = await createOrder(orderData);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("WooCommerce order creation error:", error?.response?.data || error);
        return NextResponse.json(
            {
                error: "Failed to create WooCommerce order",
                details: error?.response?.data || error.message
            },
            { status: 500 }
        );
    }
}

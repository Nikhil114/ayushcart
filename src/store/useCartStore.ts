import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
    slug: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: any) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                image: product.images?.[0]?.src || "/placeholder.png",
                                slug: product.slug,
                            },
                        ],
                    });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },
            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () =>
                get().items.reduce(
                    (acc, item) => acc + parseFloat(item.price) * item.quantity,
                    0
                ),
        }),
        {
            name: "cart-storage",
        }
    )
);

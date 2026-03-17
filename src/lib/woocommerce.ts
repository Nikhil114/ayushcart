import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://example.com",
  consumerKey: process.env.WOOCOMMERCE_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_SECRET || "",
  version: "wc/v3",
});

export default api;

export async function getProducts(params = {}) {
  try {
    const response = await api.get("products", {
      per_page: 20,
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const response = await api.get("products", {
      slug,
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const response = await api.get("products/categories", {
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
export async function createOrder(data: any) {
  try {
    const response = await api.post("orders", data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

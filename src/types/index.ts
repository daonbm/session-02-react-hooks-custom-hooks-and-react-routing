export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalCount: number;
    totalAmount: number;
}

export interface CartContext {
    userId: number;
    cartName: string;
}
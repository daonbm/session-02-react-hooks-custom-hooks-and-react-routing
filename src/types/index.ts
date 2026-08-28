/**
 * Định nghĩa cấu trúc cho một sản phẩm (Product)
 */
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

/**
 * Định nghĩa cấu trúc cho một phần tử trong giỏ hàng (CartItem)
 */
export interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * Định nghĩa Cấu trúc dữ liệu và các hàm thao tác mà CartContext cung cấp
 */
export interface CartContextType {
    // Danh sách các mặt hàng hiện có trong giỏ hàng
    cartItems: CartItem[];
    // Hàm thêm sản phẩm vào giỏ hàng
    addToCart: (product: Product) => void;
    // Hàm xóa sản phẩm khỏi giỏ hàng theo ID
    removeFromCart: (productId: number) => void;
    // Hàm cập nhật số lượng của một sản phẩm trong giỏ hàng
    updateQuantity: (productId: number, quantity: number) => void;
    // Hàm làm trống giỏ hàng
    clearCart: () => void;
    // Tổng số lượng sản phẩm trong giỏ hàng
    totalCount: number;
    // Tổng giá trị đơn hàng
    totalAmount: number;
}

// Giữ lại interface CartContext cũ để tương thích (nếu có dùng ở đâu khác)
export interface CartContext {
    cartId: number;
    cartName: string;
}
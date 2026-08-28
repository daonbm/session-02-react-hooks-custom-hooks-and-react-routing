import React, { createContext, useContext, useState, useMemo } from "react";
import type { Product, CartItem, CartContextType } from "../types";

/**
 * 1. Khởi tạo Context cho Giỏ hàng bằng createContext().
 * Giá trị khởi tạo mặc định là undefined.
 * Context đóng vai trò như một "trạm trung chuyển" dữ liệu toàn cục.
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * 2. CartProvider Component: Đóng vai trò là nhà cung cấp (Provider) dữ liệu.
 * Bọc các component con bằng <CartContext.Provider value={...}> để truyền giá trị xuống dưới cây component.
 * 
 * @param children Các component con được bọc bên trong Provider
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State lưu trữ danh sách các sản phẩm đang có trong giỏ hàng
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    /**
     * Hàm thêm sản phẩm vào giỏ hàng.
     * - Nếu sản phẩm đã tồn tại trong giỏ -> tăng số lượng (quantity) thêm 1.
     * - Nếu sản phẩm chưa có trong giỏ -> thêm mới với số lượng là 1.
     * 
     * @param product Sản phẩm cần thêm vào giỏ hàng
     */
    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingItem = prevItems.find((item) => item.product.id === product.id);

            if (existingItem) {
                // Nếu đã có, tạo mảng mới và cập nhật số lượng của sản phẩm đó
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Nếu chưa có, thêm phần tử mới vào mảng
            return [...prevItems, { product, quantity: 1 }];
        });
    };

    /**
     * Hàm xóa một sản phẩm khỏi giỏ hàng dựa theo ID sản phẩm.
     * 
     * @param productId ID của sản phẩm cần xóa
     */
    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) =>
            // Sử dụng filter để loại bỏ sản phẩm có id trùng khớp
            prevItems.filter((item) => item.product.id !== productId)
        );
    };

    /**
     * Hàm cập nhật số lượng của sản phẩm trong giỏ hàng.
     * - Nếu số lượng mới <= 0 -> loại bỏ sản phẩm khỏi giỏ hàng.
     * - Ngược lại -> cập nhật số lượng mới.
     * 
     * @param productId ID của sản phẩm cần cập nhật
     * @param quantity Số lượng mới
     */
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    /**
     * Hàm làm trống (xóa toàn bộ) giỏ hàng.
     */
    const clearCart = () => {
        setCartItems([]);
    };

    /**
     * Tính tổng số lượng sản phẩm có trong giỏ hàng.
     * Tối ưu hiệu năng bằng useMemo, chỉ tính lại khi cartItems thay đổi.
     */
    const totalCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    /**
     * Tính tổng số tiền của tất cả sản phẩm trong giỏ hàng.
     * Tối ưu hiệu năng bằng useMemo, chỉ tính lại khi cartItems thay đổi.
     */
    const totalAmount = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    }, [cartItems]);

    // Giá trị (value) cung cấp cho Context
    const value: CartContextType = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * 3. Custom Hook useCart():
 * Giúp các component con dễ dàng tiêu thụ (consume) CartContext thông qua hook useContext.
 * Đồng thời kiểm tra nếu component call useCart() mà nằm ngoài <CartProvider> thì sẽ báo lỗi.
 * 
 * @returns CartContextType Giá trị dữ liệu và các thao tác giỏ hàng
 */
export const useCart = (): CartContextType => {
    // Gọi useContext để lấy dữ liệu từ CartContext
    const context = useContext(CartContext);

    // Kiểm tra xem hook có được gọi bên trong Provider không
    if (!context) {
        throw new Error("useCart phải được sử dụng bên trong <CartProvider>");
    }

    return context;
};
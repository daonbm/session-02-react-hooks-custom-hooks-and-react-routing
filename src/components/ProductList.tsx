import React from "react";
import type { Product } from "../types";
import { useCart } from "../context/CartProvider";

// Danh sách sản phẩm mẫu để hiển thị trong demo
const SAMPLE_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Tai nghe Bluetooth Sony WH-1000XM5",
        price: 8490000,
        description: "Chống ồn chủ động đỉnh cao, âm thanh chất lượng cao.",
        image: "🎧",
    },
    {
        id: 2,
        name: "Bàn phím cơ Keychron K2 Pro",
        price: 2190000,
        description: "Bàn phím cơ không dây, switch Gateron Pro Hotswap.",
        image: "⌨️",
    },
    {
        id: 3,
        name: "Chuột không dây Logitech MX Master 3S",
        price: 2450000,
        description: "Cuộn siêu tốc Quiet Clicks, cảm biến 8K DPI.",
        image: "🖱️",
    },
    {
        id: 4,
        name: "Màn hình Dell UltraSharp U2723QE 27 inch 4K",
        price: 12890000,
        description: "Công nghệ IPS Black, độ phân giải 4K HDR.",
        image: "🖥️",
    },
];

/**
 * Component ProductList: Hiển thị danh sách các sản phẩm có thể mua.
 * Khi người dùng bấm nút "Thêm vào giỏ", gọi hàm addToCart() từ CartContext.
 */
const ProductList: React.FC = () => {
    // Lấy hàm addToCart từ CartContext thông qua custom hook useCart()
    const { addToCart } = useCart();

    /**
     * Xử lý sự kiện khi người dùng click vào nút Thêm vào giỏ.
     * @param product Sản phẩm được chọn
     */
    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    /**
     * Định dạng giá tiền sang VNĐ
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>🛍️ Danh sách sản phẩm</h3>
            <div style={styles.grid}>
                {SAMPLE_PRODUCTS.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <div style={styles.icon}>{product.image}</div>
                        <h4 style={styles.productName}>{product.name}</h4>
                        <p style={styles.desc}>{product.description}</p>
                        <div style={styles.footer}>
                            <span style={styles.price}>{formatCurrency(product.price)}</span>
                            <button
                                type="button"
                                style={styles.button}
                                onClick={() => handleAddToCart(product)}
                            >
                                + Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        marginBottom: "2rem",
    },
    title: {
        fontSize: "1.2rem",
        marginBottom: "1rem",
        color: "#334155",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "1.2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    icon: {
        fontSize: "2.5rem",
        textAlign: "center",
        marginBottom: "0.5rem",
    },
    productName: {
        margin: "0 0 0.5rem 0",
        fontSize: "1rem",
        color: "#0f172a",
    },
    desc: {
        fontSize: "0.85rem",
        color: "#64748b",
        marginBottom: "1rem",
        flexGrow: 1,
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    price: {
        fontWeight: "bold",
        color: "#0284c7",
        fontSize: "1rem",
    },
    button: {
        backgroundColor: "#0284c7",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.2s",
    },
};

export default ProductList;

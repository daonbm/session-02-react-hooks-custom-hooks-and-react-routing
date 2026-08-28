import React from "react";
import { useCart } from "../context/CartProvider";

/**
 * Component CartSummary: Hiển thị tóm tắt giỏ hàng trên thanh tiêu đề/header.
 * Sử dụng custom hook useCart() để lấy totalCount và totalAmount từ CartContext.
 */
const CartSummary: React.FC = () => {
    // Lấy dữ liệu tổng số lượng và tổng tiền từ CartContext bằng hook useCart
    const { totalCount, totalAmount } = useCart();

    /**
     * Hàm định dạng số tiền sang định dạng tiền tệ VNĐ.
     * @param amount Số tiền cần định dạng
     * @returns Chuỗi định dạng tiền (VD: 150.000 ₫)
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>🛒 React useContext Shopping Demo</div>
            <div style={styles.summaryBadge}>
                <span>Tổng sản phẩm: <strong>{totalCount}</strong></span>
                <span style={{ marginLeft: "15px" }}>
                    Tổng tiền: <strong>{formatCurrency(totalAmount)}</strong>
                </span>
            </div>
        </header>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    logo: {
        fontSize: "1.25rem",
        fontWeight: "bold",
    },
    summaryBadge: {
        backgroundColor: "#334155",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        fontSize: "0.95rem",
    },
};

export default CartSummary;

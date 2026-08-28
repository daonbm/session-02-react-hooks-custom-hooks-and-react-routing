import React from "react";
import { useCart } from "../context/CartProvider";

/**
 * Component CartView: Hiển thị chi tiết các phần tử có trong giỏ hàng.
 * Cho phép tăng/giảm số lượng, xóa từng mặt hàng hoặc làm trống toàn bộ giỏ hàng.
 */
const CartView: React.FC = () => {
    // Lấy các state và function từ CartContext qua custom hook useCart()
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();

    /**
     * Định dạng tiền tệ VNĐ
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    /**
     * Xử lý khi người dùng nhấn nút tăng số lượng sản phẩm (+1)
     * @param productId ID sản phẩm
     * @param currentQty Số lượng hiện tại
     */
    const handleIncrease = (productId: number, currentQty: number) => {
        updateQuantity(productId, currentQty + 1);
    };

    /**
     * Xử lý khi người dùng nhấn nút giảm số lượng sản phẩm (-1)
     * @param productId ID sản phẩm
     * @param currentQty Số lượng hiện tại
     */
    const handleDecrease = (productId: number, currentQty: number) => {
        updateQuantity(productId, currentQty - 1);
    };

    /**
     * Xử lý khi người dùng bấm nút xóa sản phẩm khỏi giỏ hàng
     * @param productId ID sản phẩm
     */
    const handleRemove = (productId: number) => {
        removeFromCart(productId);
    };

    /**
     * Xử lý khi bấm xóa toàn bộ giỏ hàng
     */
    const handleClearAll = () => {
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <div style={styles.emptyCart}>
                <p>🛒 Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm ở trên!</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <h3 style={styles.title}>📦 Chi tiết giỏ hàng</h3>
                <button type="button" style={styles.clearBtn} onClick={handleClearAll}>
                    🗑️ Xóa toàn bộ giỏ hàng
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr style={styles.thRow}>
                        <th style={styles.th}>Sản phẩm</th>
                        <th style={styles.th}>Đơn giá</th>
                        <th style={styles.th}>Số lượng</th>
                        <th style={styles.th}>Thành tiền</th>
                        <th style={styles.th}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.product.id} style={styles.tr}>
                            <td style={styles.td}>
                                <span style={{ marginRight: "8px" }}>{item.product.image}</span>
                                {item.product.name}
                            </td>
                            <td style={styles.td}>{formatCurrency(item.product.price)}</td>
                            <td style={styles.td}>
                                <div style={styles.qtyBox}>
                                    <button
                                        type="button"
                                        style={styles.qtyBtn}
                                        onClick={() => handleDecrease(item.product.id, item.quantity)}
                                    >
                                        -
                                    </button>
                                    <span style={styles.qtyText}>{item.quantity}</span>
                                    <button
                                        type="button"
                                        style={styles.qtyBtn}
                                        onClick={() => handleIncrease(item.product.id, item.quantity)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td style={styles.td}>
                                <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                            </td>
                            <td style={styles.td}>
                                <button
                                    type="button"
                                    style={styles.deleteBtn}
                                    onClick={() => handleRemove(item.product.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={styles.totalRow}>
                <span>Tổng tiền cần thanh toán:</span>
                <span style={styles.totalPrice}>{formatCurrency(totalAmount)}</span>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "1.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e2e8f0",
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
    },
    title: {
        margin: 0,
        color: "#334155",
    },
    clearBtn: {
        backgroundColor: "#ef4444",
        color: "#ffffff",
        border: "none",
        padding: "0.4rem 0.8rem",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.85rem",
    },
    emptyCart: {
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        color: "#64748b",
        border: "1px dashed #cbd5e1",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem",
    },
    thRow: {
        backgroundColor: "#f1f5f9",
    },
    th: {
        padding: "0.75rem",
        textAlign: "left",
        fontSize: "0.9rem",
        color: "#475569",
        borderBottom: "1px solid #e2e8f0",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
    },
    td: {
        padding: "0.75rem",
        fontSize: "0.9rem",
        color: "#1e293b",
    },
    qtyBox: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    qtyBtn: {
        width: "28px",
        height: "28px",
        backgroundColor: "#e2e8f0",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    qtyText: {
        fontWeight: "bold",
        minWidth: "20px",
        textAlign: "center",
    },
    deleteBtn: {
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        border: "none",
        padding: "0.3rem 0.6rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "0.8rem",
    },
    totalRow: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "1rem",
        fontSize: "1.1rem",
        fontWeight: "bold",
        paddingTop: "1rem",
        borderTop: "2px solid #e2e8f0",
    },
    totalPrice: {
        color: "#059669",
        fontSize: "1.3rem",
    },
};

export default CartView;

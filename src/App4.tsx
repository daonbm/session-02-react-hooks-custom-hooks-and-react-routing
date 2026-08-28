import React from "react";
import { CartProvider } from "./context/CartProvider";
import CartSummary from "./components/CartSummary";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";

/**
 * Component App4: Demo useContext trong React.
 * 
 * Mô hình dữ liệu:
 * <CartProvider> (Chứa State & Logic xử lý giỏ hàng)
 *   ├── <CartSummary /> (Component con đọc tổng số lượng và tiền)
 *   ├── <ProductList /> (Component con gọi hàm thêm vào giỏ)
 *   └── <CartView /> (Component con xem giỏ hàng, tăng/giảm/xóa sản phẩm)
 * 
 * Lưu ý: Nhờ có useContext, các component con ở bất kỳ cấp độ nào
 * đều có thể truy cập trực tiếp dữ liệu từ CartProvider mà không cần prop-drilling!
 */
const App4: React.FC = () => {
    return (
        /* Bọc toàn bộ ứng dụng (hoặc phần cần dùng context) trong CartProvider */
        <CartProvider>
            <div style={styles.appContainer}>
                {/* 1. Header tóm tắt trạng thái giỏ hàng */}
                <CartSummary />

                <main style={styles.mainContent}>
                    {/* 2. Danh sách sản phẩm để thêm vào giỏ */}
                    <ProductList />

                    {/* 3. Chi tiết giỏ hàng và thanh toán */}
                    <CartView />
                </main>
            </div>
        </CartProvider>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    appContainer: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
    },
    mainContent: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
};

export default App4;

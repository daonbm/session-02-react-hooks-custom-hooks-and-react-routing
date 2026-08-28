import React from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToggle } from "./hooks/useToggle";

/**
 * Component App8: Ví dụ minh họa sử dụng Custom Hooks trong React.
 * 
 * KHÁI NIỆM CUSTOM HOOK:
 * - Custom Hook là một hàm JavaScript có tên bắt đầu bằng "use..." (VD: useLocalStorage, useToggle).
 * - Cho phép đóng gói và tái sử dụng logic xử lý state (stateful logic) giữa các component khác nhau.
 * - Có thể gọi các React Built-in Hooks khác (useState, useEffect, useCallback,...) bên trong Custom Hook.
 */
const App8: React.FC = () => {
    // ------------------------------------------------------------------------
    // 1. Sử dụng Custom Hook `useLocalStorage`
    // Tự động lưu giá trị tên người dùng vào localStorage dưới key "username_demo"
    // ------------------------------------------------------------------------
    const [name, setName] = useLocalStorage<string>("username_demo", "Nguyễn Văn A");

    // ------------------------------------------------------------------------
    // 2. Sử dụng Custom Hook `useToggle`
    // Đơn giản hóa việc ẩn/hiện mật khẩu hoặc ghi chú
    // ------------------------------------------------------------------------
    const [isVisible, toggleVisible] = useToggle(true);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>⚡ Demo Custom Hooks Nhỏ Gọn & Tái Sử Dụng</h2>
            <p style={styles.desc}>
                Custom Hooks giúp đóng gói logic xử lý state và tái sử dụng cực kỳ dễ dàng.
            </p>

            {/* ============================================================= */}
            {/* VÍ DỤ 1: DEMO USELOCALSTORAGE                                 */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>1️⃣ Custom Hook: <code>useLocalStorage</code></h3>
                <p style={styles.subNote}>
                    Nhập tên bên dưới và thử bấm <strong>F5 (Tải lại trang)</strong>. Tên của bạn vẫn sẽ được lưu trữ nhờ localStorage!
                </p>

                <div style={styles.inputRow}>
                    <label style={styles.label}>Tên của bạn:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên..."
                        style={styles.input}
                    />
                </div>

                <div style={styles.resultBox}>
                    👋 Xin chào: <strong>{name}</strong>
                </div>
            </div>

            {/* ============================================================= */}
            {/* VÍ DỤ 2: DEMO USETOGGLE                                       */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>2️⃣ Custom Hook: <code>useToggle</code></h3>
                
                <button type="button" onClick={toggleVisible} style={styles.primaryBtn}>
                    {isVisible ? "🙈 Ẩn nội dung bí mật" : "👁️ Hiện nội dung bí mật"}
                </button>

                {isVisible && (
                    <div style={styles.secretBox}>
                        🔑 <strong>Nội dung bí mật:</strong> Đây là nội dung được điều khiển ẩn/hiện bằng custom hook <code>useToggle()</code>!
                    </div>
                )}
            </div>

            {/* GHI CHÚ BÀI HỌC */}
            <div style={styles.explanation}>
                📌 <strong>Quy tắc viết Custom Hook:</strong><br />
                - Tên hàm bắt đầu bằng tiền tố <code>use...</code> (VD: <code>useLocalStorage</code>).<br />
                - Không trả về JSX, chỉ trả về dữ liệu (state) hoặc hàm thao tác.<br />
                - Giúp mã nguồn sạch sẽ, tách biệt phần Logic và phần Giao diện (UI).
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        color: "#0f172a",
        fontSize: "1.3rem",
        textAlign: "center",
        marginBottom: "0.25rem",
    },
    desc: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "0.9rem",
        marginBottom: "1.5rem",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "1.25rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        marginBottom: "1rem",
    },
    cardTitle: {
        margin: "0 0 0.5rem 0",
        fontSize: "1rem",
        color: "#1e293b",
    },
    subNote: {
        fontSize: "0.85rem",
        color: "#64748b",
        marginBottom: "1rem",
        lineHeight: "1.4",
    },
    inputRow: {
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        marginBottom: "1rem",
    },
    label: {
        fontSize: "0.9rem",
        fontWeight: "bold",
        color: "#334155",
    },
    input: {
        padding: "0.6rem 0.8rem",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        fontSize: "0.95rem",
    },
    resultBox: {
        padding: "0.8rem",
        backgroundColor: "#f0f9ff",
        borderRadius: "6px",
        color: "#0369a1",
        fontSize: "1rem",
    },
    primaryBtn: {
        backgroundColor: "#0284c7",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "0.75rem",
    },
    secretBox: {
        padding: "0.8rem",
        backgroundColor: "#fef3c7",
        borderLeft: "4px solid #f59e0b",
        borderRadius: "4px",
        color: "#92400e",
        fontSize: "0.9rem",
    },
    explanation: {
        padding: "0.75rem",
        backgroundColor: "#f1f5f9",
        borderLeft: "4px solid #475569",
        borderRadius: "4px",
        fontSize: "0.85rem",
        color: "#334155",
        lineHeight: "1.5",
    },
};

export default App8;

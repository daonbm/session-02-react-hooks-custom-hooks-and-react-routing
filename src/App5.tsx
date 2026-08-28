import React, { useState, useCallback } from "react";

// ============================================================================
// 1. COMPONENT CON ĐƯỢC BỌC BỞI REACT.MEMO
// ============================================================================

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

/**
 * Component Nút Bấm Con (ChildButton) được bọc bởi React.memo.
 * React.memo giúp component chỉ re-render lại khi props (onClick, children) thay đổi.
 */
const ChildButton: React.FC<ButtonProps> = React.memo(({ onClick, children }) => {
    console.log(`[React.memo] ChildButton "${children}" vừa re-render!`);

    return (
        <button
            type="button"
            onClick={onClick}
            style={styles.button}
        >
            {children}
        </button>
    );
});

// ============================================================================
// 2. COMPONENT CHA APP5 (DEMO USECALLBACK)
// ============================================================================

/**
 * Component App5: Ví dụ nhỏ gọn, đơn lẻ về useCallback.
 * 
 * Bài toán:
 * Component App5 có 2 state độc lập: `count` (số đếm) và `text` (văn bản nhập vào).
 * 
 * - Nếu KHÔNG dùng useCallback: Mỗi khi gõ chữ vào ô input -> state `text` thay đổi -> App5 re-render ->
 *   Hàm `handleIncrement` bị tạo lại tham chiếu mới -> `ChildButton` nhận prop onClick mới -> ChildButton re-render thừa!
 * 
 * - Khi DÙNG useCallback: Bọc `handleIncrement` trong useCallback(..., []).
 *   Gõ chữ vào ô input -> state `text` thay đổi -> App5 re-render -> Hàm `handleIncrement` GIỮ NGUYÊN THAM CHIẾU cũ ->
 *   `ChildButton` nhận prop onClick không đổi -> ChildButton KHÔNG BỊ RE-RENDER THỪA!
 */
const App5: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>("");

    /**
     * DÙNG USECALLBACK ĐỂ MEMOIZE HÀM:
     * useCallback giữ nguyên tham chiếu (reference) của hàm handleIncrement giữa các lần re-render.
     * Mảng phụ thuộc [] rỗng giúp hàm này chỉ tạo 1 lần duy nhất khi component mount.
     */
    const handleIncrement = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []); // Mảng phụ thuộc rỗng -> giữ nguyên tham chiếu hàm vĩnh viễn

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>⚡ Demo useCallback Nhỏ Gọn & Đơn Lẻ</h2>
            <p style={styles.desc}>
                Mở Console trình duyệt (F12) để kiểm tra log re-render của <code>ChildButton</code>!
            </p>

            <div style={styles.card}>
                <h3 style={{ margin: "0 0 1rem 0" }}>
                    Count: <span style={{ color: "#0284c7" }}>{count}</span>
                </h3>

                {/* Truyền callback đã được memoize xuống component con */}
                <ChildButton onClick={handleIncrement}>
                    ➕ Tăng số đếm (+1)
                </ChildButton>

                <hr style={styles.hr} />

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Thử gõ chữ vào ô bên dưới (thay đổi state text):</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Gõ chữ ở đây để test..."
                        style={styles.input}
                    />
                    <p style={styles.textOutput}>Văn bản nhập vào: <strong>{text}</strong></p>
                </div>

                <div style={styles.explanation}>
                    📌 <strong>Giải thích cơ chế:</strong><br />
                    - Khi bạn nhập dữ liệu vào ô input, state <code>text</code> thay đổi khiến component <code>App5</code> re-render.<br />
                    - Nhờ có <code>useCallback</code> bọc hàm <code>handleIncrement</code> và <code>React.memo</code> bọc <code>ChildButton</code>, nút bấm <strong>ChildButton KHÔNG bị re-render lại</strong>!
                </div>
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
        marginBottom: "0.5rem",
    },
    desc: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "0.9rem",
        marginBottom: "1.5rem",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
    },
    button: {
        backgroundColor: "#0284c7",
        color: "#ffffff",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "6px",
        fontSize: "0.95rem",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.2s",
    },
    hr: {
        margin: "1.5rem 0",
        border: "none",
        borderTop: "1px solid #e2e8f0",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    label: {
        fontSize: "0.9rem",
        fontWeight: "bold",
        color: "#334155",
    },
    input: {
        padding: "0.6rem",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        fontSize: "0.95rem",
    },
    textOutput: {
        fontSize: "0.9rem",
        color: "#475569",
    },
    explanation: {
        marginTop: "1rem",
        padding: "0.8rem",
        backgroundColor: "#f0f9ff",
        borderLeft: "4px solid #0284c7",
        borderRadius: "4px",
        fontSize: "0.85rem",
        color: "#0369a1",
        lineHeight: "1.5",
    },
};

export default App5;

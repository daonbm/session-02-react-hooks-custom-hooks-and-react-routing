import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

/**
 * Component App7: Ví dụ nhỏ gọn về useLayoutEffect trong React.
 * 
 * SO SÁNH GIỮA USEEFFECT VÀ USELAYOUTEFFECT:
 * 
 * 1. useEffect (Bất đồng bộ - Asynchronous):
 *    - Thứ tự: Render -> Vẽ giao diện lên màn hình (Paint) -> Chạy useEffect.
 *    - Nhược điểm: Nếu trong useEffect ta sửa đổi DOM hoặc State, người dùng có thể thấy
 *      hiệu ứng "chớp giật" (flicker) do màn hình đã lỡ vẽ trước đó.
 * 
 * 2. useLayoutEffect (Đồng bộ - Synchronous):
 *    - Thứ tự: Render -> Chạy useLayoutEffect -> Mới vẽ giao diện lên màn hình (Paint).
 *    - Ưu điểm: Chạy trước khi browser kịp vẽ giao diện lên màn hình. Thích hợp để đo đạc kích thước DOM
 *      (getBoundingClientRect), tính vị trí Tooltip, hoặc sửa giá trị State tránh bị chớp màn hình.
 */
const App7: React.FC = () => {
    // ------------------------------------------------------------------------
    // DEMO 1: SO SÁNH CHỚP MÀN HÌNH KHI ĐẾM VƯỢT NGƯỠNG (COUNT > 3)
    // ------------------------------------------------------------------------
    const [countEffect, setCountEffect] = useState<number>(0);
    const [countLayout, setCountLayout] = useState<number>(0);

    /**
     * Dùng useEffect: Khi countEffect > 3 -> reset về 0.
     * Vì useEffect chạy SAU KHI browser đã vẽ lên màn hình,
     * số 4 sẽ xuất hiện chớp giật trong tích tắc rồi mới biến thành 0.
     */
    useEffect(() => {
        if (countEffect > 3) {
            setCountEffect(0);
        }
    }, [countEffect]);

    /**
     * Dùng useLayoutEffect: Khi countLayout > 3 -> reset về 0.
     * Vì useLayoutEffect chạy TRƯỚC KHI browser kịp vẽ lên màn hình,
     * người dùng KHÔNG BAO GIỜ nhìn thấy số 4 xuất hiện (nó nhảy trực tiếp từ 3 -> 0 mượt mà).
     */
    useLayoutEffect(() => {
        if (countLayout > 3) {
            setCountLayout(0);
        }
    }, [countLayout]);

    // ------------------------------------------------------------------------
    // DEMO 2: ĐO KÍCH THƯỚC DOM VÀ CẬP NHẬT GIAO DIỆN TRƯỚC KHI PAINT
    // ------------------------------------------------------------------------
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxWidth, setBoxWidth] = useState<number>(0);

    /**
     * Đo chiều rộng của hộp thoại ngay trước khi hiển thị ra màn hình
     */
    useLayoutEffect(() => {
        if (boxRef.current) {
            // Lấy kích thước thật của phần tử DOM
            const rect = boxRef.current.getBoundingClientRect();
            setBoxWidth(Math.round(rect.width));
        }
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>⚡ Demo useLayoutEffect vs useEffect</h2>
            <p style={styles.desc}>
                Quan sát sự khác biệt về thời điểm thực thi và hiệu ứng chớp giao diện (flicker).
            </p>

            {/* ============================================================= */}
            {/* THỬ NGHIỆM 1: ĐẾM VƯỢT NGƯỠNG (CHỚP MÀN HÌNH VS MƯỢT MÀ)    */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>1️⃣ Kiểm tra Chớp Giao Diện (Count &gt; 3 thì Reset về 0)</h3>
                
                <div style={styles.grid}>
                    {/* BÊN TẠO BỞI USEEFFECT */}
                    <div style={styles.subBoxEffect}>
                        <h4 style={{ margin: "0 0 0.5rem 0", color: "#dc2626" }}>useEffect (Có thể bị chớp)</h4>
                        <div style={styles.numberDisplay}>{countEffect}</div>
                        <button
                            type="button"
                            onClick={() => setCountEffect((prev) => prev + 1)}
                            style={styles.dangerBtn}
                        >
                            ➕ Tăng ({countEffect})
                        </button>
                        <p style={styles.subNote}>
                            Khi bấm liên tục lên 4, bạn có thể nhìn thấy số <strong>4</strong> nhấp nháy chớp rồi mới về 0.
                        </p>
                    </div>

                    {/* BÊN TẠO BỞI USELAYOUTEFFECT */}
                    <div style={styles.subBoxLayout}>
                        <h4 style={{ margin: "0 0 0.5rem 0", color: "#16a34a" }}>useLayoutEffect (Mượt tuyệt đối)</h4>
                        <div style={styles.numberDisplay}>{countLayout}</div>
                        <button
                            type="button"
                            onClick={() => setCountLayout((prev) => prev + 1)}
                            style={styles.successBtn}
                        >
                            ➕ Tăng ({countLayout})
                        </button>
                        <p style={styles.subNote}>
                            Khi bấm liên tục lên 4, số 4 <strong>KHÔNG BAO GIỜ xuất hiện</strong>, nhảy thẳng từ 3 về 0.
                        </p>
                    </div>
                </div>
            </div>

            {/* ============================================================= */}
            {/* THỬ NGHIỆM 2: ĐO KÍCH THƯỚC DOM TRƯỚC KHI BROWSER PAINT        */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>2️⃣ Đo đạc DOM (BoundingClientRect) trước khi hiển thị</h3>
                
                <div ref={boxRef} style={styles.measuredBox}>
                    📦 Khối này đang có chiều rộng đo được là: <strong>{boxWidth}px</strong>
                </div>

                <div style={styles.explanation}>
                    📌 <strong>Quy trình hoạt động:</strong><br />
                    1. <code>Render</code> $\rightarrow$ Tạo DOM ngầm trong bộ nhớ.<br />
                    2. <code>useLayoutEffect</code> $\rightarrow$ Chạy đồng bộ, đo <code>getBoundingClientRect()</code> và cập nhật State.<br />
                    3. <code>Paint</code> $\rightarrow$ Trình duyệt vẽ giao diện ra màn hình (User chỉ thấy kết quả đã tính xong).
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "650px",
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
        margin: "0 0 1rem 0",
        fontSize: "1rem",
        color: "#1e293b",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
    },
    subBoxEffect: {
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
    },
    subBoxLayout: {
        backgroundColor: "#f0fdf4",
        border: "1px solid #bbf7d0",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
    },
    numberDisplay: {
        fontSize: "2rem",
        fontWeight: "bold",
        margin: "0.5rem 0",
    },
    dangerBtn: {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        width: "100%",
    },
    successBtn: {
        backgroundColor: "#16a34a",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        width: "100%",
    },
    subNote: {
        fontSize: "0.8rem",
        color: "#475569",
        marginTop: "0.5rem",
    },
    measuredBox: {
        padding: "1rem",
        backgroundColor: "#e0f2fe",
        border: "1px dashed #0284c7",
        borderRadius: "6px",
        color: "#0369a1",
        textAlign: "center",
        marginBottom: "1rem",
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

export default App7;

import React, { useState, useRef, useEffect } from "react";

/**
 * Component App6: Ví dụ nhỏ gọn, chi tiết về useRef trong React.
 * 
 * useRef được sử dụng trong 2 trường hợp chính:
 * 1. Truy cập trực tiếp phần tử DOM (như input.focus(), scroll, lấy kích thước,...).
 * 2. Lưu trữ một biến có thể thay đổi (mutable value) qua các lần re-render
 *    mà KHI THAY ĐỔI GIÁ TRỊ ĐÓ KHÔNG LÀM COMPONENT RE-RENDER.
 */
const App6: React.FC = () => {
    // ------------------------------------------------------------------------
    // THÀNH PHẦN 1: State thông thường (mỗi khi thay đổi -> làm component re-render)
    // ------------------------------------------------------------------------
    const [text, setText] = useState<string>("");
    const [timer, setTimer] = useState<number>(0);

    // ------------------------------------------------------------------------
    // THÀNH PHẦN 2: useRef dùng cho 2 mục đích
    // ------------------------------------------------------------------------

    /**
     * TH1: Dùng useRef để tham chiếu đến phần tử DOM (HTMLInputElement).
     * Giúp ta tương tác trực tiếp với DOM (VD: focus, blur, select).
     */
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * TH2: Dùng useRef để lưu trữ ID của timer (setInterval) và số lần Render.
     * Cực kỳ hữu ích vì cập nhật ref.current KHÔNG làm re-render component,
     * giữ nguyên giá trị qua mỗi lần component re-render.
     */
    const timerIdRef = useRef<number | null>(null);
    const renderCountRef = useRef<number>(1);

    // Đếm số lần App6 re-render (Mỗi khi re-render -> tăng count thêm 1)
    useEffect(() => {
        renderCountRef.current += 1;
    });

    // ------------------------------------------------------------------------
    // CÁC HÀM XỬ LÝ
    // ------------------------------------------------------------------------

    /**
     * Hàm Focus vào ô Input sử dụng DOM Reference
     */
    const handleFocusInput = () => {
        // inputRef.current trỏ trực tiếp tới phần tử <input> trên trang
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.style.border = "2px solid #0284c7";
        }
    };

    /**
     * Hàm Xóa văn bản và Focus lại ô Input
     */
    const handleClearInput = () => {
        setText("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    /**
     * Hàm Bắt đầu Bộ đếm thời gian (Start Timer)
     */
    const handleStartTimer = () => {
        if (timerIdRef.current !== null) return; // Nếu đang chạy thì không tạo thêm interval mới

        timerIdRef.current = window.setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    };

    /**
     * Hàm Dừng Bộ đếm thời gian (Stop Timer)
     */
    const handleStopTimer = () => {
        if (timerIdRef.current !== null) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null; // Reset ref về null
        }
    };

    /**
     * Hàm Reset Bộ đếm thời gian
     */
    const handleResetTimer = () => {
        handleStopTimer();
        setTimer(0);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>⚡ Demo useRef Nhỏ Gọn & Thực Tế</h2>
            <p style={styles.desc}>
                Số lần Component <code>App6</code> đã Re-render: <strong style={{ color: "#ef4444" }}>{renderCountRef.current}</strong>
            </p>

            {/* ============================================================= */}
            {/* VÍ DỤ 1: TRUY CẬP PHẦN TỬ DOM TRỰC TIẾP                       */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>1️⃣ Dùng useRef truy cập phần tử DOM (Input Focus)</h3>
                
                <div style={styles.inputRow}>
                    {/* Gắn ref={inputRef} để React trỏ inputRef.current tới DOM node này */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nhập chữ vào đây..."
                        style={styles.input}
                    />
                    <button type="button" onClick={handleFocusInput} style={styles.primaryBtn}>
                        🔍 Focus Ô Input
                    </button>
                    <button type="button" onClick={handleClearInput} style={styles.secondaryBtn}>
                        🧹 Xóa & Focus
                    </button>
                </div>
            </div>

            {/* ============================================================= */}
            {/* VÍ DỤ 2: LƯU BIẾN THAY ĐỔI MÀ KHÔNG LÀM RE-RENDER (TIMER)     */}
            {/* ============================================================= */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>2️⃣ Dùng useRef lưu ID Timer (Mutable Value)</h3>
                
                <div style={styles.timerDisplay}>
                    ⏱️ Thời gian: <strong style={{ fontSize: "1.5rem", color: "#0284c7" }}>{timer}s</strong>
                </div>

                <div style={styles.btnRow}>
                    <button type="button" onClick={handleStartTimer} style={styles.successBtn}>
                        ▶️ Bắt đầu (Start)
                    </button>
                    <button type="button" onClick={handleStopTimer} style={styles.dangerBtn}>
                        ⏸️ Tạm dừng (Stop)
                    </button>
                    <button type="button" onClick={handleResetTimer} style={styles.secondaryBtn}>
                        🔄 Đặt lại (Reset)
                    </button>
                </div>

                <div style={styles.note}>
                    📌 <strong>Lưu ý:</strong> ID của <code>setInterval</code> được lưu trong <code>timerIdRef.current</code>.<br />
                    Khi ta thay đổi <code>timerIdRef.current</code>, giao diện <strong>KHÔNG bị re-render thừa</strong> như khi dùng State.
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
    inputRow: {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
    },
    input: {
        flexGrow: 1,
        padding: "0.5rem 0.8rem",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        fontSize: "0.95rem",
        outline: "none",
    },
    primaryBtn: {
        backgroundColor: "#0284c7",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    secondaryBtn: {
        backgroundColor: "#e2e8f0",
        color: "#334155",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    timerDisplay: {
        marginBottom: "1rem",
        fontSize: "1.1rem",
        color: "#334155",
    },
    btnRow: {
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1rem",
    },
    successBtn: {
        backgroundColor: "#16a34a",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    dangerBtn: {
        backgroundColor: "#dc2626",
        color: "#ffffff",
        border: "none",
        padding: "0.5rem 0.8rem",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    note: {
        padding: "0.75rem",
        backgroundColor: "#fffbe6",
        borderLeft: "4px solid #f59e0b",
        borderRadius: "4px",
        fontSize: "0.85rem",
        color: "#78350f",
        lineHeight: "1.4",
    },
};

export default App6;

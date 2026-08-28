import { useState, useEffect } from "react";

/**
 * Custom Hook: useLocalStorage
 * 
 * Mục đích: Quản lý state và tự động đồng bộ giá trị với localStorage của trình duyệt.
 * Khi trang web được tải lại (F5), giá trị state sẽ tự động khôi phục từ localStorage.
 * 
 * @param key Tên khóa lưu trong localStorage
 * @param initialValue Giá trị khởi tạo mặc định nếu chưa có trong localStorage
 * @returns [value, setValue] Mảng chứa giá trị state hiện tại và hàm cập nhật
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // 1. Khởi tạo state bằng Lazy Initialization (chỉ đọc localStorage ở lần render đầu tiên)
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Nếu đã có giá trị trong localStorage -> parse JSON và trả về
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Lỗi khi đọc localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // 2. Theo dõi sự thay đổi của storedValue hoặc key để lưu vào localStorage
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Lỗi khi ghi localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

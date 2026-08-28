import { useState, useCallback } from "react";

/**
 * Custom Hook: useToggle
 * 
 * Mục đích: Đơn giản hóa việc bật/tắt (toggle) một giá trị boolean (true/false).
 * Thích hợp cho Modal, Checkbox, Dark/Light Mode, Show/Hide Password,...
 * 
 * @param initialValue Giá trị ban đầu (mặc định là false)
 * @returns [value, toggle, setValue]
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
    const [value, setValue] = useState<boolean>(initialValue);

    // Dùng useCallback để giữ nguyên tham chiếu của hàm toggle
    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return [value, toggle, setValue];
}

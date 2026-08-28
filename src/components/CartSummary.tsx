import React from "react";
import { useCart } from "../context/CartProvider";

const CartSummary: React.FC = () => {
  const { totalCount, totalAmount } = useCart();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <header>
      <h2>React Shopping Cart</h2>
      <div>
        <span>
          Tổng sản phẩm: <strong>{totalCount}</strong>
        </span>
        <span style={{ marginLeft: "15px" }}>
          Tổng tiền: <strong>{formatCurrency(totalAmount)}</strong>
        </span>
      </div>
    </header>
  );
};

export default CartSummary;

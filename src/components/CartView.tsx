import React from "react";
import { useCart } from "../context/CartProvider";

const CartView: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } =
    useCart();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleIncrease = (productId: number, currentQty: number) => {
    updateQuantity(productId, currentQty + 1);
  };

  const handleDecrease = (productId: number, currentQty: number) => {
    updateQuantity(productId, currentQty - 1);
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearAll = () => {
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm!</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h3>Chi tiết giỏ hàng</h3>
        <button type="button" onClick={handleClearAll}>
          Xóa toàn bộ giỏ hàng
        </button>

        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id}>
                <td>
                  <span>{item.product.image}</span>
                  {item.product.name}
                </td>
                <td>{formatCurrency(item.product.price)}</td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        handleDecrease(item.product.id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrease(item.product.id, item.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <strong>
                    {formatCurrency(item.product.price * item.quantity)}
                  </strong>
                </td>
                <td>
                  <button onClick={() => handleRemove(item.product.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <span>Tổng tiền cần thanh toán: </span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </>
  );
};

export default CartView;

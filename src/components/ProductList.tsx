import { useCart } from "../context/CartProvider";
import type { Product } from "../types";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tai nghe",
    price: 150,
    description: "Tai nghe chống ồn",
    image: "",
  },
  {
    id: 2,
    name: "Laptop",
    price: 1500,
    description: "Laptop Gaming",
    image: "",
  },
  {
    id: 3,
    name: "Chuột laptop",
    price: 300,
    description: "Chuột không dây",
    image: "",
  },
  {
    id: 4,
    name: "Cục sạc",
    price: 200,
    description: "Cục sạc dự phòng",
    image: "",
  },
];

const ProductList: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <h3>Danh sách sản phẩm</h3>
      <div>
        {SAMPLE_PRODUCTS.map((product) => (
          <>
            <div key={product.id}>
              <div>{product.image}</div>
              <div>{product.name}</div>
              <div>{product.description}</div>
              <div>
                <span>{formatCurrency(product.price)}</span>
                <button onClick={() => handleAddToCart(product)}>
                  + Thêm vào giỏ hàng
                </button>
              </div>
            </div>
            <br />
          </>
        ))}
      </div>
    </>
  );
};

export default ProductList;

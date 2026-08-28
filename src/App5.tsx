import React, { useCallback, useState } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ChildButton: React.FC<ButtonProps> = React.memo(
  ({ onClick, children }) => {
    console.log(`[React.memo] ChildButton "${children}" vừa re-render`);

    return <button onClick={onClick}>{children}</button>;
  },
);

const App5: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

//   const handleIncrement = () => {
//     setCount((prevCount) => prevCount + 1);
//   };

    const handleIncrement = useCallback(() => {
      setCount((prevCount) => prevCount + 1);
    }, []);

  return (
    <>
      <h3>Count: {count}</h3>

      <ChildButton onClick={handleIncrement}>Tăng số đếm (+1)</ChildButton>
      <br />

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Gõ chữ để test"
        />
        <p>
          Văn bản vừa nhập vào: <strong>{text}</strong>
        </p>
      </div>
    </>
  );
};

export default App5;

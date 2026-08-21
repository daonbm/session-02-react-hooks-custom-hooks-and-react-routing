import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <section id="center">
        <h1>Counting App</h1>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          +
        </button>

        <span> Count is {count} </span>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count - 1)}
        >
          -
        </button>
      </section>
    </>
  );
}

export default App;

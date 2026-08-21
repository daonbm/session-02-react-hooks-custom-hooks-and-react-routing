import React, { useEffect, useState } from 'react'

const App2: React.FC = () => {
    const [rectangle, setRectangle] = useState<{width: number, height: number}>({
        width: 0,
        height: 0
    });
    const [area, setArea] = useState<number>(0);

    useEffect(() => {
        const newArea = rectangle.width * rectangle.height;
        setArea(newArea);
    }, [rectangle.width, rectangle.height]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target;
      console.log(e.target);
      console.log("name: " + name);
      console.log("value: " + value);

      setRectangle((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(rectangle);
    };

  return (
    <>
      <h2>Calculate Rectangle Area: </h2>
      <input placeholder="Enter width" name="width" onChange={handleChange} />
      <br />
      <input placeholder="Enter height" name="height" onChange={handleChange} />
      <br />
      <p>Rectangle Area: {area}</p>
    </>
  );
}

export default App2;
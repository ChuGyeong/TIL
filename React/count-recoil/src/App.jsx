import React from "react";
import { useRecoilState } from "recoil";
import { countState } from "./atom";

const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div
      style={{
        width: "500px",
        margin: "auto",
      }}>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>{count}</div>
    </div>
  );
};

const DisplayCounter = () => {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div
      style={{
        width: "500px",
        margin: "100px auto",
        fontSize: 30,
      }}>
      <div>{count}</div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter />
      <DisplayCounter />
    </div>
  );
};

export default App;

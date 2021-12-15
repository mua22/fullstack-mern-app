import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Counter from "./components/examples/Counter";
import CounterSrtatus from "./components/examples/CounterStatus";

function App() {
  const [count, setCount] = React.useState(8);
  const countUp = () => {
    setCount(count + 1);
    // count = count + 1;
    // alert("count valus is " + count);
  };
  const countDown = () => {
    setCount(count - 1);
    // count = count - 1;
    // alert("count valus is " + count);
  };
  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <Counter
        color="red"
        count={count}
        countUp={countUp}
        countDown={countDown}
        setCount={setCount}
      />
      <hr />
      <CounterSrtatus count={count} />
      {/* <Counter color="orange" initialValue="66" /> */}
    </div>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import { addToCountByOne } from "../Store/Slices/counterSlice.js";

function CounterTest() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);

  const countFunction = () => {
    dispatch(addToCountByOne());
  };

  return (
    <>
      <h3>Just testing redux</h3>

      <button onClick={countFunction}>Count +1</button>

      <p>Count: {count}</p>
    </>
  );
}

export default CounterTest;

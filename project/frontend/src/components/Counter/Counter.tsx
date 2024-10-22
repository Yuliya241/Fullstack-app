import { ChangeEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = ({ value }: { value: number }) => {
  const [counter, setCounter] = useState(value);

  const increase = () => {
    if (counter !== 100) {
      setCounter(counter + 1);
    }
  };

  const decrease = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>): void => {
    setCounter(+e.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <div className="counter-container">
          <button
            aria-label="subtract"
            className="counter-button subtract"
            onClick={increase}
          >
            <AddIcon />
          </button>
          <div className="flipper-container">
            {/* <div className={`counter ${animation}`}> */}
            <input
              type="number"
              max={100}
              min={1}
              value={counter}
              onChange={onChangeCount}
            />
            {/* </div> */}
          </div>
          <button
            aria-label="add"
            className="counter-button add"
            onClick={decrease}
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;

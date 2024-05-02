import { useState, useMemo } from 'react';

const operation = {
  '*': (val) => val * 2,
  '+': (val) => val + 1,
  '-': (val) => val - 1,
  '/': (val) => val / 2,
}

export default function App() {
  const [ops, setOps] = useState([]);

  const [pointer, setPointer] = useState(0);

  const result = useMemo(
    () => ops.slice(0, pointer).reduce((res, code) => operation[code](res), 0), 
    [ops, pointer]
  );

  function createOperationHandler(op) {
    return () => {
      setOps(prev => [...prev.slice(0, pointer), op]);
      setPointer(ops.slice(0, pointer).length + 1);
    }
  }

  function undo() {
    setPointer(prevPointer => Math.max(prevPointer - 1, 0));
  }

  function redo() {
    setPointer(prevPointer => Math.min(ops.length - 1, prevPointer + 1));
  }

  function reset() {
    setOps([]);
    setPointer(0);
  }

  return (
    <div>
      <span onClick={() => undo()}>Undo</span>{' '}
      <span onClick={() => redo()}>Redo</span>{' '}
      <span onClick={() => reset()}>Reset</span>

      <div>
        res: {result}
      </div>
      
      <br/>

      <div onClick={createOperationHandler('/')}>/2</div>
      <div onClick={createOperationHandler('-')}>-1</div>
      <div onClick={createOperationHandler('+')}>+1</div>
      <div onClick={createOperationHandler('*')}>x2</div>
    </div>
  )
}

import { useRef, useState, useMemo, useCallback } from "react";

import "./styles.css";

function throttle(func, interval) {
  let isThrottleOpen = true;
  let lastArguments = null;

  function execute(args) {
    func.apply(this, args);
    isThrottleOpen = false;
    setTimeout(() => {
      isThrottleOpen = true;
      if (lastArguments !== null) {
        execute(lastArguments);
        lastArguments = null;
      }
    }, interval);
  }

  return function (...args) {
    if (isThrottleOpen) {
      execute.call(this, args);
    } else {
      lastArguments = args;
    }
  };
}

const EXTRA_ITEMS = 2;
const ITEMS = new Array(1000).fill(0).map((_, i) => i);

function VirtualList({ data, containerHeight, renderItem, itemHeight }) {
  const containerRef = useRef();

  const [scrollPosition, setScrollPosition] = useState(0);

  const onScrolled = useCallback(
    throttle((event) => setScrollPosition(event.target.scrollTop), 50),
    []
  );

  const { visibleChildren, marginTop } = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / itemHeight) - EXTRA_ITEMS,
      0
    );

    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / itemHeight - 1) + EXTRA_ITEMS,
      data.length - 1
    );

    const marginTop = startIndex * itemHeight;

    const visibleChildren = data.slice(startIndex, endIndex + 1);

    return { marginTop, visibleChildren };
  }, [scrollPosition]);

  return (
    <div className="container" ref={containerRef} onScroll={onScrolled}>
      <div style={{ position: "relative", height: itemHeight * data.length }}>
        <div style={{ position: "absolute", top: marginTop }}>
          {visibleChildren.map((item) => renderItem({ data: item }))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Virtual List</h1>
      <h2>Simplified Version</h2>
      <VirtualList
        containerHeight={300}
        data={ITEMS}
        itemHeight={30}
        renderItem={useCallback(
          ({ data }) => (
            <div className="item" key={data}>
              {data}
            </div>
          ),
          []
        )}
      />
    </div>
  );
}
